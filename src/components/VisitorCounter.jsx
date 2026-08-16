import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

// Give these a name unique to your site so your counter doesn't collide with
// anyone else's. Your domain (no dots/spaces) is a safe, unique choice.
const WORKSPACE = "portfolio-omega-swart-46-vercel-app";
const COUNTER_NAME = "total-visits-arpit-portfolio";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const alreadyCounted = sessionStorage.getItem(
      "visitor-counted",
    );
    const shouldIncrement = !alreadyCounted;
    const endpoint = shouldIncrement ? "/up" : ""; // "" = read only, "/up" = increment + read
    const url = `https://api.counterapi.dev/v2/${WORKSPACE}/${COUNTER_NAME}${endpoint}?_=${Date.now()}`;
    const controller = new AbortController();
    const timeoutMs = 5000;
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            `Counter request failed: ${res.status}`,
          );
        }

        const result = await res.json();
        const rawCount =
          result?.data?.up_count ??
          result?.data?.count ??
          null;
        const parsedCount =
          typeof rawCount === "number"
            ? rawCount
            : typeof rawCount === "string" &&
                rawCount.trim() !== ""
              ? Number(rawCount)
              : null;

        if (!Number.isFinite(parsedCount)) {
          throw new Error(
            "Invalid visitor counter response",
          );
        }

        if (shouldIncrement) {
          sessionStorage.setItem("visitor-counted", "true");
        }

        setCount(parsedCount);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") {
          console.error("Visitor counter error:", err);
        }
        setCount(null);
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });
  }, []);

  return (
    <span
      className="flex items-center gap-1 text-white text-sm font-medium"
      title="Total lifetime visitors"
    >
      <ArrowUp size={14} className="text-green-600" />{" "}
      {count !== null ? count.toLocaleString() : "--"}
    </span>
  );
}
