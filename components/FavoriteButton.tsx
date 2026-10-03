export function FavoriteButton({ label = "Save" }: { label?: string }) {
  return (
    <button className="rounded-full border border-violet-500 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20">
      {label}
    </button>
  );
}
