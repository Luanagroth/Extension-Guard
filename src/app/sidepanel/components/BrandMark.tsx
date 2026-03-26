export const BrandMark = ({ compact = false }: { compact?: boolean }) => (
  <div className={`flex items-center ${compact ? "gap-3" : "gap-4"}`}>
    <div className={`overflow-hidden rounded-2xl border border-white/70 bg-white shadow-sm ${compact ? "h-12 w-12" : "h-14 w-14"}`}>
      <img alt="Extension Guard" className="h-full w-full object-cover" src="/icons/icon-128.png" />
    </div>
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Extension Guard</p>
      <p className={`font-display text-ink ${compact ? "text-xl" : "text-3xl"}`}>Auditoria confiável de extensões</p>
    </div>
  </div>
);
