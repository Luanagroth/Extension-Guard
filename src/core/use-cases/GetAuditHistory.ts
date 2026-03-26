import { AuditHistoryRepository } from "@/storage/repositories/AuditHistoryRepository";

export class GetAuditHistory {
  constructor(private readonly repository = new AuditHistoryRepository()) {}

  async execute() {
    return this.repository.getAll();
  }
}
