import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import PomodoroTimer from "./PomodoroTimer";
import AIInsights from "./AIInsights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Settings } from "lucide-react";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AppSettings {
  darkMode: boolean;
  showAIInsights: boolean;
  enableNotifications: boolean;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [settings, setSettings] = useState<AppSettings>(() =>
    getLocalStorage<AppSettings>("appSettings", {
      darkMode: false,
      showAIInsights: true,
      enableNotifications: true,
    }),
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Apply dark mode
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setLocalStorage("appSettings", settings);
  }, [settings]);

  const toggleDarkMode = () => {
    setSettings({ ...settings, darkMode: !settings.darkMode });
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
            TempoFlow AI
          </h1>
          <p className="text-xl text-muted-foreground">
            Your AI-Powered Productivity Hub
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            title={
              settings.darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {settings.darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" title="Settings">
                <Settings className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>App Settings</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="flex flex-col">
                    <span>Dark Mode</span>
                    <span className="text-sm text-muted-foreground">
                      Enable dark theme
                    </span>
                  </Label>
                  <Switch
                    id="dark-mode"
                    checked={settings.darkMode}
                    onCheckedChange={(checked) =>
                      updateSettings({ darkMode: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-insights" className="flex flex-col">
                    <span>AI Insights</span>
                    <span className="text-sm text-muted-foreground">
                      Show AI productivity recommendations
                    </span>
                  </Label>
                  <Switch
                    id="ai-insights"
                    checked={settings.showAIInsights}
                    onCheckedChange={(checked) =>
                      updateSettings({ showAIInsights: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="flex flex-col">
                    <span>Notifications</span>
                    <span className="text-sm text-muted-foreground">
                      Enable browser notifications
                    </span>
                  </Label>
                  <Switch
                    id="notifications"
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) =>
                      updateSettings({ enableNotifications: checked })
                    }
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs
            defaultValue="tasks"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="mt-4">
              <Card className="p-4">
                <TaskList />
              </Card>
            </TabsContent>
            <TabsContent value="pomodoro" className="mt-4">
              <Card className="p-4">
                <PomodoroTimer />
              </Card>
            </TabsContent>
            <TabsContent value="insights" className="mt-4">
              <Card className="p-4">
                {settings.showAIInsights ? (
                  <AIInsights />
                ) : (
                  <div className="p-8 text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      AI Insights are disabled
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Enable AI Insights in settings to see productivity
                      recommendations
                    </p>
                    <Button
                      onClick={() => updateSettings({ showAIInsights: true })}
                    >
                      Enable AI Insights
                    </Button>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="p-4 h-full">
            {activeTab === "tasks" && <PomodoroTimer minimal={true} />}
            {activeTab === "pomodoro" && <TaskList minimal={true} />}
            {activeTab === "insights" && <TaskList minimal={true} />}
          </Card>
        </div>
      </div>
    </div>
  );
}
