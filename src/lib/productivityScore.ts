import { Task } from "@/components/dashboard/TaskList";

interface FocusSession {
  duration: number; // in minutes
  completed: boolean;
  date: string; // ISO string
}

interface ProductivityMetrics {
  taskCompletionRate: number; // 0-100
  focusSessionEfficiency: number; // 0-100
  consistencyScore: number; // 0-100
  overallScore: number; // 0-100
  insights: string[];
}

/**
 * Calculate productivity score based on tasks, focus sessions, and user patterns
 * @param tasks List of user tasks
 * @param focusSessions List of pomodoro focus sessions
 * @param timeframe Number of days to analyze (default: 7)
 * @returns Productivity metrics including overall score and insights
 */
export function calculateProductivityScore(
  tasks: Task[],
  focusSessions: FocusSession[],
  timeframe: number = 7,
): ProductivityMetrics {
  // Filter data to the specified timeframe
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - timeframe);

  const recentTasks = tasks.filter(
    (task) => new Date(task.createdAt) >= cutoffDate,
  );

  const recentSessions = focusSessions.filter(
    (session) => new Date(session.date) >= cutoffDate,
  );

  // Calculate task completion rate
  const completedTasks = recentTasks.filter((task) => task.completed).length;
  const totalTasks = recentTasks.length;
  const taskCompletionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate focus session efficiency
  const completedSessions = recentSessions.filter(
    (session) => session.completed,
  ).length;
  const totalSessions = recentSessions.length;
  const totalFocusTime = recentSessions.reduce(
    (sum, session) => sum + session.duration,
    0,
  );
  const focusSessionEfficiency =
    totalSessions > 0
      ? Math.round((completedSessions / totalSessions) * 100)
      : 0;

  // Calculate consistency score
  // Group sessions by day to check daily activity
  const sessionsByDay = recentSessions.reduce(
    (acc, session) => {
      const day = new Date(session.date).toDateString();
      if (!acc[day]) acc[day] = [];
      acc[day].push(session);
      return acc;
    },
    {} as Record<string, FocusSession[]>,
  );

  const daysWithActivity = Object.keys(sessionsByDay).length;
  const consistencyScore = Math.round((daysWithActivity / timeframe) * 100);

  // Calculate overall productivity score with weighted components
  const weights = {
    taskCompletion: 0.4,
    focusEfficiency: 0.35,
    consistency: 0.25,
  };

  const overallScore = Math.round(
    taskCompletionRate * weights.taskCompletion +
      focusSessionEfficiency * weights.focusEfficiency +
      consistencyScore * weights.consistency,
  );

  // Generate insights based on the metrics
  const insights = generateInsights(
    taskCompletionRate,
    focusSessionEfficiency,
    consistencyScore,
    recentTasks,
    recentSessions,
  );

  return {
    taskCompletionRate,
    focusSessionEfficiency,
    consistencyScore,
    overallScore,
    insights,
  };
}

/**
 * Generate personalized insights based on productivity metrics
 */
function generateInsights(
  taskCompletionRate: number,
  focusSessionEfficiency: number,
  consistencyScore: number,
  tasks: Task[],
  sessions: FocusSession[],
): string[] {
  const insights: string[] = [];

  // Task completion insights
  if (taskCompletionRate < 30) {
    insights.push(
      "Your task completion rate is low. Try breaking down tasks into smaller, more manageable items.",
    );
  } else if (taskCompletionRate > 80) {
    insights.push(
      "Great job completing tasks! Consider challenging yourself with more complex goals.",
    );
  }

  // Focus session insights
  if (focusSessionEfficiency < 40) {
    insights.push(
      "Your focus sessions could be more effective. Try adjusting the duration or environment to improve concentration.",
    );
  } else if (focusSessionEfficiency > 75) {
    insights.push(
      "Your focus sessions are very effective. Keep up the good work!",
    );
  }

  // Consistency insights
  if (consistencyScore < 50) {
    insights.push(
      "Try to be more consistent with daily productivity sessions for better results.",
    );
  } else if (consistencyScore > 80) {
    insights.push(
      "You're maintaining excellent consistency in your productivity routine.",
    );
  }

  // Task priority analysis
  const highPriorityCompletion = calculatePriorityCompletionRate(tasks, "high");
  if (highPriorityCompletion < 50) {
    insights.push(
      "Focus more on completing high-priority tasks to improve overall productivity.",
    );
  }

  // Optimal work time pattern detection
  const optimalTimeInsight = detectOptimalWorkTime(sessions);
  if (optimalTimeInsight) {
    insights.push(optimalTimeInsight);
  }

  // Ensure we have at least one insight
  if (insights.length === 0) {
    insights.push(
      "Your productivity is on track. Keep maintaining your current workflow.",
    );
  }

  return insights;
}

/**
 * Calculate completion rate for tasks of a specific priority
 */
function calculatePriorityCompletionRate(
  tasks: Task[],
  priority: "high" | "medium" | "low",
): number {
  const priorityTasks = tasks.filter((task) => task.priority === priority);
  const completedPriorityTasks = priorityTasks.filter((task) => task.completed);

  return priorityTasks.length > 0
    ? Math.round((completedPriorityTasks.length / priorityTasks.length) * 100)
    : 0;
}

/**
 * Detect optimal work time based on completed focus sessions
 */
function detectOptimalWorkTime(sessions: FocusSession[]): string | null {
  if (sessions.length < 5) return null;

  const completedSessions = sessions.filter((session) => session.completed);
  if (completedSessions.length < 3) return null;

  // Group sessions by hour of day
  const sessionsByHour: Record<number, FocusSession[]> = {};

  completedSessions.forEach((session) => {
    const hour = new Date(session.date).getHours();
    if (!sessionsByHour[hour]) sessionsByHour[hour] = [];
    sessionsByHour[hour].push(session);
  });

  // Find hour with most completed sessions
  let maxSessions = 0;
  let optimalHour = -1;

  Object.entries(sessionsByHour).forEach(([hour, hourSessions]) => {
    if (hourSessions.length > maxSessions) {
      maxSessions = hourSessions.length;
      optimalHour = parseInt(hour);
    }
  });

  if (optimalHour >= 0) {
    const timeRange = getTimeRangeString(optimalHour);
    return `You seem most productive during ${timeRange}. Consider scheduling important tasks during this time.`;
  }

  return null;
}

/**
 * Convert hour to readable time range
 */
function getTimeRangeString(hour: number): string {
  const startHour = hour;
  const endHour = (hour + 2) % 24; // 2-hour window

  const formatHour = (h: number) => {
    if (h === 0) return "12 AM";
    if (h === 12) return "12 PM";
    return h < 12 ? `${h} AM` : `${h - 12} PM`;
  };

  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
}
