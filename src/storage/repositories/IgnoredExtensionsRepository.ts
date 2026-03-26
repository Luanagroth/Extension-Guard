import { StorageAdapter } from "@/chrome/adapters/storage.adapter";
import { storageKeys } from "@/core/constants/appConfig";
import { ignoredExtensionsSchema } from "@/shared/lib/schemas";

export class IgnoredExtensionsRepository {
  constructor(private readonly storage = new StorageAdapter()) {}

  async getAll(): Promise<string[]> {
    const stored = await this.storage.get<string[]>(storageKeys.ignoredExtensions);
    return stored ? ignoredExtensionsSchema.parse(stored) : [];
  }

  async save(ids: string[]): Promise<string[]> {
    const parsed = ignoredExtensionsSchema.parse(ids);
    await this.storage.set(storageKeys.ignoredExtensions, parsed);
    return parsed;
  }
}
