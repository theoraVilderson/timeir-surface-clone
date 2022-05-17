import React, { useState } from "react";
import "./DateBox.css";

const monthNameInfo = [
  "۱. فروردین",
  "۲. اردیبهشت",
  "۳. خرداد",
  "۴. تیر",
  "۵. اَمرداد",
  "۶. شهریور",
  "۷. مهر",
  "۸. آبان",
  "۹. آذر",
  "۱۰. دی",
  "۱۱. بهمن",
  "۱۲. اسفند",
];
export function DateBoxItem({
  active,
  holiDay,
  solarDay,
  gregorianDay,
  lunarDay,
  disabled,
}) {
  return (
    <div
      className={`dateBox__day${holiDay ? " dataBox__holiDay" : ""}${
        active ? " dataBox__dayActive" : ""
      }${disabled ? " dataBox__dayDisabled" : ""}`}
    >
      <span>{solarDay}</span>
      <span>{gregorianDay}</span>
      <span>{lunarDay}</span>
    </div>
  );
}
export function YearOption() {
  return (
    <div className="dateBox___yearOption">
      <input type="number" max={9999} />
      <button>برو به سال</button>
    </div>
  );
}
export function MonthOption() {
  return (
    <div className="dateBox___monthOption">
      {monthNameInfo.map((month) => {
        return <button key={month}>{month}</button>;
      })}
    </div>
  );
}
function DateBox({
  info: {
    lunarYear,
    lunarCurrentMonth,
    lunarNextMonth,
    solarYear,
    solarMonth,
    gregorianYear,
    gregorianCurrentMonth,
    gregorianNextMonth,
    days,
  },
}) {
  const [optionToggle, setOptionToggle] = useState(false);
  const options = {
    yearOption: YearOption,
    monthOption: MonthOption,
  };
  const [currentOption, setCurrentOption] = useState("null");
  const CurrentOption = options[currentOption];
  const optionHandler = (optionName) => {
    return () => {
      setCurrentOption(optionName);
      if (optionName === currentOption) {
        return setOptionToggle((toggle) => {
          return !toggle;
        });
      }
      setOptionToggle(true);
    };
  };
  const yearOptionHandler = optionHandler("yearOption");
  const monthOptionHandler = optionHandler("monthOption");

  return (
    <div className="dateBox">
      <div className="dateBox__head">
        <div className="dateBox__nextMonth">
          <i className="glyphicon glyphicon-leftsmall"></i>{" "}
          <span> ماه بعد</span>
        </div>
        <div className="dateBox__dateOption">
          <div className="dateBox__dateOptionSolar">
            <div
              className="dateBox__dateOptionSolarYear"
              onClick={yearOptionHandler}
            >
              {solarYear}
            </div>
            <div
              className="dateBox__dateOptionSolarMonth"
              onClick={monthOptionHandler}
            >
              {solarMonth}
            </div>

            {optionToggle && CurrentOption && (
              <div className="dateBox__dateOptionModal">
                <CurrentOption />
              </div>
            )}
          </div>
          <div className="dateBox__gregorian">
            {gregorianCurrentMonth} - {gregorianNextMonth} {gregorianYear}
          </div>
          <div className="dateBox__lunar">
            {lunarCurrentMonth} - {lunarNextMonth} {lunarYear}
          </div>
        </div>
        <div className="dateBox__pervMonth">
          <span> ماه قبل</span>{" "}
          <i className="glyphicon glyphicon-rightsmall"></i>
        </div>
      </div>
      <div className="dateBox__body">
        <div className="dateBox__weekDays">
          <div className="dateBox__weekDay">ش</div>
          <div className="dateBox__weekDay">ی</div>
          <div className="dateBox__weekDay">د</div>
          <div className="dateBox__weekDay">س</div>
          <div className="dateBox__weekDay">چ</div>
          <div className="dateBox__weekDay">پ</div>
          <div className="dateBox__weekDay">ج</div>
        </div>
        <div className="dateBox_dateNumbers">
          {days.map((e) => {
            return (
              <DateBoxItem
                key={e.solarDay + e.gregorianDay + e.lunarDay}
                {...e}
              />
            );
          })}
        </div>
      </div>
      <div className="dateBox__foot">
        <button className="dateBox__goToday">برو به امروز</button>
      </div>
    </div>
  );
}

export default DateBox;
