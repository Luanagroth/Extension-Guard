import type { RiskLevel } from "@/core/domain/value-objects/RiskLevel";

const tabs: Array<{ value: RiskLevel | "all"; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "low", label: "Baixo" },
  { value: "moderate", label: "Moderado" },
  { value: "high", label: "Alto" },
  { value: "critical", label: "Crítico" },
];

export const FilterTabs = ({ value, onChange }: { value: RiskLevel | "all"; onChange: (value: RiskLevel | "all") => void }) => (
  <div className="flex flex-wrap gap-2">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wide ${value === tab.value ? "border-ink bg-ink text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
        onClick={() => onChange(tab.value)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
