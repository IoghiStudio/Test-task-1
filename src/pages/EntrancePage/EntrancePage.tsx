import React, { useEffect, useRef, useState } from "react";
import "./EntrancePage.scss";
import { Logos } from "../../components/sections";

interface IProps {
  onEntranceComplete?: () => void;
}

const EntrancePage: React.FC<IProps> = ({ onEntranceComplete }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
        <Logos />

        <div className="entrance-title">
          <div className="title-line">
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
          <div className="title-line">
            <h1>ZERO LIMITS</h1>
          </div>
          <p>ZERO LIMITS</p>
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
