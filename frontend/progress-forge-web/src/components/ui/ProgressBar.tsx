export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="absolute top-0 left-0 h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full"
      style={{ width: `${progress}%` }}
    ></div>
  );
}
