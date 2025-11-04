import React, { useState, useEffect } from "react";
import "./LoaderPage.scss";
import { Logos } from "../../components/sections";

interface IProps {
  onLoadingComplete?: () => void;
}

const LoaderPage: React.FC<IProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [barAnimationPhase, setBarAnimationPhase] = useState<
    "initial" | "growing" | "ready"
  >("initial");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Wait 1000ms then hide loader
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete?.();
          }, 1000);
          return 100;
        }

        // More varied random increments: 1% to 7%
        // Use weighted randomization to control average loading time
        let randomIncrement;
        const rand = Math.random();

        if (rand < 0.3) {
          // 30% chance: small increment (1-2%)
          randomIncrement = Math.random() * 1 + 1; // 1 to 2
        } else if (rand < 0.7) {
          // 40% chance: medium increment (2-4%)
          randomIncrement = Math.random() * 2 + 2; // 2 to 4
        } else {
          // 30% chance: large increment (4-7%)
          randomIncrement = Math.random() * 3 + 4; // 4 to 7
        }

        const newProgress = Math.min(prev + randomIncrement, 100);

        // Slower intervals between 200ms and 1000ms
        const randomInterval = Math.random() * 800 + 200; // 200ms to 1000ms

        timeoutId = setTimeout(updateProgress, randomInterval);

        return newProgress;
      });
    };

    // Animation sequence:
    // 1. Bar appears at 70% width (initial state)
    // 2. After 500ms, start growing to full width (500ms animation)
    // 3. Wait 1 second at full width
    // 4. Then start the loading progress

    const phase1Timeout = setTimeout(() => {
      // Start growing animation after 500ms
      setBarAnimationPhase("growing");
    }, 500);

    const phase2Timeout = setTimeout(() => {
      // Animation complete, bar is now full width
      setBarAnimationPhase("ready");
    }, 1000); // 500ms + 500ms animation

    const phase3Timeout = setTimeout(() => {
      // Start loading after another 1 second wait
      setHasStartedLoading(true);
      // Start the first progress update
      const initialDelay = Math.random() * 800 + 200; // 200-1000ms
      timeoutId = setTimeout(updateProgress, initialDelay);
    }, 2000); // 500ms + 500ms + 1000ms

    return () => {
      clearTimeout(phase1Timeout);
      clearTimeout(phase2Timeout);
      clearTimeout(phase3Timeout);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="loader-page">
      <div className="loader-content">
        <Logos />

        <div className="loader-content-bottom">
          <div className="loader-logo">
            <div className="loader-text" style={{ textAlign: "center" }}>
              <span style={{ fontSize: "14px" }}>THE</span> HALL{" "}
              <span style={{ fontSize: "14px" }}>OF</span>
            </div>

            <div className="loader-text">ZERO LIMITS</div>
          </div>

          <div className="progress-container">
            <div className={`progress-bar progress-bar--${barAnimationPhase}`}>
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            {hasStartedLoading && (
              <div className="progress-text" style={{ left: `${progress}%` }}>
                {Math.round(progress)}%
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderPage;
