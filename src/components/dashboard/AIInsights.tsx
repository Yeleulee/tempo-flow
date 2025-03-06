import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  BarChart,
  Activity,
  Brain,
  TrendingUp,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIChat from "./AIChat";

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState("insights");

  // In a real app, this data would come from analyzing user behavior
  const mockInsights = [
    {
      title: "Productivity Score",
      value: "78%",
      change: "+5%",
      description: "Your productivity has increased compared to last week",
      icon: <TrendingUp />,
    },
    {
      title: "Focus Sessions",
      value: "12",
      change: "+3",
      description: "You completed more focus sessions than last week",
      icon: <Clock />,
    },
    {
      title: "Task Completion Rate",
      value: "85%",
      change: "+10%",
      description: "You're completing more tasks on time",
      icon: <Activity />,
    },
    {
      title: "Optimal Work Hours",
      value: "9AM-11AM",
      description: "You're most productive during these hours",
      icon: <Brain />,
    },
  ];

  const recommendations = [
    "Try scheduling complex tasks during your peak productivity hours (9AM-11AM)",
    "Consider taking shorter, more frequent breaks to maintain focus",
    "Your task completion rate improves when you use the Pomodoro technique",
    "You tend to complete more tasks on Tuesdays and Wednesdays",
  ];

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="insights"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="insights">
            <Brain className="mr-2 h-4 w-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            AI Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="mt-4">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">AI Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockInsights.map((insight, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{insight.title}</h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold">
                          {insight.value}
                        </span>
                        {insight.change && (
                          <span
                            className={`text-sm ${insight.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {insight.change}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {insight.description}
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-full">
                      {insight.icon}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <LineChart className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">
                  Weekly Productivity Trend
                </h3>
              </div>
              <div className="h-48 flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground">
                  Productivity chart visualization would appear here
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">
                  Task Completion by Category
                </h3>
              </div>
              <div className="h-48 flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground">
                  Task completion chart would appear here
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">AI Recommendations</h3>
              <ul className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Brain className="h-5 w-5 text-primary mt-0.5" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-4">
          <AIChat />
        </TabsContent>
      </Tabs>
    </div>
  );
}
