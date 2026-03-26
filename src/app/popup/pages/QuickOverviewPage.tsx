import { useMemo } from "react";
import { SidePanelAdapter } from "@/chrome/adapters/sidePanel.adapter";
import { useAudit } from "@/shared/hooks/useAudit";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Loader } from "@/shared/ui/Loader";
import { BrandMark } from "@/app/sidepanel/components/BrandMark";

const sidePanel = new SidePanelAdapter();

export const QuickOverviewPage = () => {
  const { latestAudit, loading } = useAudit();
  const headline = useMemo(() => {
    if (!latestAudit) return "Execute uma auditoria para começar.";
    if (latestAudit.criticalCount > 0) return `${latestAudit.criticalCount} extensões críticas precisam de atenção.`;
    return `Pontuação média ${latestAudit.averageScore}. Nenhum risco crítico detectado.`;
  }, [latestAudit]);

  if (loading) return <Loader />;

  return (
    <Card className="m-4 w-[340px] space-y-5 bg-white/95">
      <BrandMark compact />
      <div className="rounded-3xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Resumo rápido</p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight text-ink">{headline}</h1>
      </div>
      <Button className="w-full" onClick={() => void sidePanel.open()}>
        Abrir painel lateral
      </Button>
    </Card>
  );
};
