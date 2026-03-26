import { registerOnInstalledListener } from "@/background/listeners/onInstalled.listener";
import { registerOnMessageListener } from "@/background/listeners/onMessage.listener";

registerOnInstalledListener();
registerOnMessageListener();
