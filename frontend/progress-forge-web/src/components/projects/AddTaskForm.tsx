"use client";

import { useState } from "react";

import type { CreateTaskInput } from "@/types/types";

type AddTaskFormProps = {
  onCancel: () => void;
  onSubmit: (values: CreateTaskInput) => void;
};

export default function AddTaskForm({ onCancel, onSubmit }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title is required.");
      return;
    }

    setError(null);

    onSubmit({
      title: trimmedTitle,
    });

    setTitle("");
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div>
        <h2 className="text-xl font-bold text-white">Add Task</h2>
        <p className="mt-1 text-sm text-slate-400">
          Keep it small. One clear next step is enough.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="task-title" className="text-sm font-medium text-slate-300">
            Task title
          </label>

          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Create task storage helper"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
          />

          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
}
