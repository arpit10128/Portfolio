import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

const useLiveTime = (format = "ddd MMM D h:mm A") => {
  const [time, setTime] = useState(dayjs().format(format));
  const timeoutRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      setTime(dayjs().format(format));

      // calculate ms remaining until the next exact second
      const msUntilNextSecond = 1000 - (Date.now() % 1000);
      timeoutRef.current = setTimeout(
        tick,
        msUntilNextSecond,
      );
    };

    tick(); // start immediately, aligned to the next second

    return () => clearTimeout(timeoutRef.current);
  }, [format]);

  return time;
};

export default useLiveTime;
