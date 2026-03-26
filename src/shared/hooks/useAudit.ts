import { useEffect, useState } from "react";
import { RuntimeAdapter } from "@/chrome/adapters/runtime.adapter";
import { messageTypes, type ExtensionGuardResponse } from "@/core/domain/types/message.types";
import type { AuditEntity } from "@/core/domain/types/audit.types";

const runtime = new RuntimeAdapter();

export const useAudit = (options: { autoRun?: boolean } = {}) => {
  const { autoRun = true } = options;
  const [latestAudit, setLatestAudit] = useState<AuditEntity | null>(null);
  const [history, setHistory] = useState<AuditEntity[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);

    if (autoRun) {
      const auditResponse = await runtime.sendMessage<ExtensionGuardResponse>({ type: messageTypes.RUN_AUDIT });
      setLatestAudit(auditResponse.data as AuditEntity);
    }

    const historyResponse = await runtime.sendMessage<ExtensionGuardResponse>({
      type: messageTypes.GET_AUDIT_HISTORY,
    });
    const audits = historyResponse.data as AuditEntity[];
    setHistory(audits);
    setLatestAudit((current) => current ?? audits[0] ?? null);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRun]);

  return { latestAudit, history, loading, refresh };
};
