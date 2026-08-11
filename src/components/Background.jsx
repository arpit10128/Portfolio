import { useEffect, useState } from "react";

const STAR_COUNT = 110;

function makeStars() {
  return Array.from({ length: STAR_COUNT }, (_, index) => {
    const size =
      Math.random() < 0.12
        ? 3
        : Math.random() < 0.4
          ? 2
          : 1;
    const angle = Math.random() * Math.PI * 2;
    const distance = 25 + Math.random() * 55; // px, drift amplitude
    return {
      id: index,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size,
      minOpacity: 0.15 + Math.random() * 0.25,
      twinkleDuration: 2 + Math.random() * 4,
      twinkleDelay: Math.random() * 5,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      driftDuration: 4 + Math.random() * 6, // faster, noticeable motion
      driftDelay: Math.random() * -8,
    };
  });
}

const Background = () => {
  const [stars] = useState(makeStars); // random once per mount, stable across re-renders
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    let nextId = 0;
    let scheduleId;

    const createShootingStar = () => {
      const goingRight = Math.random() < 0.5;
      const magnitude = 20 + Math.random() * 35; // 20°–55° steepness, randomized
      const angle = goingRight
        ? magnitude
        : 180 - magnitude;

      const distance = 420 + Math.random() * 220; // travel length, randomized
      const rad = (angle * Math.PI) / 180;
      const dx = Math.cos(rad) * distance; // negative automatically for "/"
      const dy = Math.sin(rad) * distance; // always positive → falls downward

      const star = {
        id: nextId++,
        top: 8 + Math.random() * 45,
        left: goingRight
          ? Math.random() * 55
          : 25 + Math.random() * 55, // keep line on-screen either way
        duration: 1 + Math.random() * 0.6,
        angle: `${angle}deg`,
        dx: `${dx}px`,
        dy: `${dy}px`,
      };

      setShootingStars((current) => [
        ...current.slice(-3),
        star,
      ]);

      window.setTimeout(
        () => {
          setShootingStars((current) =>
            current.filter((item) => item.id !== star.id),
          );
        },
        star.duration * 1000 + 400,
      );

      scheduleId = window.setTimeout(
        createShootingStar,
        3500 + Math.random() * 5500,
      );
    };

    const initialTimeout = window.setTimeout(
      createShootingStar,
      1500,
    );

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearTimeout(scheduleId);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030405] text-white selection:bg-white/20">
      <div className="space-background" aria-hidden="true">
        <div className="nebula nebula-one" />
        <div className="nebula nebula-two" />

        <div className="star-layer">
          {stars.map((star) => (
            <span
              className="star-wrap"
              key={star.id}
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDuration: `${star.driftDuration}s`,
                animationDelay: `${star.driftDelay}s`,
                "--dx": `${star.dx}px`,
                "--dy": `${star.dy}px`,
              }}
            >
              <span
                className="star"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDuration: `${star.twinkleDuration}s`,
                  animationDelay: `${star.twinkleDelay}s`,
                  "--min-o": star.minOpacity,
                }}
              />
            </span>
          ))}
        </div>

        {shootingStars.map((star) => (
          <span
            className="shooting-star-wrap"
            key={star.id}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDuration: `${star.duration}s`,
              animationName: "shoot-move",
              "--dx": star.dx,
              "--dy": star.dy,
            }}
          >
            <span
              className="shooting-star"
              style={{ "--angle": star.angle }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Background;
