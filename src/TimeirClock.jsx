import React, { useEffect, useRef } from "react";
import Clock from "./timerClock";
function TimeirClock() {
  const canvasRef = useRef(null);
  const canvas = <canvas ref={canvasRef} width={200} height={200} />;
  useEffect(() => {
    const theClock = new Clock({ element: canvasRef.current });
  }, []);

  return canvas;
}

export default TimeirClock;
