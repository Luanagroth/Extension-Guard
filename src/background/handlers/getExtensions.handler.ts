import { GetInstalledExtensions } from "@/core/use-cases/GetInstalledExtensions";

export const getExtensionsHandler = async () => {
  const useCase = new GetInstalledExtensions();
  return useCase.execute();
};
