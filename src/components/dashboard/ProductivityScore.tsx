import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { calculateProductivityScore } from "@/lib/productivityScore";
import { Task } from "./TaskList";
import { getLocalStorage } from "@/lib/utils";
import { Brain, TrendingUp, Calendar, Clock, AlertCircle } from "lucide-react";

interface FocusSession {
  duration: number;
  completed: boolean;
  date: string;
}

interface ProductivityScoreProps {
  minimal?: boolean;
}

export default function ProductivityScore({
  minimal = false,
}: ProductivityScoreProps) {
  const [score, setScore] = useState(0);
  const [metrics, setMetrics] = useState({
    taskCompletionRate: 0,
    focusSessionEfficiency: 0,
    consistencyScore: 0,
    insights: [] as string[],
  });
  const [timeframe, setTimeframe] = useState(7); // Default to 7 days

  useEffect(() => {
    // Get tasks and focus sessions from localStorage
    const tasks = getLocalStorage<Task[]>("tasks", []);

    // Mock focus sessions data (in a real app, this would come from localStorage or a database)
    const mockFocusSessions: FocusSession[] = [
      {
        duration: 25,
        completed: true,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        duration: 25,
        completed: true,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        duration: 25,
        completed: false,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        duration: 25,
        completed: true,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        duration: 25,
        completed: true,
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        duration: 25,
        completed: false,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // Calculate productivity score
    const productivityMetrics = calculateProductivityScore(
      tasks,
      mockFocusSessions,
      timeframe,
    );

    setScore(productivityMetrics.overallScore);
    setMetrics({
      taskCompletionRate: productivityMetrics.taskCompletionRate,
      focusSessionEfficiency: productivityMetrics.focusSessionEfficiency,
      consistencyScore: productivityMetrics.consistencyScore,
      insights: productivityMetrics.insights,
    });
  }, [timeframe]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  if (minimal) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Productivity Score</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Overall Score</span>
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
        <Progress value={score} className="h-2 w-full" />

        {metrics.insights.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <Brain className="h-4 w-4 mt-0.5 text-primary" />
              <span>{metrics.insights[0]}</span>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Productivity Score</h2>
          <p className="text-sm text-muted-foreground">
            Your performance over the last {timeframe} days
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeframe === 7 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe(7)}
          >
            7 Days
          </Button>
          <Button
            variant={timeframe === 30 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe(30)}
          >
            30 Days
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold mb-2 text-center">
            <span className={getScoreColor(score)}>{score}%</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Overall Score
          </p>
          <Progress value={score} className="h-2 w-full mt-4" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium">Task Completion</h3>
          </div>
          <div className="text-2xl font-bold mb-1">
            {metrics.taskCompletionRate}%
          </div>
          <Progress value={metrics.taskCompletionRate} className="h-2 w-full" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium">Focus Efficiency</h3>
          </div>
          <div className="text-2xl font-bold mb-1">
            {metrics.focusSessionEfficiency}%
          </div>
          <Progress
            value={metrics.focusSessionEfficiency}
            className="h-2 w-full"
          />
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium">Consistency</h3>
          </div>
          <div className="text-2xl font-bold mb-1">
            {metrics.consistencyScore}%
          </div>
          <Progress value={metrics.consistencyScore} className="h-2 w-full" />
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">AI Insights</h3>
        </div>
        <ul className="space-y-3">
          {metrics.insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
