import { Card } from "@/shared/ui/Card";
import type { AuditEntity } from "@/core/domain/types/audit.types";

const items = (audit: AuditEntity) => [
  {
    label: "Extensões monitoradas",
    value: audit.totalExtensions,
    helper: "Itens incluídos na auditoria atual",
  },
  {
    label: "Pontuação média",
    value: audit.averageScore,
    helper: "Visão consolidada do ambiente",
  },
  {
    label: "Alto risco",
    value: audit.highCount,
    helper: "Exigem revisão prioritária",
  },
  {
    label: "Críticas",
    value: audit.criticalCount,
    helper: "Demandam atenção imediata",
  },
] as const;

export const SummaryCards = ({ audit }: { audit: AuditEntity }) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {items(audit).map((item) => (
      <Card key={item.label} className="space-y-3 bg-white/95">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{item.label}</p>
        <p className="text-3xl font-bold text-ink">{item.value}</p>
        <p className="text-sm text-slate-500">{item.helper}</p>
      </Card>
    ))}
  </div>
);
