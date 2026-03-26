import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ExtensionCard } from "@/app/sidepanel/components/ExtensionCard";

describe("ExtensionCard", () => {
  it("renders extension summary information", () => {
    render(
      <MemoryRouter>
        <ExtensionCard
          extension={{
            id: "abc",
            name: "Guard Test",
            shortName: "Guard Test",
            description: "Checks permissions",
            version: "1.0.0",
            enabled: true,
            type: "extension",
            installType: "normal",
            homepageUrl: undefined,
            icons: [],
            permissions: ["storage"],
            hostPermissions: [],
            riskScore: 22,
            riskLevel: "low",
            riskReasons: [],
            recommendation: "Low risk",
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Guard Test")).toBeInTheDocument();
    expect(screen.getByText(/Pontuação de risco: 22\/100/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver detalhes/i })).toBeInTheDocument();
  });
});
