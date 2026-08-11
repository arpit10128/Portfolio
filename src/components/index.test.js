import { describe, it, expect } from "vitest";
import { Navbar, Welcome } from "./index.js";
import NavbarDefault from "./Navbar.jsx";
import WelcomeDefault from "./Welcome.jsx";

describe("components barrel file", () => {
  it("re-exports Navbar as a named export matching the default export", () => {
    expect(Navbar).toBe(NavbarDefault);
    expect(typeof Navbar).toBe("function");
  });

  it("re-exports Welcome as a named export matching the default export", () => {
    expect(Welcome).toBe(WelcomeDefault);
    expect(typeof Welcome).toBe("function");
  });

  it("exports exactly Navbar and Welcome", () => {
    const barrel = { Navbar, Welcome };
    expect(Object.keys(barrel).sort()).toEqual(["Navbar", "Welcome"]);
  });
});