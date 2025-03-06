import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Calendar, Bot, Settings2, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AISettings {
  apiProvider: "gemini" | "openai" | "custom";
  apiKey: string;
  customEndpoint?: string;
  enableCalendarSync: boolean;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSettings, setAISettings] = useState<AISettings>({
    apiProvider: "gemini",
    apiKey: "AIzaSyCxRZBJMilV_34uiR9dN_4MuBtD3f4Ak7k",
    customEndpoint: "",
    enableCalendarSync: false,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateGeminiResponse = async (prompt: string) => {
    if (!aiSettings.apiKey) {
      return "Please add your Gemini API key in the settings to use AI features.";
    }

    try {
      const genAI = new GoogleGenerativeAI(aiSettings.apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Create a chat session
      const chat = model.startChat({
        history: messages
          .filter((msg) => messages.indexOf(msg) > 0) // Skip the initial greeting
          .map((msg) => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          })),
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "Sorry, I encountered an error while processing your request. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let aiResponse = "";

      if (aiSettings.apiProvider === "gemini" && aiSettings.apiKey) {
        // Use Gemini API
        aiResponse = await generateGeminiResponse(input);
      } else {
        // Fallback to simulated responses if no API key is provided
        // Check for calendar-related commands
        if (
          input.toLowerCase().includes("reminder") ||
          input.toLowerCase().includes("calendar")
        ) {
          if (aiSettings.enableCalendarSync) {
            aiResponse =
              "I've added this to your calendar. Would you like me to set a reminder as well?";
          } else {
            aiResponse =
              "It looks like you want to create a calendar event. Please enable calendar sync in settings to use this feature.";
          }
        } else if (
          input.toLowerCase().includes("task") ||
          input.toLowerCase().includes("todo")
        ) {
          aiResponse =
            "I can help you manage your tasks. Would you like me to add this to your task list?";
        } else {
          aiResponse =
            "I understand you need assistance. How else can I help you with your productivity today?";
        }
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveSettings = () => {
    // In a real app, you would validate and save the API key securely
    // For now, we'll just store it in state (not secure for production)
    localStorage.setItem("aiSettings", JSON.stringify(aiSettings));
    setIsSettingsOpen(false);
  };

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("aiSettings");
    if (savedSettings) {
      try {
        setAISettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Error parsing saved AI settings:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">AI Assistant</h2>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI Assistant Settings</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>AI Provider</Label>
                <Select
                  value={aiSettings.apiProvider}
                  onValueChange={(value: "gemini" | "openai" | "custom") =>
                    setAISettings({ ...aiSettings, apiProvider: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini">Google Gemini</SelectItem>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="custom">Custom API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={aiSettings.apiKey}
                  onChange={(e) =>
                    setAISettings({ ...aiSettings, apiKey: e.target.value })
                  }
                  placeholder="Enter your API key"
                />
              </div>

              {aiSettings.apiProvider === "custom" && (
                <div className="grid gap-2">
                  <Label htmlFor="customEndpoint">Custom Endpoint URL</Label>
                  <Input
                    id="customEndpoint"
                    value={aiSettings.customEndpoint || ""}
                    onChange={(e) =>
                      setAISettings({
                        ...aiSettings,
                        customEndpoint: e.target.value,
                      })
                    }
                    placeholder="https://your-api-endpoint.com"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="calendarSync" className="flex flex-col">
                  <span>Calendar Sync</span>
                  <span className="text-sm text-muted-foreground">
                    Allow AI to create calendar events
                  </span>
                </Label>
                <Switch
                  id="calendarSync"
                  checked={aiSettings.enableCalendarSync}
                  onCheckedChange={(checked) =>
                    setAISettings({
                      ...aiSettings,
                      enableCalendarSync: checked,
                    })
                  }
                />
              </div>

              <Button onClick={saveSettings}>Save Settings</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="flex-1 mb-4 overflow-hidden">
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {message.sender === "ai" && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">AI Assistant</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything... (e.g., 'Create a reminder for Tuesday at 3pm')"
          className="flex-1 min-h-[60px] max-h-[120px]"
        />
        <Button
          onClick={handleSendMessage}
          className="self-end"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("Create a new task for me")}
          >
            Create Task
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("Add a reminder for tomorrow at 9am")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Add Reminder
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("What's my productivity score?")}
          >
            Productivity Insights
          </Button>
        </div>
      </div>
    </div>
  );
}
