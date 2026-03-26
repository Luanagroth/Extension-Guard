import { AnalyzeExtension } from "@/core/use-cases/AnalyzeExtension";

export const getExtensionDetailsHandler = async (extensionId: string) => {
  const useCase = new AnalyzeExtension();
  return useCase.execute(extensionId);
};
