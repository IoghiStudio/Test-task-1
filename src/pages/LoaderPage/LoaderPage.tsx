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
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete?.();
          }, 1000);
          return 100;
        }

        let randomIncrement;
        const rand = Math.random();

        if (rand < 0.3) {
          randomIncrement = Math.random() * 1 + 1;
        } else if (rand < 0.7) {
          randomIncrement = Math.random() * 2 + 2;
        } else {
          randomIncrement = Math.random() * 3 + 4;
        }

        const newProgress = Math.min(prev + randomIncrement, 100);

        const randomInterval = Math.random() * 800 + 200;

        timeoutId = setTimeout(updateProgress, randomInterval);

        return newProgress;
      });
    };

    const phase1Timeout = setTimeout(() => {
      setBarAnimationPhase("growing");
    }, 500);

    const phase2Timeout = setTimeout(() => {
      setBarAnimationPhase("ready");
    }, 1000);

    const phase3Timeout = setTimeout(() => {
      setHasStartedLoading(true);
      const initialDelay = Math.random() * 800 + 200;
      timeoutId = setTimeout(updateProgress, initialDelay);
    }, 2000);

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
