import { Card } from "@/shared/ui/Card";

export const RecommendationBox = ({ recommendation }: { recommendation: string }) => (
  <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-white">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recomendação final</p>
    <p className="mt-3 text-sm leading-6 text-slate-700">{recommendation}</p>
  </Card>
);
