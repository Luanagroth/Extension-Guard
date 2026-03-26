import { defaultSettings, storageKeys } from "@/core/constants/appConfig";
import { StorageAdapter } from "@/chrome/adapters/storage.adapter";
import { settingsSchema } from "@/shared/lib/schemas";
import type { SettingsEntity } from "@/core/domain/types/settings.types";

export class SettingsRepository {
  constructor(private readonly storage = new StorageAdapter()) {}

  async get(): Promise<SettingsEntity> {
    const stored = await this.storage.get<SettingsEntity>(storageKeys.settings);
    return stored ? settingsSchema.parse(stored) : defaultSettings;
  }

  async save(settings: SettingsEntity): Promise<SettingsEntity> {
    const parsed = settingsSchema.parse(settings);
    await this.storage.set(storageKeys.settings, parsed);
    await this.storage.set(storageKeys.ignoredExtensions, parsed.ignoredExtensionIds);
    return parsed;
  }
}
