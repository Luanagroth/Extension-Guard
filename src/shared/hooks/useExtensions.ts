import { useEffect, useState } from "react";
import { RuntimeAdapter } from "@/chrome/adapters/runtime.adapter";
import { messageTypes, type ExtensionGuardResponse } from "@/core/domain/types/message.types";
import type { ExtensionEntity } from "@/core/domain/types/extension.types";

const runtime = new RuntimeAdapter();

export const useExtensions = () => {
  const [extensions, setExtensions] = useState<ExtensionEntity[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const response = await runtime.sendMessage<ExtensionGuardResponse>({ type: messageTypes.GET_EXTENSIONS });
    setExtensions(response.data as ExtensionEntity[]);
    setLoading(false);
  };

  useEffect(() => {
    refresh().catch(() => setLoading(false));
  }, []);

  return { extensions, loading, refresh };
};
