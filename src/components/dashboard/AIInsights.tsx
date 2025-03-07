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
import ProductivityScore from "./ProductivityScore";

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, this data would come from analyzing user behavior
  const mockInsights = [
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">AI Insights</h2>
          <p className="text-sm text-muted-foreground">
            Personalized productivity recommendations
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="mb-6">
            <Card className="p-4">
              <ProductivityScore />
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <LineChart className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Productivity Trends</h3>
              </div>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground">
                  Productivity chart visualization
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Task Completion</h3>
              </div>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground">
                  Task completion chart visualization
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6">
          <AIChat />
        </TabsContent>
      </Tabs>
    </div>
  );
}
