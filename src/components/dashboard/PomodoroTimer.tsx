import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Coffee, Settings } from "lucide-react";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface PomodoroTimerProps {
  minimal?: boolean;
}

type TimerMode = "focus" | "break";

interface TimerSettings {
  focusMinutes: number;
  breakMinutes: number;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
}

export default function PomodoroTimer({ minimal = false }: PomodoroTimerProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState<TimerSettings>(() =>
    getLocalStorage<TimerSettings>("timerSettings", {
      focusMinutes: 25,
      breakMinutes: 5,
      autoStartBreaks: true,
      autoStartFocus: false,
    }),
  );

  const [mode, setMode] = useState<TimerMode>("focus");
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.focusMinutes * 60);
  const [progress, setProgress] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState<TimerSettings>(settings);

  const focusTime = settings.focusMinutes * 60;
  const breakTime = settings.breakMinutes * 60;

  // Save settings to localStorage whenever they change
  useEffect(() => {
    setLocalStorage("timerSettings", settings);
  }, [settings]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          const totalTime = mode === "focus" ? focusTime : breakTime;
          setProgress((newTime / totalTime) * 100);
          return newTime;
        });
      }, 1000) as unknown as number;
    } else if (isActive && timeLeft === 0) {
      // Timer completed
      setIsActive(false);

      if (mode === "focus") {
        toast({
          title: "Focus session completed!",
          description: "Time for a break.",
        });
        setMode("break");
        setTimeLeft(breakTime);
        if (settings.autoStartBreaks) {
          setIsActive(true);
        }
      } else {
        toast({
          title: "Break completed!",
          description: "Ready to focus again?",
        });
        setMode("focus");
        setTimeLeft(focusTime);
        if (settings.autoStartFocus) {
          setIsActive(true);
        }
      }
      setProgress(100);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, focusTime, breakTime, settings, toast]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? focusTime : breakTime);
    setProgress(100);
  };

  const switchMode = () => {
    setIsActive(false);
    if (mode === "focus") {
      setMode("break");
      setTimeLeft(breakTime);
    } else {
      setMode("focus");
      setTimeLeft(focusTime);
    }
    setProgress(100);
  };

  const saveSettings = () => {
    // Validate settings
    const focusMin = Math.max(1, Math.min(60, tempSettings.focusMinutes));
    const breakMin = Math.max(1, Math.min(30, tempSettings.breakMinutes));

    const updatedSettings = {
      ...tempSettings,
      focusMinutes: focusMin,
      breakMinutes: breakMin,
    };

    setSettings(updatedSettings);
    setTimeLeft(mode === "focus" ? focusMin * 60 : breakMin * 60);
    setProgress(100);
    setIsSettingsOpen(false);

    toast({
      title: "Settings updated",
      description: `Focus: ${focusMin}min, Break: ${breakMin}min`,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (minimal) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Pomodoro Timer</h3>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold mb-2">{formatTime(timeLeft)}</div>
          <div className="text-sm text-muted-foreground capitalize mb-2">
            {mode} {isActive ? "in progress" : "paused"}
          </div>
          <Progress value={progress} className="h-2 w-full mb-4" />
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={toggleTimer}>
              {isActive ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button size="sm" variant="outline" onClick={resetTimer}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Pomodoro Timer</h2>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Timer Settings</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="focusTime">Focus Duration (minutes)</Label>
                <Input
                  id="focusTime"
                  type="number"
                  min="1"
                  max="60"
                  value={tempSettings.focusMinutes}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      focusMinutes: parseInt(e.target.value) || 25,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="breakTime">Break Duration (minutes)</Label>
                <Input
                  id="breakTime"
                  type="number"
                  min="1"
                  max="30"
                  value={tempSettings.breakMinutes}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      breakMinutes: parseInt(e.target.value) || 5,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoStartBreaks"
                  checked={tempSettings.autoStartBreaks}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      autoStartBreaks: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="autoStartBreaks">Auto-start breaks</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoStartFocus"
                  checked={tempSettings.autoStartFocus}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      autoStartFocus: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="autoStartFocus">
                  Auto-start focus sessions
                </Label>
              </div>
              <Button onClick={saveSettings}>Save Settings</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-6xl font-bold mb-4">{formatTime(timeLeft)}</div>

        <div className="flex items-center gap-2 mb-4">
          <div
            className={`px-4 py-2 rounded-full ${mode === "focus" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            Focus
          </div>
          <div
            className={`px-4 py-2 rounded-full ${mode === "break" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            Break
          </div>
        </div>

        <Progress value={progress} className="h-3 w-full mb-6" />

        <div className="flex gap-3">
          <Button size="lg" onClick={toggleTimer}>
            {isActive ? (
              <Pause className="mr-2 h-4 w-4" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button size="lg" variant="outline" onClick={resetTimer}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button size="lg" variant="secondary" onClick={switchMode}>
            <Coffee className="mr-2 h-4 w-4" />
            Switch to {mode === "focus" ? "Break" : "Focus"}
          </Button>
        </div>
      </div>

      <Card className="p-4 mt-6">
        <h3 className="text-lg font-medium mb-2">Current Session</h3>
        <p className="text-muted-foreground">
          {mode === "focus"
            ? "Focus on your current task. Stay concentrated and avoid distractions."
            : "Take a short break. Stand up, stretch, or grab a glass of water."}
        </p>
      </Card>
    </div>
  );
}
