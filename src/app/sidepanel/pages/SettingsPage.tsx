import { useEffect, useState } from "react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { useSettings } from "@/shared/hooks/useSettings";

export const SettingsPage = () => {
  const { settings, save } = useSettings();
  const [draft, setDraft] = useState(settings);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  return (
    <Card className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Configurações</h2>
        <p className="mt-1 text-sm text-slate-600">Defina como a auditoria deve exibir resultados e aplicar sensibilidade de risco.</p>
      </div>
      <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <span>Mostrar extensões desabilitadas</span>
        <input type="checkbox" checked={draft.showDisabled} onChange={(event) => setDraft({ ...draft, showDisabled: event.target.checked })} />
      </label>
      <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <span>Mostrar itens do sistema ou temas</span>
        <input type="checkbox" checked={draft.showSystemExtensions} onChange={(event) => setDraft({ ...draft, showSystemExtensions: event.target.checked })} />
      </label>
      <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <span>Executar auditoria automaticamente ao abrir</span>
        <input type="checkbox" checked={draft.autoRunAuditOnOpen} onChange={(event) => setDraft({ ...draft, autoRunAuditOnOpen: event.target.checked })} />
      </label>
      <label className="space-y-2">
        <span className="block text-sm font-medium text-slate-700">Sensibilidade do risco</span>
        <select className="w-full rounded-2xl border border-slate-200 bg-white p-3" value={draft.riskSensitivity} onChange={(event) => setDraft({ ...draft, riskSensitivity: event.target.value as typeof draft.riskSensitivity })}>
          <option value="relaxed">Baixa</option>
          <option value="balanced">Equilibrada</option>
          <option value="strict">Alta</option>
        </select>
      </label>
      <Button onClick={() => void save(draft)}>Salvar configurações</Button>
    </Card>
  );
};
