export function Button({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "ghost" }) {
  const styles =
    variant === "ghost"
      ? "border border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-900"
      : "bg-violet-600 text-white hover:bg-violet-500";

  return <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${styles}`}>{children}</button>;
}
