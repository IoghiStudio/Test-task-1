import { useState } from "react";
import LoaderPage from "./pages/LoaderPage";
import EntrancePage from "./pages/EntrancePage";
import InsidePage from "./pages/InsidePage";
import { Router } from "./router";
import type { AppStep } from "./types/app";

export const App = () => {
  const [step, setStep] = useState<AppStep>(1);

  const handleLoadingComplete = () => {
    // setStep(2);
  };

  const handleEntranceComplete = () => {
    setStep(3);
  };

  const handleInsideComplete = () => {
    setStep(4);
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <LoaderPage onLoadingComplete={handleLoadingComplete} />;
      case 2:
        return <EntrancePage onEntranceComplete={handleEntranceComplete} />;
      case 3:
        return <InsidePage onInsideComplete={handleInsideComplete} />;
      case 4:
        return <Router />;
      default:
        return <LoaderPage onLoadingComplete={handleLoadingComplete} />;
    }
  };

  return <div className="layout">{renderCurrentStep()}</div>;
};

export default App;
