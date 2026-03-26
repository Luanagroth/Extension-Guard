import type { PermissionEntity } from "@/core/domain/entities/PermissionEntity";
import { permissionMetadata } from "@/core/constants/permissionMetadata";

export class PermissionExplainer {
  explain(permission: string): PermissionEntity {
    return (
      permissionMetadata[permission] || {
        key: permission,
        label: permission,
        technicalDescription: "No curated technical explanation is available yet.",
        humanDescription: "Esta permissão ainda não possui descrição detalhada no glossário do MVP.",
        sensitivity: "balanced",
        recommendation: "Revise essa permissão na documentação do Chrome antes de manter a extensão ativa.",
      }
    );
  }

  explainAll(permissions: string[]): PermissionEntity[] {
    return permissions.map((permission) => this.explain(permission));
  }
}
