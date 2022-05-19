import React, { useEffect, useRef, useState } from "react";
import Clock from "./timeirClock";
function TimeirClock({ date: userDate, amPm = false, ...props }) {
  const canvasRef = useRef(null);
  const canvas = <canvas ref={canvasRef} width={200} height={200} />;
  const [date, setDate] = useState(userDate);
  const [realSec, realMin, realHour] = [
    date.getSeconds(),
    date.getMinutes(),
    date.getHours(),
  ];
  const [sec, min, hour] = [
    ("0" + realSec).slice(-2),
    ("0" + realMin).slice(-2),
    ("0" + (realHour % (amPm ? 12 : 24))).slice(-2),
  ];
  useEffect(() => {
    function onTick(date) {
      setDate(date);
    }
    const clock = new Clock({
      element: canvasRef.current,
      onTick,
      time: userDate, //yo can use optional Date
    });
    clock.startClock();
  }, []);
  return (
    <div {...props} style={{ width: "200px", fontFamily: "sans-serif" }}>
      {canvas}
      <div>
        <h2 style={{ textAlign: "center" }}>
          {hour}:{min}:{sec} {amPm && (realHour >= 12 ? "PM" : "AM")}
        </h2>
      </div>
    </div>
  );
}

export default TimeirClock;
