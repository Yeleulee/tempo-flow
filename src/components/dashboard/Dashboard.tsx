import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import PomodoroTimer from "./PomodoroTimer";
import AIInsights from "./AIInsights";
import ProductivityScore from "./ProductivityScore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Settings, LogOut, User } from "lucide-react";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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
      <header className="mb-8 bg-card shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" className="fill-primary" />
                <path d="M2 17L12 22L22 17" className="fill-primary" />
                <path d="M2 12L12 17L22 12" className="fill-primary" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">TempoFlow AI</h1>
              <p className="text-sm text-muted-foreground">
                Your AI-Powered Productivity Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              title={
                settings.darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={user?.photoURL || undefined}
                      alt={user?.displayName || "User"}
                    />
                    <AvatarFallback>
                      {user?.displayName?.charAt(0) ||
                        user?.email?.charAt(0) ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.displayName || user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-6">
          <Tabs
            defaultValue="tasks"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <TabsContent value="tasks" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="p-6 shadow-sm h-full">
                  <TaskList />
                </Card>
              </div>
              <div>
                <Card className="p-6 shadow-sm h-full">
                  <PomodoroTimer minimal={true} />
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pomodoro" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="p-6 shadow-sm h-full">
                  <PomodoroTimer />
                </Card>
              </div>
              <div>
                <Card className="p-6 shadow-sm h-full">
                  <TaskList minimal={true} />
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="p-6 shadow-sm h-full">
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
              </div>
              <div>
                <Card className="p-6 shadow-sm h-full">
                  <TaskList minimal={true} />
                </Card>
              </div>
            </div>
          </TabsContent>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 shadow-sm sticky top-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="text-2xl font-bold">7</div>
                    <div className="text-xs text-muted-foreground">
                      Active Tasks
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs text-muted-foreground">
                      Completed Today
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg col-span-2 mt-3">
                    <ProductivityScore minimal={true} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Today's Focus</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium">
                      Complete project proposal
                    </div>
                    <div className="text-xs text-muted-foreground">
                      High priority
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">AI Assistant</h3>
                <Card className="p-3 border border-primary/20">
                  <p className="text-sm mb-3">
                    Need help organizing your tasks or setting up your schedule?
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-sm"
                    onClick={() => setActiveTab("insights")}
                  >
                    Chat with AI Assistant
                  </Button>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
