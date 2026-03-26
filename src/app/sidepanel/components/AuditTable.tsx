import { Card } from "@/shared/ui/Card";
import { formatDateTime } from "@/shared/utils/date";
import type { AuditEntity } from "@/core/domain/types/audit.types";

export const AuditTable = ({ audits }: { audits: AuditEntity[] }) => (
  <Card>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-slate-500">
            <th className="pb-3">Data</th>
            <th className="pb-3">Total</th>
            <th className="pb-3">Média</th>
            <th className="pb-3">Críticas</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <tr key={audit.id} className="border-t border-slate-100">
              <td className="py-3">{formatDateTime(audit.createdAt)}</td>
              <td>{audit.totalExtensions}</td>
              <td>{audit.averageScore}</td>
              <td>{audit.criticalCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);
