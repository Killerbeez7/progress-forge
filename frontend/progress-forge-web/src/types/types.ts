export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  xpReward: number;
  createdAt: string;
  completedAt?: string | null;
}

export type ProjectStatus = "active" | "completed" | "archived";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  deadline: string;
  tasks: Task[];
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile {
  displayName: string;
  currentLevelXp: number;
  nextLevelXp: number;
  totalXp: number;
  level: number;
  createdAt: string;
  updatedAt?: string;
}

export type CreateProjectInput = {
  title: string;
  description?: string;
  deadline: string;
};

export type CreateTaskInput = {
  title: string;
};
