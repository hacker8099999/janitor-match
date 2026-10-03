export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-200">
      {children}
    </span>
  );
}
