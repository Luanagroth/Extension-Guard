export const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600">
    <h3 className="mb-2 text-lg font-semibold text-ink">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);
