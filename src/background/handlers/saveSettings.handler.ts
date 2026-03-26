import { SaveSettings } from "@/core/use-cases/SaveSettings";
import type { SettingsEntity } from "@/core/domain/types/settings.types";

export const saveSettingsHandler = async (settings: SettingsEntity) => {
  const useCase = new SaveSettings();
  return useCase.execute(settings);
};
