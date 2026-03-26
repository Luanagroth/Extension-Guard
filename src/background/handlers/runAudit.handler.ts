import { RunAudit } from "@/core/use-cases/RunAudit";

export const runAuditHandler = async () => {
  const useCase = new RunAudit();
  return useCase.execute();
};
