import { AuditTable } from "../components/AuditTable";
import { EmptyState } from "../components/EmptyState";
import { Loader } from "@/shared/ui/Loader";
import { useAudit } from "@/shared/hooks/useAudit";

export const AuditHistoryPage = () => {
  const { history, loading } = useAudit({ autoRun: false });

  if (loading) return <Loader />;
  if (!history.length) return <EmptyState title="Sem histórico de auditoria" description="Execute auditorias para criar uma linha do tempo local." />;

  return <AuditTable audits={history} />;
};
