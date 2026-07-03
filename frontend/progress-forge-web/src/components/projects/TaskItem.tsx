import { Task } from "@/lib/types/types";

export default function TaskItem({ task }: { task: Task }) {
  return (
    <div
      key={task.id}
      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-4 w-4 rounded border ${
            task.isCompleted ? "border-emerald-400 bg-emerald-400" : "border-slate-600"
          }`}
        />

        <span
          className={task.isCompleted ? "text-slate-500 line-through" : "text-slate-200"}
        >
          {task.title}
        </span>
      </div>

      <span className="text-xs font-bold text-amber-400">+{task.xpReward} XP</span>
    </div>
  );
}
