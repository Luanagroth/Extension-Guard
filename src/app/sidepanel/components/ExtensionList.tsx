import { ExtensionCard } from "./ExtensionCard";
import { EmptyState } from "./EmptyState";
import type { ExtensionEntity } from "@/core/domain/types/extension.types";

export const ExtensionList = ({ extensions }: { extensions: ExtensionEntity[] }) => {
  if (!extensions.length) {
    return <EmptyState title="Nenhuma extensão encontrada" description="Tente ajustar a busca ou o filtro de risco." />;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {extensions.map((extension) => (
        <ExtensionCard key={extension.id} extension={extension} />
      ))}
    </div>
  );
};
