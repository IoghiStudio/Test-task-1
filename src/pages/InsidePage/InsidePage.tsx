import React, { useEffect, useState, useRef } from "react";
import "./InsidePage.scss";

interface IProps {
  onInsideComplete?: () => void;
}

const InsidePage: React.FC<IProps> = ({ onInsideComplete }) => {
  const [isEntering, setIsEntering] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pageRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xOffset = (clientX / innerWidth - 0.5) * 2;
      const yOffset = (clientY / innerHeight - 0.5) * 2;

      const moveX = -xOffset * 50;
      const moveY = -yOffset * 50;
      pageRef.current.style.setProperty("--mouse-x", `${moveX}px`);
      pageRef.current.style.setProperty("--mouse-y", `${moveY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const handleContinue = () => {
    onInsideComplete?.();
  };

  return (
    <div
      className={`inside-page ${isEntering ? "entering" : "entered"}`}
      ref={pageRef}
    >
      <div className="inside-content">
        <div className="inside-title">
          <h1>Inside</h1>
        </div>
        <div className="inside-actions">
          <button className="inside-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsidePage;
