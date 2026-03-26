export class ManagementAdapter {
  async getAll(): Promise<chrome.management.ExtensionInfo[]> {
    return chrome.management.getAll();
  }

  async getSelf(): Promise<chrome.management.ExtensionInfo> {
    return chrome.management.getSelf();
  }
}
