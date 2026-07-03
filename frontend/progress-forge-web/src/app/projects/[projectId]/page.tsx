"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getProjectById } from "@/storage/projects";

import { FaArrowLeft } from "react-icons/fa6";

import ProjectHeader from "@/components/projects/ProjectHeader";
import TaskList from "@/components/projects/TaskList";
import FocusTimerCard from "@/components/projects/FocusTimerCard";

export default function ProjectOverviewPage() {
  const params = useParams();

  const projectId = params.projectId as string;

  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 text-slate-100">
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <GoBackButton />

          <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h1 className="text-2xl font-bold text-white">Project not found.</h1>
            <p className="mt-2 text-slate-400">
              The project does not exist or the link is invalid.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter((task) => task.isCompleted).length;

  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <GoBackButton />

        <ProjectHeader project={project} progress={progressPercentage} />

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <TaskList project={project} />

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
