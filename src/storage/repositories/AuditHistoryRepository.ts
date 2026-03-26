import { StorageAdapter } from "@/chrome/adapters/storage.adapter";
import { storageKeys } from "@/core/constants/appConfig";
import { auditHistorySchema, auditSchema } from "@/shared/lib/schemas";
import type { AuditEntity } from "@/core/domain/types/audit.types";

export class AuditHistoryRepository {
  constructor(private readonly storage = new StorageAdapter()) {}

  async getAll(): Promise<AuditEntity[]> {
    const stored = await this.storage.get<AuditEntity[]>(storageKeys.auditHistory);
    return stored ? auditHistorySchema.parse(stored) : [];
  }

  async save(audit: AuditEntity): Promise<AuditEntity> {
    const parsed = auditSchema.parse(audit);
    const history = await this.getAll();
    const next = [parsed, ...history].slice(0, 20);
    await this.storage.set(storageKeys.auditHistory, next);
    await this.storage.set(storageKeys.latestAudit, parsed);
    return parsed;
  }
}
