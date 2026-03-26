export const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <input
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder="Buscar extensões"
    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
  />
);
