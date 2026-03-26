import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DashboardPage } from "@/app/sidepanel/pages/DashboardPage";

vi.mock("@/shared/hooks/useAudit", () => ({
  useAudit: () => ({
    loading: false,
    refresh: vi.fn(),
    latestAudit: {
      id: "audit-1",
      createdAt: new Date().toISOString(),
      totalExtensions: 3,
      lowCount: 1,
      moderateCount: 1,
      highCount: 0,
      criticalCount: 1,
      averageScore: 41,
      items: [
        {
          id: "x",
          name: "Critical One",
          shortName: "Critical One",
          description: "desc",
          version: "1.0.0",
          enabled: true,
          type: "extension",
          installType: "normal",
          homepageUrl: undefined,
          icons: [],
          permissions: [],
          hostPermissions: ["<all_urls>"],
          riskScore: 88,
          riskLevel: "critical",
          riskReasons: ["Possui acesso amplo a praticamente todos os sites."],
          recommendation: "Revise com urgência",
        },
      ],
    },
  }),
}));

describe("DashboardPage", () => {
  it("renders audit summary cards and critical extension list", () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Resumo executivo")).toBeInTheDocument();
    expect(screen.getByText("Extensões mais críticas")).toBeInTheDocument();
    expect(screen.getByText("Critical One")).toBeInTheDocument();
  });
});
