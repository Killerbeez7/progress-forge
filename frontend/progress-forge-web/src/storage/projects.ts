import { Project } from "../types/types";

const PROJECTS_STORAGE_KEY = "projects";

type CreateProjectInput = {
  title: string;
  description?: string;
  deadline: string;
};

type UpdateProjectInput = Partial<Omit<Project, "id" | "createdAt">>;

export const getProjects = (): Project[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const projectsString = localStorage.getItem(PROJECTS_STORAGE_KEY);

  if (!projectsString) {
    return [];
  }

  try {
    return JSON.parse(projectsString) as Project[];
  } catch (error) {
    console.error("Error parsing projects data", error);
    return [];
  }
};

export const saveProjects = (projects: Project[]) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
};

export const createProject = (input: CreateProjectInput): Project => {
  const projects = getProjects();

  const project: Project = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    description: input.description?.trim() ?? "",
    status: "active",
    deadline: input.deadline,
    tasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedProjects = [...projects, project];

  saveProjects(updatedProjects);

  return project;
};

export const getProjectById = (projectId: string): Project | null => {
  const projects = getProjects();

  return projects.find((project) => project.id === projectId) ?? null;
};

export const updateProject = (
  projectId: string,
  updates: UpdateProjectInput
): Project | null => {
  const projects = getProjects();

  const projectToUpdate = projects.find((project) => project.id === projectId);

  if (!projectToUpdate) {
    return null;
  }

  const updatedProject: Project = {
    ...projectToUpdate,
    ...updates,
    id: projectToUpdate.id,
    createdAt: projectToUpdate.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const updatedProjects = projects.map((project) =>
    project.id === projectId ? updatedProject : project
  );

  saveProjects(updatedProjects);

  return updatedProject;
};

export const deleteProject = (projectId: string): void => {
  const projects = getProjects();

  const updatedProjects = projects.filter((project) => project.id !== projectId);

  saveProjects(updatedProjects);
};
