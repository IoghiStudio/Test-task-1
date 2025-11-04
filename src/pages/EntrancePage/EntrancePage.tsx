import React, { useEffect, useRef, useState } from "react";
import "./EntrancePage.scss";
import { Logos } from "../../components/sections";

interface IProps {
  onEntranceComplete?: () => void;
}

const EntrancePage: React.FC<IProps> = ({ onEntranceComplete }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLogos, setShowLogos] = useState(false);
  const [showTitleAnimation, setShowTitleAnimation] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pageRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate the offset from center (0 to 1, then -1 to 1)
      const xOffset = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yOffset = (clientY / innerHeight - 0.5) * 2; // -1 to 1

      // Convert to pixel movement (max 50px in each direction, reversed)
      const moveX = -xOffset * 50; // Negative to reverse direction
      const moveY = -yOffset * 50; // Negative to reverse direction

      // Apply the CSS custom properties for the background transform
      pageRef.current.style.setProperty("--mouse-x", `${moveX}px`);
      pageRef.current.style.setProperty("--mouse-y", `${moveY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogos(true);
    }, 1500);

    return () => {
      clearTimeout(logoTimer);
    };
  }, []);

  useEffect(() => {
    // Start title animation immediately when component mounts
    const titleTimer = setTimeout(() => {
      setShowTitleAnimation(true);
    }, 500); // Small delay for dramatic effect

    return () => {
      clearTimeout(titleTimer);
    };
  }, []);

  const handleContinue = () => {
    setIsTransitioning(true);

    // Start the transition animation
    setTimeout(() => {
      onEntranceComplete?.();
    }, 2000); // 2 seconds for the transition
  };

  return (
    <div
      className={`entrance-page ${isTransitioning ? "transitioning" : ""}`}
      ref={pageRef}
    >
      <div className="entrance-content">
        {showLogos ? (
          <Logos />
        ) : (
          <div className="logos-placeholder">
            {/* Invisible space placeholder */}
          </div>
        )}

        <div className="entrance-title">
          <div
            className={`title-line title-line-top ${
              showTitleAnimation ? "animate-in" : ""
            }`}
          >
            <span
              className="title-small"
              style={{ position: "relative", top: "13px" }}
            >
              THE
            </span>
            <h1>HALL</h1>
            <span
              className="title-small"
              style={{ position: "relative", bottom: "13px" }}
            >
              OF
            </span>
          </div>

          <div className="title-divider"></div>

          <div
            className={`title-line title-line-bottom ${
              showTitleAnimation ? "animate-in" : ""
            }`}
          >
            <h1>
              ZER
              <span className="letter-with-dot">
                O<span className="dot-overlay"></span>
              </span>{" "}
              LIMITS
            </h1>
          </div>

          <div className="subtitle-container">
            <p>STOP SEARCHING DEVS.</p>
            <p>HIRE ME INSTEAD.</p>
          </div>
        </div>

        <div className="entrance-actions">
          <button className="entrance-button" onClick={handleContinue}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntrancePage;
