import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

// App.jsx only wires Navbar and Welcome together inside <main>; the internal
// behavior of those components is covered by their own test suites, so we
// stub them here to keep this test focused on App's own responsibility.
vi.mock("#components", () => ({
  Navbar: () => <div data-testid="navbar-mock" />,
  Welcome: () => <div data-testid="welcome-mock" />,
}));

import App from "./App.jsx";

describe("App", () => {
  it("renders Navbar and Welcome inside a main element", () => {
    const { container, getByTestId } = render(<App />);

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(getByTestId("navbar-mock")).toBeInTheDocument();
    expect(getByTestId("welcome-mock")).toBeInTheDocument();
  });

  it("renders Navbar before Welcome", () => {
    const { container } = render(<App />);
    const main = container.querySelector("main");

    const children = [...main.children];
    const navbarIndex = children.findIndex(
      (el) => el.dataset.testid === "navbar-mock",
    );
    const welcomeIndex = children.findIndex(
      (el) => el.dataset.testid === "welcome-mock",
    );

    expect(navbarIndex).toBeGreaterThanOrEqual(0);
    expect(welcomeIndex).toBeGreaterThan(navbarIndex);
  });
});