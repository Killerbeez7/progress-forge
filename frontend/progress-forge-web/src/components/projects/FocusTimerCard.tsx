export default function FocusTimerCard() {
  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-white">Focus Timer</h2>

      <div className="mt-6 text-center">
        <div className="text-5xl font-black text-white">45:00</div>
        <p className="mt-2 text-sm text-slate-400">Focus session placeholder</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
        >
          Start
        </button>

        <button
          type="button"
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
