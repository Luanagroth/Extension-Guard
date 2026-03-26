import { createHashRouter } from "react-router-dom";
import { SidePanelLayout } from "./layouts/SidePanelLayout";
import { AuditHistoryPage } from "./pages/AuditHistoryPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ExtensionDetailsPage } from "./pages/ExtensionDetailsPage";
import { ExtensionsPage } from "./pages/ExtensionsPage";
import { SettingsPage } from "./pages/SettingsPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <SidePanelLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "extensions", element: <ExtensionsPage /> },
      { path: "extensions/:extensionId", element: <ExtensionDetailsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "history", element: <AuditHistoryPage /> },
    ],
  },
]);
