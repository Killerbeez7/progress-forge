"use client";

import { useState } from "react";

type CreateProjectFormValues = {
  title: string;
  description: string;
  deadline: string;
};

type CreateProjectFormProps = {
  onCancel: () => void;
  onSubmit: (values: CreateProjectFormValues) => void;
};

export default function CreateProjectForm({
  onCancel,
  onSubmit,
}: CreateProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Project title is required.");
      return;
    }

    if (!deadline) {
      setError("Deadline is required.");
      return;
    }

    setError(null);

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      deadline,
    });
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Create New Project</h2>
        <p className="mt-1 text-sm text-slate-400">
          Break a big goal into something visible and manageable.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="project-title" className="text-sm font-medium text-slate-300">
            Project title
          </label>

          <input
            id="project-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Build Progress Forge MVP"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="project-description"
            className="text-sm font-medium text-slate-300"
          >
            Description
          </label>

          <textarea
            id="project-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What is this project about?"
            rows={4}
            className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="project-deadline"
            className="text-sm font-medium text-slate-300"
          >
            Deadline
          </label>

          <input
            id="project-deadline"
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

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
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
