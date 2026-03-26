import { Link } from "react-router-dom";
import { Card } from "@/shared/ui/Card";
import { RiskBadge } from "./RiskBadge";
import { ScoreBar } from "./ScoreBar";
import type { ExtensionEntity } from "@/core/domain/types/extension.types";

export const ExtensionCard = ({ extension }: { extension: ExtensionEntity }) => (
  <Card className="space-y-4 bg-white/95">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600">
            {extension.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-ink">{extension.name}</h3>
            <p className="text-sm text-slate-500">v{extension.version}</p>
          </div>
        </div>
      </div>
      <RiskBadge level={extension.riskLevel} />
    </div>
    <p className="text-sm leading-6 text-slate-600">{extension.description}</p>
    <div className="rounded-2xl bg-slate-50 p-4">
      <ScoreBar score={extension.riskScore} />
    </div>
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{extension.permissions.length + extension.hostPermissions.length} permissões analisadas</p>
      <Link className="text-sm font-semibold text-slate-700 hover:text-ink" to={`/extensions/${extension.id}`}>
        Ver detalhes
      </Link>
    </div>
  </Card>
);
