import { GetAuditHistory } from "@/core/use-cases/GetAuditHistory";

export const getAuditHistoryHandler = async () => {
  const useCase = new GetAuditHistory();
  return useCase.execute();
};
