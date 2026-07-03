import { Project } from "@/lib/types/types";
import TaskItem from "./TaskItem";

export default function TaskList({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white">Tasks</h2>

        <button
          type="button"
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
        >
          Add Task
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {project.tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950 px-4 py-8 text-center">
            <h3 className="text-sm font-semibold text-slate-200">No tasks yet</h3>
            <p className="mt-1 text-sm text-slate-500">
              Add your first task to start building momentum.
            </p>
          </div>
        ) : (
          project.tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
