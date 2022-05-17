import React from "react";
import "./DateInfo.css";
function DateInfo({ info: { day, dayAbout, popularDate, holiDay } }) {
  return (
    <div
      className={`dateBreif__dateInfoItem ${
        holiDay ? "dateBreif__dateInfoItemHoliDay" : ""
      }`}
    >
      <b className="dateBreif__dateInfoItemDay">{day} </b>
      <span className="dateBreif__dateInfoItemDayAbout">{dayAbout} </span>

      <span className="dateBreif__dateInfoItemPopularDate">{popularDate} </span>
    </div>
  );
}

export default DateInfo;
