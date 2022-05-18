import React, { useEffect, useRef, useState } from "react";
import Clock from "./timerClock";
function TimeirClock({ date: userDate, amPm = false, ...props }) {
  const canvasRef = useRef(null);
  const canvas = <canvas ref={canvasRef} width={200} height={200} />;
  const [date, setDate] = useState(userDate);
  const [sec, min, hour] = [
    ("0" + date.getSeconds()).slice(-2),
    ("0" + date.getMinutes()).slice(-2),
    ("0" + date.getHours()).slice(-2),
  ];
  useEffect(() => {
    function onTick(date) {
      setDate(date);
    }
    const clock = new Clock({
      element: canvasRef.current,
      onTick,
      time: userDate,
    });
    clock.startClock();
  }, [userDate]);
  return (
    <div {...props} style={{ width: "200px", fontFamily: "sans-serif" }}>
      {canvas}
      <div>
        <h2 style={{ textAlign: "center" }}>
          {amPm ? (hour > 12 ? hour % 12 : hour) : hour}:{min}:{sec}{" "}
          {amPm && (hour < 12 ? "AM" : "PM")}
        </h2>
      </div>
    </div>
  );
}

export default TimeirClock;
