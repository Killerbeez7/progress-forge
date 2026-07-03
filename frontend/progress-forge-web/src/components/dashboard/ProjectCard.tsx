import { Project } from "@//types/types";
import ProgressBar from "../ui/ProgressBar";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  const totalTasks = project.tasks?.length || 0;
  const completedTasks = project.tasks?.filter((t) => t.isCompleted).length || 0;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <article
      key={project.id}
      className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all hover:shadow-lg group"
    >
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-bold text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Progress Tracker */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-400">Progress</span>
            <span className="text-slate-200">{progressPercentage}%</span>
          </div>
          {/* <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"> */}
          <div
            className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden"
            title="Experience Points"
          >
            <ProgressBar progress={progressPercentage} />
          </div>
        </div>

        {/* Card Meta Info */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
          <span className="font-medium text-slate-300">
            {completedTasks} of {totalTasks} Tasks completed
          </span>
          <time
            dateTime={project.deadline}
            className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono"
          >
            {new Date(project.deadline).toLocaleDateString("en-GB")}
          </time>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <Link
          type="button"
          href={`/projects/${project.id}`}
          className="block text-center w-full bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-semibold text-sm py-2 px-4 rounded-lg transition-all duration-200  border border-slate-700 hover:border-amber-400"
        >
          Open Project
        </Link>
      </div>
    </article>
  );
}
