import { NavLink, Outlet } from "react-router-dom";
import { BrandMark } from "../components/BrandMark";

const links = [
  ["/", "Painel"],
  ["/extensions", "Extensões"],
  ["/history", "Histórico"],
  ["/settings", "Configurações"],
] as const;

export const SidePanelLayout = () => (
  <div className="min-h-screen px-4 py-6 md:px-8">
    <header className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div className="space-y-3">
        <BrandMark />
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Monitore permissões sensíveis, entenda o nível de exposição de cada extensão e mantenha um histórico local das auditorias executadas.
        </p>
      </div>
      <nav className="flex flex-wrap gap-2">
        {links.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition ${
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-slate-300 bg-slate-100 text-slate-700 hover:border-ink hover:bg-ink hover:text-white"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);
