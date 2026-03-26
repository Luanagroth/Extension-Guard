import { GetInstalledExtensions } from "./GetInstalledExtensions";
import type { ExtensionEntity } from "@/core/domain/types/extension.types";

export class AnalyzeExtension {
  constructor(private readonly getInstalledExtensions = new GetInstalledExtensions()) {}

  async execute(extensionId: string): Promise<ExtensionEntity | null> {
    const items = await this.getInstalledExtensions.execute();
    return items.find((item) => item.id === extensionId) || null;
  }
}
