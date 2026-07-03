"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUserProfile } from "@/storage/user-profile";
import { createProject, getProjects } from "@/storage/projects";
import { UserProfile, Project } from "@/types/types";

import Link from "next/link";
import ProjectCard from "./ProjectCard";
import ProgressBar from "../ui/ProgressBar";
import CreateProjectForm from "../projects/CreateProjectForm";

export default function Dashboard() {
  const router = useRouter();

  const [user] = useState<UserProfile | null>(() => getUserProfile());
  const [projects, setProjects] = useState<Project[]>(() => getProjects());
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        Loading dashboard...
      </div>
    );
  }

  const activeProjectsCount = projects.filter((p) => p.status === "active").length;

  const completedTasks = projects.reduce((total, project) => {
    return total + project.tasks.filter((task) => task.isCompleted).length;
  }, 0);

  const userProgress = Math.round((user.currentLevelXp / user.nextLevelXp) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="logo-area">
          <Link
            href="/"
            className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500 uppercase"
          >
            Progress Forge
          </Link>
        </div>

        {/* XP Tracker */}
        <div className="flex items-center gap-3 hover:bg-slate-800/60 px-4 py-2 rounded-xl border border-transparent hover:border-slate-700 w-full sm:w-auto">
          <span className="text-sm font-bold text-amber-400 whitespace-nowrap">
            LVL {user.level}
          </span>
          <div
            className="relative w-full sm:w-40 h-3 bg-slate-700 rounded-full overflow-hidden"
            title="Experience Points"
          >
            <ProgressBar progress={userProgress} />
          </div>
          <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
            {user.currentLevelXp} / {user.nextLevelXp} XP
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Greeting text*/}
        <section className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {user.displayName}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 italic">
            Consistency beats intensity. Keep forging ahead!
          </p>
        </section>

        {/* Stats overview */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm hover:border-slate-700 transition-colors">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Projects
            </h3>
            <p className="text-3xl font-black text-white mt-2">{activeProjectsCount}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm hover:border-slate-700 transition-colors">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Completed Tasks
            </h3>
            <p className="text-3xl font-black text-emerald-400 mt-2">{completedTasks}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm hover:border-slate-700 transition-colors">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total XP
            </h3>
            <p className="text-3xl font-black text-amber-400 mt-2">{user.totalXp}</p>
          </div>
        </section>

        {/* Projects section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-white">Projects</h2>

            <button
              type="button"
              onClick={() => setIsCreateProjectOpen(true)}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Create Project
            </button>
          </div>

          {isCreateProjectOpen && (
            <CreateProjectForm
              onCancel={() => setIsCreateProjectOpen(false)}
              onSubmit={(values) => {
                const createdProject = createProject(values);
                setProjects((projects) => [createdProject, ...projects]);
                setIsCreateProjectOpen(false);
                router.push(`/projects/${createdProject.id}`);
              }}
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
