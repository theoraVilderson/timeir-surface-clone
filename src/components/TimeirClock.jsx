import React, { useContext, useEffect, useRef, useState } from "react";
import { globalContext } from "../appContext";
import Clock from "./timeirClockCore";
function TimeirClock({ date: userDate, amPm = false, ...props }) {
  const canvasRef = useRef(null);
  const canvas = <canvas ref={canvasRef} width={200} height={200} />;
  const { theme } = useContext(globalContext);

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
    const getThemeColor = (colorName = "") => {
      colorName = colorName.startsWith("--") ? colorName : "--" + colorName;
      const [darkElm, lightElm] = [
        ...document.querySelectorAll("body.dark, body.light"),
      ];
      const targetElm = darkElm || lightElm || document.documentElement;
      return window.getComputedStyle(targetElm).getPropertyValue(colorName);
    };
    let colors = {};

    if (theme === "dark") {
      colors = {
        mainBorderColor: getThemeColor("bg"),
        mainBorderCoverColor: getThemeColor("bg-level-2"),
        centralDotColor: getThemeColor("primary"),
        secondPointerColor: getThemeColor("primary"),
        minutePointerColor: getThemeColor("bg-level-3"),
        hourPointerColor: getThemeColor("bg-level-3"),
        minDashColor: getThemeColor("text"),
        hourDashColor: getThemeColor("text"),
        hourTextColor: getThemeColor("danger"),
        titleColor: getThemeColor("text"),
      };
    }

    let clock = new Clock({
      element: canvasRef.current,
      onTick,
      time: userDate, //you can use optional Date
      options: { ...colors },
    });
    clock.startClock();
    return () => {
      clock.stopClock();
      clock = null;
    };
  }, [userDate, theme]);
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
