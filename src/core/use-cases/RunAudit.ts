import { AuditComposer } from "@/core/services/AuditComposer";
import { GetInstalledExtensions } from "./GetInstalledExtensions";
import { AuditHistoryRepository } from "@/storage/repositories/AuditHistoryRepository";
import type { AuditEntity } from "@/core/domain/types/audit.types";

export class RunAudit {
  constructor(
    private readonly getInstalledExtensions = new GetInstalledExtensions(),
    private readonly composer = new AuditComposer(),
    private readonly repository = new AuditHistoryRepository(),
  ) {}

  async execute(): Promise<AuditEntity> {
    const items = await this.getInstalledExtensions.execute();
    const audit = this.composer.compose(items);
    return this.repository.save(audit);
  }
}
