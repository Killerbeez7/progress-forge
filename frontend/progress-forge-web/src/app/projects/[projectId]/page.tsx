"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FaArrowLeft } from "react-icons/fa6";

import AddTaskForm from "@/components/projects/AddTaskForm";
import FocusTimerCard from "@/components/projects/FocusTimerCard";
import ProjectHeader from "@/components/projects/ProjectHeader";
import TaskList from "@/components/projects/TaskList";
import { addTaskToProject, getProjectById } from "@/storage/projects";
import type { CreateTaskInput, Project } from "@/types/types";

export default function ProjectOverviewPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  useEffect(() => {
    const loadedProject = getProjectById(projectId);

    setProject(loadedProject);
    setIsMounted(true);
  }, [projectId]);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-amber-400 hover:text-amber-300"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h1 className="text-2xl font-bold text-white">Project not found.</h1>
          <p className="mt-2 text-slate-400">
            The project does not exist or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter((task) => task.isCompleted).length;

  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddTask = (values: CreateTaskInput) => {
    const updatedProject = addTaskToProject(project.id, values);

    if (!updatedProject) {
      return;
    }

    setProject(updatedProject);
    setIsAddTaskOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <GoBackButton />

        <ProjectHeader project={project} progress={progressPercentage} />

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {isAddTaskOpen && (
              <AddTaskForm
                onCancel={() => setIsAddTaskOpen(false)}
                onSubmit={handleAddTask}
              />
            )}

            <TaskList project={project} onAddTaskClick={() => setIsAddTaskOpen(true)} />
          </div>

          <FocusTimerCard />
        </section>
      </main>
    </div>
  );
}

export const GoBackButton = () => {
  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300"
    >
      <FaArrowLeft aria-hidden="true" />
      <span>Back to Dashboard</span>
    </Link>
  );
};
