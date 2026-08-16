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
    const endpoint = alreadyCounted ? "" : "/up"; // "" = read only, "/up" = increment + read
    const url = `https://api.counterapi.dev/v2/${WORKSPACE}/${COUNTER_NAME}${endpoint}?_=${Date.now()}`;

    if (!alreadyCounted)
      sessionStorage.setItem("visitor-counted", "true");

    fetch(url, { cache: "no-store" })
      .then((res) => res.json())
      .then((result) => {
        setCount(
          result?.data?.up_count ??
            result?.data?.count ??
            null,
        );
      })
      .catch((err) => {
        console.error("Visitor counter error:", err);
        setCount(null);
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
