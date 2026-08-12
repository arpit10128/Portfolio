import { useState, useRef, useCallback, memo } from "react";
import { createPortal } from "react-dom";

// Shifting from react tooltip to own coded tooltip.

/**
 * Lightweight, fast tooltip.
 *
 * Why this is fast:
 * - State is local to this component -> hovering never re-renders your app.
 * - Position is measured once on show, not on every mousemove.
 * - Rendered via a portal to <body> -> immune to parent overflow/z-index clipping.
 * - Animates only opacity/transform -> GPU-composited, no layout thrash.
 * - Debounced show/hide via a ref-based timeout -> no state churn on quick
 *   mouse passes.
 */
const FastTooltip = memo(function FastTooltip({
  children,
  content,
  delay = 120,
  hideDelay = 60,
}) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef(null);
  const anchorRef = useRef(null);

  const show = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const rect =
        anchorRef.current.getBoundingClientRect();
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
      setVisible(true);
    }, delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setVisible(false),
      hideDelay,
    );
  }, [hideDelay]);

  return (
    <span
      ref={anchorRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      style={{ display: "inline-block" }}
    >
      {children}
      {visible &&
        createPortal(
          <div
            role="tooltip"
            style={{
              position: "fixed",
              left: coords.x,
              top: coords.y,
              transform:
                "translate(-50%, calc(-100% - 20px))",
              background: "#1a1a1a/50",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: 6,
              fontSize: 13,
              lineHeight: 1.4,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
              opacity: 1,
              animation: "fastTooltipIn 100ms ease-out",
              willChange: "transform, opacity",
            }}
          >
            {content}
            <style>{`
              @keyframes fastTooltipIn {
                from { opacity: 0; transform: translate(-50%, calc(-100% - 4px)); }
                to   { opacity: 1; transform: translate(-50%, calc(-100% - 20px)); }
              }
            `}</style>
          </div>,
          document.body,
        )}
    </span>
  );
});

export default FastTooltip;

/* Usage:
  <FastTooltip content="Saved to your drafts">
    <button>Save</button>
  </FastTooltip>
*/
