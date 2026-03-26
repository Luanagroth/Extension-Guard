import { SettingsRepository } from "@/storage/repositories/SettingsRepository";
import type { SettingsEntity } from "@/core/domain/types/settings.types";

export class SaveSettings {
  constructor(private readonly repository = new SettingsRepository()) {}

  async execute(settings: SettingsEntity): Promise<SettingsEntity> {
    return this.repository.save(settings);
  }
}
