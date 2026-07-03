import { Project } from "@/lib/types/types";
import ProgressBar from "@/components/ui/ProgressBar";

export default function ProjectHeader({
  project,
  progress,
}: {
  project: Project;
  progress: number;
}) {
  return (
    <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            {project.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>
        </div>

        <time className="rounded-lg px-3 py-1 text-md font-medium text-slate-300">
          {new Date(project.deadline).toLocaleDateString("en-GB")}
        </time>
      </div>

      <div className="mt-8 space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-slate-400">Project Progress</span>
          <span className="text-slate-200">{progress}%</span>
        </div>

        <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <ProgressBar progress={progress} />
        </div>
      </div>
    </section>
  );
}
