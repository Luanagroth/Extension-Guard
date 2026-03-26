export const ScoreBar = ({ score }: { score: number }) => (
  <div className="space-y-2">
    <div className="h-2 rounded-full bg-slate-200">
      <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-600" style={{ width: `${score}%` }} />
    </div>
    <p className="text-xs font-medium text-slate-600">Pontuação de risco: {score}/100</p>
  </div>
);
