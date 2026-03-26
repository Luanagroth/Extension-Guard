import { useMemo } from "react";
import { SummaryCards } from "../components/SummaryCards";
import { ExtensionList } from "../components/ExtensionList";
import { EmptyState } from "../components/EmptyState";
import { Loader } from "@/shared/ui/Loader";
import { useAudit } from "@/shared/hooks/useAudit";
import { Card } from "@/shared/ui/Card";

export const DashboardPage = () => {
  const { latestAudit, loading, refresh } = useAudit();
  const mostCritical = useMemo(
    () => latestAudit?.items.filter((item) => ["critical", "high"].includes(item.riskLevel)).slice(0, 4) || [],
    [latestAudit],
  );

  if (loading) return <Loader />;
  if (!latestAudit) return <EmptyState title="Nenhuma auditoria ainda" description="Execute a primeira auditoria para visualizar o panorama das extensões instaladas." />;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Resumo executivo</p>
            <h2 className="font-display text-4xl leading-tight">Ambiente monitorado com {latestAudit.totalExtensions} extensões auditadas</h2>
            <p className="text-sm leading-6 text-slate-200">
              A auditoria mais recente identificou {latestAudit.criticalCount} extensões críticas e uma pontuação média de {latestAudit.averageScore}, ajudando a priorizar revisão e remoção quando necessário.
            </p>
          </div>
          <button
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
            onClick={() => void refresh()}
            type="button"
          >
            Executar nova auditoria
          </button>
        </div>
      </Card>
      <SummaryCards audit={latestAudit} />
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-ink">Extensões mais críticas</h3>
            <p className="text-sm text-slate-600">Itens com maior potencial de exposição e que merecem revisão mais cuidadosa.</p>
          </div>
        </div>
        <ExtensionList extensions={mostCritical} />
      </section>
    </div>
  );
};


