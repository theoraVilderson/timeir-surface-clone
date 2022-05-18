import React, { useState } from "react";
import "./DateConvertor.css";
const currentYear = "1401";
const monthInfo = [
  {
    value: "1",
    data: "فروردین-ماه اول",
  },
  {
    value: "2",
    data: "اردیبهشت-ماه دوم",
  },
  {
    value: "3",
    data: "خرداد-ماه سوم",
  },
  {
    value: "4",
    data: "تیر-ماه چهارم",
  },
  {
    value: "5",
    data: "اَمرداد-ماه پنجم",
  },
  {
    value: "6",
    data: "شهریور-ماه ششم",
  },
  {
    value: "7",
    data: "مهر-ماه هفتم",
  },
  {
    value: "8",
    data: "آبان-ماه هشتم",
  },
  {
    value: "9",
    data: "آذر-ماه نهم",
  },
  {
    value: "10",
    data: "دی-ماه دهم",
  },
  {
    value: "11",
    data: "بهمن-ماه یازدهم",
  },
  {
    value: "12",
    data: "اسفند-ماه دوازدهم",
  },
];
const monthDays = [
  {
    value: "1",
    data: "1",
  },
  {
    value: "2",
    data: "2",
  },
  {
    value: "3",
    data: "3",
  },
  {
    value: "4",
    data: "4",
  },
  {
    value: "5",
    data: "5",
  },
  {
    value: "6",
    data: "6",
  },
  {
    value: "7",
    data: "7",
  },
  {
    value: "8",
    data: "8",
  },
  {
    value: "9",
    data: "9",
  },
  {
    value: "10",
    data: "10",
  },
  {
    value: "11",
    data: "11",
  },
  {
    value: "12",
    data: "12",
  },
  {
    value: "13",
    data: "13",
  },
  {
    value: "14",
    data: "14",
  },
  {
    value: "15",
    data: "15",
  },
  {
    value: "16",
    data: "16",
  },
  {
    value: "17",
    data: "17",
  },
  {
    value: "18",
    data: "18",
  },
  {
    value: "19",
    data: "19",
  },
  {
    value: "20",
    data: "20",
  },
  {
    value: "21",
    data: "21",
  },
  {
    value: "22",
    data: "22",
  },
  {
    value: "23",
    data: "23",
  },
  {
    value: "24",
    data: "24",
  },
  {
    value: "25",
    data: "25",
  },
  {
    value: "26",
    data: "26",
  },
  {
    value: "27",
    data: "27",
  },
  {
    value: "28",
    data: "28",
  },
  {
    value: "29",
    data: "29",
  },
  {
    value: "30",
    data: "30",
  },
  {
    value: "31",
    data: "31",
  },
];
const convertYearsInfo = [
  {
    value: "1",
    data: "خورشیدی (جلالی) به میلادی و قمری",
  },
  {
    value: "0",
    data: "میلادی به خورشیدی (جلالی) و قمری",
  },
  {
    value: "2",
    data: "قمری به خورشیدی (جلالی) و میلادی",
  },
];
const convertResultsInfo = [
  {
    title: "برج فلکی :",
    infos: ["ثور", "&nbsp;"],
    icon: '<i class="glyphicon pull-right AstrologicalSign"></i>',
  },
  {
    title: "خورشیدی:",
    infos: ["چهارشنبه، ۲۸ اردیبهشت ۱۴۰۱", "۱۴۰۱/۰۲/۲۸"],
    icon: null,
  },
  {
    title: "میلادی:",
    infos: ["Wednesday, May 18, 2022", "2022-05-18"],
    icon: null,
  },
  {
    title: "قمری:",
    infos: ["الأربعاء‬، ١٦ شوال ١٤٤٣", "۱۴۴۳/۱۰/۱۶"],
    icon: null,
  },
];
export function DateConvertorResultItem({
  title = "",
  infos = [],
  icon = false,
  children,
}) {
  return (
    <div className="dateConvertor__result">
      <h5>{title}</h5>
      <div className="dateConvertor__resultInfo">
        {infos.map((info) => {
          return (
            <h4 key={info} dangerouslySetInnerHTML={{ __html: info }}></h4>
          );
        })}
      </div>
      {icon && (
        <div
          className="dateConvertor__resultIcon"
          dangerouslySetInnerHTML={{ __html: children }}
        ></div>
      )}
    </div>
  );
}
function DateConvertor() {
  const [nowYear, setNowYear] = useState(currentYear);
  return (
    <div className="dateConvertor">
      <div className="dateConvertor__header">
        <h1>تبدیل تاریخ</h1>
      </div>
      <div className="dateConvertor__body">
        <div className="dateConvertor__options">
          <div className="dateConvertor__option">
            <span className="dateConvertor__optionTitle">نوع تبدیل</span>
            <select name="toYear" id="">
              {convertYearsInfo.map((e) => {
                return (
                  <option key={e.value} value={e.value}>
                    {e.data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="dateConvertor__option">
            <span className="dateConvertor__optionTitle">روز</span>
            <select name="toDay" id="">
              {monthDays.map((e) => {
                return (
                  <option key={e.value} value={e.value}>
                    {e.data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="dateConvertor__option">
            <span className="dateConvertor__optionTitle">ماه</span>
            <select name="" id="">
              {monthInfo.map((e) => {
                return (
                  <option key={e.value} value={e.value}>
                    {e.data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="dateConvertor__option">
            <span className="dateConvertor__optionTitle">سال</span>
            <input
              type="text"
              name="year"
              value={nowYear}
              onChange={(e) => setNowYear(e.target.value)}
            />
          </div>
          <div className="dateConvertor__option">
            <span className="dateConvertor__optionTitle">&nbsp;</span>
            <button className="primaryButton">تبدیل</button>
          </div>
        </div>
        <div className="dateConvertor__results">
          {convertResultsInfo.map((e) => {
            return (
              <DateConvertorResultItem key={e.title} {...e}>
                {e.icon}
              </DateConvertorResultItem>
            );
          })}
        </div>
      </div>
      <div className="dateConvertor__foot">
        <div className="dateConvertor__ageYearInfo">
          <b>فاصله زمانی (سن) :0 روز</b>
          <span>سال ۱۴۰۱ کبیسه نیست.</span>
        </div>
        <div className="dateConvertor__dateEvents">
          <button className="primaryButton primaryButton__bgEffect">
            <i className="glyphicon glyphicon-arrowdoubleleft"></i> &nbsp;
            مناسبتهای این روز
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateConvertor;
