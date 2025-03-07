import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PlusCircle,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Trash2,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

interface TaskListProps {
  minimal?: boolean;
}

export default function TaskList({ minimal = false }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(() =>
    getLocalStorage<Task[]>("tasks", [
      {
        id: "1",
        title: "Complete project proposal",
        description: "Finish the draft and send for review",
        priority: "high",
        completed: false,
        dueDate: format(
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          "yyyy-MM-dd",
        ),
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Schedule team meeting",
        description: "Discuss upcoming sprint goals",
        priority: "medium",
        completed: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Research new tools",
        description: "Look for productivity tools for the team",
        priority: "low",
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]),
  );

  const [newTask, setNewTask] = useState<
    Omit<Task, "id" | "completed" | "createdAt">
  >({
    title: "",
    description: "",
    priority: "medium",
  });

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    setLocalStorage("tasks", tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.title.trim() === "") return;

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      dueDate: date ? format(date, "yyyy-MM-dd") : undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", priority: "medium" });
    setDate(undefined);
    setIsAddDialogOpen(false);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "medium":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "low":
        return <Clock className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  if (minimal) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tasks</h3>
        <div className="space-y-2">
          {tasks
            .filter((task) => !task.completed)
            .slice(0, 3)
            .map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50"
              >
                <button onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <span className="flex-1 truncate">{task.title}</span>
                {getPriorityIcon(task.priority)}
              </div>
            ))}
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Task title"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Task description"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="priority">Priority</label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    setNewTask({ ...newTask, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label>Due Date (Optional)</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button onClick={handleAddTask}>Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Your Tasks</h2>
          <p className="text-sm text-muted-foreground">
            Manage and organize your daily activities
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Task title"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Task description"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="priority">Priority</label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    setNewTask({ ...newTask, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label>Due Date (Optional)</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button onClick={handleAddTask}>Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`p-4 ${task.completed ? "bg-muted/50" : ""}`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <div className="flex-1">
                <h3
                  className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.title}
                </h3>
                <p
                  className={`text-sm ${task.completed ? "text-muted-foreground" : ""}`}
                >
                  {task.description}
                </p>
                {task.dueDate && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Due: {task.dueDate}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  {getPriorityIcon(task.priority)}
                  <span className="text-xs capitalize">{task.priority}</span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
