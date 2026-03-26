import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RuntimeAdapter } from "@/chrome/adapters/runtime.adapter";
import { PermissionExplainer } from "@/core/services/PermissionExplainer";
import { messageTypes, type ExtensionGuardResponse } from "@/core/domain/types/message.types";
import type { ExtensionEntity } from "@/core/domain/types/extension.types";
import { Card } from "@/shared/ui/Card";
import { Loader } from "@/shared/ui/Loader";
import { RiskBadge } from "../components/RiskBadge";
import { PermissionChip } from "../components/PermissionChip";
import { RecommendationBox } from "../components/RecommendationBox";
import { ScoreBar } from "../components/ScoreBar";

const runtime = new RuntimeAdapter();
const explainer = new PermissionExplainer();

export const ExtensionDetailsPage = () => {
  const { extensionId = "" } = useParams();
  const [extension, setExtension] = useState<ExtensionEntity | null>(null);

  useEffect(() => {
    runtime
      .sendMessage<ExtensionGuardResponse>({
        type: messageTypes.GET_EXTENSION_DETAILS,
        payload: { extensionId },
      })
      .then((response) => setExtension(response.data as ExtensionEntity | null));
  }, [extensionId]);

  if (!extension) return <Loader />;

  const explainedPermissions = explainer.explainAll([...extension.permissions, ...extension.hostPermissions]);

  return (
    <div className="space-y-6">
      <Card className="space-y-5 bg-white/95">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Análise detalhada</p>
            <div>
              <h2 className="text-2xl font-semibold text-ink">{extension.name}</h2>
              <p className="text-sm text-slate-500">Versão {extension.version}</p>
            </div>
          </div>
          <RiskBadge level={extension.riskLevel} />
        </div>
        <p className="text-sm leading-6 text-slate-600">{extension.description}</p>
        <div className="rounded-2xl bg-slate-50 p-4">
          <ScoreBar score={extension.riskScore} />
        </div>
      </Card>
      <Card className="bg-white/95">
        <h3 className="mb-4 text-lg font-semibold text-ink">Motivos do risco</h3>
        <ul className="space-y-3 text-sm leading-6 text-slate-600">
          {extension.riskReasons.map((reason) => (
            <li key={reason} className="rounded-2xl bg-slate-50 px-4 py-3">{reason}</li>
          ))}
        </ul>
      </Card>
      <Card className="bg-white/95">
        <h3 className="mb-4 text-lg font-semibold text-ink">Permissões</h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {[...extension.permissions, ...extension.hostPermissions].map((permission) => (
            <PermissionChip key={permission} label={permission} />
          ))}
        </div>
        <div className="space-y-4">
          {explainedPermissions.map((item) => (
            <div key={item.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-ink">{item.label}</p>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  sensibilidade {item.sensitivity === "strict" ? "alta" : item.sensitivity === "balanced" ? "média" : "baixa"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.humanDescription}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{item.recommendation}</p>
            </div>
          ))}
        </div>
      </Card>
      <RecommendationBox recommendation={extension.recommendation} />
    </div>
  );
};
