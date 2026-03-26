import { useMemo, useState } from "react";
import { ExtensionList } from "../components/ExtensionList";
import { FilterTabs } from "../components/FilterTabs";
import { SearchInput } from "../components/SearchInput";
import { Loader } from "@/shared/ui/Loader";
import { useExtensions } from "@/shared/hooks/useExtensions";
import type { RiskLevel } from "@/core/domain/value-objects/RiskLevel";

export const ExtensionsPage = () => {
  const { extensions, loading } = useExtensions();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RiskLevel | "all">("all");

  const filtered = useMemo(
    () =>
      extensions.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || item.riskLevel === filter;
        return matchesSearch && matchesFilter;
      }),
    [extensions, filter, search],
  );

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} />
        <FilterTabs value={filter} onChange={setFilter} />
      </div>
      <ExtensionList extensions={filtered} />
    </div>
  );
};
