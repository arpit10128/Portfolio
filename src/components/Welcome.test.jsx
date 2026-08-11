import { useEffect } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";

// gsap.to is mocked so we can assert on the animation calls made by
// Welcome's hover handlers without depending on the real gsap engine.
const { gsapToMock } = vi.hoisted(() => ({
  gsapToMock: vi.fn(() => ({ kill: vi.fn() })),
}));

vi.mock("gsap", () => ({
  default: {
    to: gsapToMock,
  },
}));

// @gsap/react's useGSAP behaves like an effect: it runs the callback after
// mount and invokes whatever cleanup function the callback returns when the
// component unmounts (or deps change). We reproduce that contract with a
// plain useEffect so Welcome's real logic (including its own cleanup
// handling) runs unmodified.
vi.mock("@gsap/react", () => ({
  useGSAP: (callback, deps) => {
    useEffect(() => {
      return callback();
    }, deps);
  },
}));

import Welcome from "./Welcome";

const SUBTITLE_TEXT = "Hey, I'm Arpit Saraswat! Welcome to my";
const TITLE_TEXT = "Portfolio";

describe("Welcome", () => {
  beforeEach(() => {
    gsapToMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the section with the expected id", () => {
    const { container } = render(<Welcome />);
    expect(container.querySelector("section#welcome")).toBeInTheDocument();
  });

  it("renders the title split into one span per character", () => {
    const { container } = render(<Welcome />);
    const title = container.querySelector("h1");
    const spans = title.querySelectorAll("span");

    expect(spans).toHaveLength(TITLE_TEXT.length);
    expect(title.textContent).toBe(TITLE_TEXT);

    spans.forEach((span) => {
      expect(span).toHaveClass("text-9xl", "font-georama");
      expect(span.style.fontVariationSettings).toBe("'wght' 400");
    });
  });

  it("renders the subtitle split into one span per character, converting spaces to non-breaking spaces", () => {
    const { container } = render(<Welcome />);
    const subtitle = container.querySelector("section#welcome > p");
    const spans = subtitle.querySelectorAll("span");

    expect(spans).toHaveLength([...SUBTITLE_TEXT].length);

    spans.forEach((span) => {
      expect(span).toHaveClass("text-3xl", "font-georama");
      expect(span.style.fontVariationSettings).toBe("'wght' 100");
    });

    const spaceSpans = [...spans].filter(
      (span) => span.textContent === "\u00A0",
    );
    const expectedSpaceCount = [...SUBTITLE_TEXT].filter(
      (char) => char === " ",
    ).length;
    expect(spaceSpans).toHaveLength(expectedSpaceCount);

    // non-space characters should render verbatim
    const nonSpaceSpans = [...spans].filter(
      (span) => span.textContent !== "\u00A0",
    );
    expect(nonSpaceSpans.map((s) => s.textContent).join("")).toBe(
      SUBTITLE_TEXT.replace(/ /g, ""),
    );
  });

  it("renders the small-screen fallback message", () => {
    const { container } = render(<Welcome />);
    const message = container.querySelector(".small-screen p");

    expect(message).toHaveTextContent(
      "This portfolio is designed for desktop/tablet screens only.",
    );
  });

  it("animates every title letter towards the max weight when the cursor is centered over a letter", () => {
    const { container } = render(<Welcome />);
    const title = container.querySelector("h1");

    fireEvent.mouseMove(title, { clientX: 0 });

    // jsdom reports all-zero bounding rects, so with clientX 0 the computed
    // distance for every letter is 0, driving intensity to 1 (max weight).
    expect(gsapToMock).toHaveBeenCalledTimes(TITLE_TEXT.length);
    gsapToMock.mock.calls.forEach(([, options]) => {
      expect(options).toMatchObject({
        duration: 0.25,
        ease: "power2.out",
        fontVariationSettings: "'wght' 900",
      });
    });
  });

  it("animates title letters towards the min weight when the cursor is far away", () => {
    const { container } = render(<Welcome />);
    const title = container.querySelector("h1");

    fireEvent.mouseMove(title, { clientX: 1000 });

    expect(gsapToMock).toHaveBeenCalledTimes(TITLE_TEXT.length);
    gsapToMock.mock.calls.forEach(([, options]) => {
      expect(options.fontVariationSettings).toBe("'wght' 400");
    });
  });

  it("resets title letters to the default weight on mouse leave", () => {
    const { container } = render(<Welcome />);
    const title = container.querySelector("h1");

    fireEvent.mouseMove(title, { clientX: 0 });
    gsapToMock.mockClear();

    fireEvent.mouseLeave(title);

    expect(gsapToMock).toHaveBeenCalledTimes(TITLE_TEXT.length);
    gsapToMock.mock.calls.forEach(([, options]) => {
      expect(options).toMatchObject({
        duration: 0.3,
        ease: "power2.out",
        fontVariationSettings: "'wght' 400",
      });
    });
  });

  it("animates subtitle letters towards their max weight on mouse move and resets on mouse leave", () => {
    const { container } = render(<Welcome />);
    const subtitle = container.querySelector("section#welcome > p");

    fireEvent.mouseMove(subtitle, { clientX: 0 });
    expect(gsapToMock).toHaveBeenCalledTimes([...SUBTITLE_TEXT].length);
    gsapToMock.mock.calls.forEach(([, options]) => {
      expect(options.fontVariationSettings).toBe("'wght' 400");
    });

    gsapToMock.mockClear();
    fireEvent.mouseLeave(subtitle);
    expect(gsapToMock).toHaveBeenCalledTimes([...SUBTITLE_TEXT].length);
    gsapToMock.mock.calls.forEach(([, options]) => {
      expect(options).toMatchObject({
        duration: 0.3,
        fontVariationSettings: "'wght' 100",
      });
    });
  });

  it("does not throw when unmounted", () => {
    const { unmount } = render(<Welcome />);
    expect(() => unmount()).not.toThrow();
  });

  it("keeps the hover listeners attached to the title node after unmount (documents current cleanup behavior)", () => {
    // The effect cleanup returned from Welcome's useGSAP callback references
    // its inner cleanup functions via a comma expression instead of calling
    // them, so the mousemove/mouseleave listeners registered by
    // setupTextHover are never actually removed. This test pins down that
    // current behavior; if the cleanup bug is fixed, this test should be
    // updated to assert listeners *are* removed instead.
    const { container, unmount } = render(<Welcome />);
    const title = container.querySelector("h1");

    unmount();
    gsapToMock.mockClear();

    fireEvent.mouseMove(title, { clientX: 0 });

    expect(gsapToMock).toHaveBeenCalledTimes(TITLE_TEXT.length);
  });
});