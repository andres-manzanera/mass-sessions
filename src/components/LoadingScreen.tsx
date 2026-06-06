"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 1.8s, then fully unmount at 2.4s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const removeTimer = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  // Bar configs: height range and animation delay for each bar
  const bars = [
    { delay: "0s",    minH: 8,  maxH: 48 },
    { delay: "0.1s",  minH: 16, maxH: 72 },
    { delay: "0.2s",  minH: 24, maxH: 96 },
    { delay: "0.15s", minH: 12, maxH: 64 },
    { delay: "0.05s", minH: 20, maxH: 80 },
    { delay: "0.25s", minH: 8,  maxH: 56 },
    { delay: "0.35s", minH: 28, maxH: 88 },
    { delay: "0.1s",  minH: 16, maxH: 72 },
    { delay: "0.3s",  minH: 10, maxH: 52 },
    { delay: "0.2s",  minH: 22, maxH: 76 },
    { delay: "0.4s",  minH: 6,  maxH: 44 },
    { delay: "0.15s", minH: 18, maxH: 68 },
    { delay: "0.05s", minH: 26, maxH: 84 },
    { delay: "0.25s", minH: 12, maxH: 60 },
    { delay: "0.35s", minH: 20, maxH: 78 },
    { delay: "0s",    minH: 8,  maxH: 50 },
    { delay: "0.1s",  minH: 24, maxH: 92 },
    { delay: "0.3s",  minH: 14, maxH: 66 },
    { delay: "0.2s",  minH: 10, maxH: 54 },
    { delay: "0.4s",  minH: 28, maxH: 86 },
  ];

  return (
    <div
      className="loading-screen"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Brand mark */}
      <p className="loading-brand">MASS SESSIONS</p>

      {/* Audio waveform bars */}
      <div className="loading-wave">
        {bars.map((bar, i) => (
          <span
            key={i}
            className="loading-bar"
            style={{
              animationDelay: bar.delay,
              "--bar-min": `${bar.minH}px`,
              "--bar-max": `${bar.maxH}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Loading label */}
      <p className="loading-label">Loading<span className="loading-dots" /></p>
    </div>
  );
}
