import React from "react";
import "./DateBrief.css";
import TimeirClock from "../../components/TimeirClock";
import AzanSelection, { AzanInfo } from "../../components/AzanSelection";
const azanSunSetInfo = [
  {
    value: "22",
    name: "ارومیه",
  },
  {
    value: "30",
    name: "اشنویه",
  },
  {
    value: "7895",
    name: "آواجیق",
  },
  {
    value: "7429",
    name: "آواجیق",
  },
  {
    value: "7892",
    name: "ایواوغلی",
  },
  {
    value: "7426",
    name: "ایواوغلی",
  },
  {
    value: "7889",
    name: "باروق",
  },
  {
    value: "7423",
    name: "باروق",
  },
  {
    value: "4887",
    name: "بازرگان",
  },
  {
    value: "7891",
    name: "بکتاش",
  },
  {
    value: "7425",
    name: "بکتاش",
  },
  {
    value: "74",
    name: "بوکان",
  },
  {
    value: "6084",
    name: "پلدشت",
  },
  {
    value: "84",
    name: "پیرانشهر",
  },
  {
    value: "4614",
    name: "تازه شهر",
  },
  {
    value: "7898",
    name: "تازه کند نصرت‌آباد",
  },
  {
    value: "7432",
    name: "تازه کند نصرت‌آباد",
  },
  {
    value: "92",
    name: "تکاب",
  },
  {
    value: "2756",
    name: "چهاربرج",
  },
  {
    value: "6835",
    name: "حاجیلار",
  },
  {
    value: "7897",
    name: "خلیفان",
  },
  {
    value: "7431",
    name: "خلیفان",
  },
  {
    value: "128",
    name: "خوی",
  },
  {
    value: "7888",
    name: "دیزج دیز",
  },
  {
    value: "7422",
    name: "دیزج دیز",
  },
  {
    value: "932",
    name: "ربط",
  },
  {
    value: "7896",
    name: "زرآباد",
  },
  {
    value: "7430",
    name: "زرآباد",
  },
  {
    value: "178",
    name: "سردشت",
  },
  {
    value: "3423",
    name: "سرو",
  },
  {
    value: "182",
    name: "سلماس",
  },
  {
    value: "5458",
    name: "سیلوانه",
  },
  {
    value: "3472",
    name: "سیمینه",
  },
  {
    value: "2858",
    name: "سیه چشمه",
  },
  {
    value: "194",
    name: "شاهین دژ",
  },
  {
    value: "6906",
    name: "شوط",
  },
  {
    value: "2070",
    name: "فیرورق",
  },
  {
    value: "6216",
    name: "قره ضیاءالدین",
  },
  {
    value: "3374",
    name: "قطور",
  },
  {
    value: "3349",
    name: "قوشچی",
  },
  {
    value: "2463",
    name: "کشاورز",
  },
  {
    value: "5167",
    name: "گوگ تپه",
  },
  {
    value: "1730",
    name: "لاجان",
  },
  {
    value: "272",
    name: "ماکو",
  },
  {
    value: "4264",
    name: "محمدیار",
  },
  {
    value: "2483",
    name: "محمودآباد",
  },
  {
    value: "7894",
    name: "مرگنلر",
  },
  {
    value: "7428",
    name: "مرگنلر",
  },
  {
    value: "289",
    name: "مهاباد",
  },
  {
    value: "293",
    name: "میاندوآب",
  },
  {
    value: "1291",
    name: "میرآباد",
  },
  {
    value: "5562",
    name: "نازک علیا",
  },
  {
    value: "7893",
    name: "نالوس",
  },
  {
    value: "7427",
    name: "نالوس",
  },
  {
    value: "302",
    name: "نقده",
  },
  {
    value: "7887",
    name: "نلاس",
  },
  {
    value: "7421",
    name: "نلاس",
  },
  {
    value: "2062",
    name: "نوشین شهر",
  },
  {
    value: "7890",
    name: "یولاگلدی",
  },
  {
    value: "7424",
    name: "یولاگلدی",
  },
];
const azanSunRiseInfo = [
  {
    value: "1",
    name: "آذربایجان شرقی",
  },
  {
    value: "2",
    name: "آذربایجان غربی",
  },
  {
    value: "3",
    name: "اردبیل",
  },
  {
    value: "4",
    name: "اصفهان",
  },
  {
    value: "33",
    name: "البرز",
  },
  {
    value: "5",
    name: "ایلام",
  },
  {
    value: "6",
    name: "بوشهر",
  },
  {
    value: "8",
    name: "تهران",
  },
  {
    value: "9",
    name: "چهارمحال و بختیاری",
  },
  {
    value: "31",
    name: "خراسان جنوبی",
  },
  {
    value: "10",
    name: "خراسان رضوی",
  },
  {
    value: "32",
    name: "خراسان شمالی",
  },
  {
    value: "11",
    name: "خوزستان",
  },
  {
    value: "12",
    name: "زنجان",
  },
  {
    value: "13",
    name: "سمنان",
  },
  {
    value: "14",
    name: "سیستان و بلوچستان",
  },
  {
    value: "15",
    name: "فارس",
  },
  {
    value: "16",
    name: "قزوین",
  },
  {
    value: "17",
    name: "قم",
  },
  {
    value: "18",
    name: "کردستان",
  },
  {
    value: "19",
    name: "کرمان",
  },
  {
    value: "20",
    name: "کرمانشاه",
  },
  {
    value: "21",
    name: "کهگیلویه و بویراحمد",
  },
  {
    value: "22",
    name: "گلستان",
  },
  {
    value: "23",
    name: "گیلان",
  },
  {
    value: "24",
    name: "لرستان",
  },
  {
    value: "25",
    name: "مازندران",
  },
  {
    value: "26",
    name: "مرکزی",
  },
  {
    value: "27",
    name: "هرمزگان",
  },
  {
    value: "28",
    name: "همدان",
  },
  {
    value: "29",
    name: "یزد",
  },
];
function DateBrief() {
  return (
    <div className="dateBrief">
      <div className="dateBrief__mainTime">
        <div className="dateBrief__header">
          <div className="dateBrief__left">
            <div className="dateBrief__info">
              <div className="dateBrief__head">برج فلکی</div>
              <div className="dateBrief__sub">ثور</div>
            </div>
            <div className="dateBrief__info">
              <div className="dateBrief__head">قمری</div>
              <div className="dateBrief__sub">1443/10/13</div>
              <div className="dateBrief__sub">الأحد - 13 شوال 1443</div>
            </div>
            <div className="dateBrief__info">
              <div className="dateBrief__head">میلادی</div>
              <div className="dateBrief__sub">2022-05-15</div>
              <div className="dateBrief__sub">Sunday - 2022 15 May</div>
            </div>
            <div className="dateBrief__info">
              <div className="dateBrief__head">خورشیدی</div>
              <div className="dateBrief__sub">1401/02/25</div>
              <div className="dateBrief__sub">یکشنبه - 25 اردیبهشت 1401</div>
            </div>
          </div>
          <div className="dateBrief__right">تاریخ امروز</div>
        </div>
        <div className="dateBrief__Azan">
          <h2 className="dateBrief__AzanTitle">اوقات شرعی به افق شهرها</h2>
          <div className="dateBrief__AzanSelectContainer">
            <div className="dateBrief__AzanSelect">
              <AzanSelection selections={azanSunRiseInfo} name={"sunrise"} />
            </div>
            <div className="dateBrief__AzanSelect">
              <AzanSelection selections={azanSunSetInfo} name={"sunset"} />
            </div>

            <div className="dateBrief__AzanSelect">
              <AzanInfo icon="ephemerisAzanMorning">
                اذان صبح{" "}
                <span className="dateBrief__sunsetTime"> 04 : 37 </span>
              </AzanInfo>
              <AzanInfo icon="ephemerisAzanSunrise">
                طلوع خورشید{" "}
                <span className="dateBrief__sunsetTime"> 06 : 21 </span>
              </AzanInfo>
              <AzanInfo icon="ephemerisAzanMoon">
                اذان ظهر{" "}
                <span className="dateBrief__sunsetTime"> 13 : 26 </span>
              </AzanInfo>
            </div>
            <div className="dateBrief__AzanSelect">
              <AzanInfo icon="ephemerisAzanSunset">
                غروب خورشید{" "}
                <span className="dateBrief__sunsetTime"> 20 : 42 </span>
              </AzanInfo>
              <AzanInfo icon="ephemerisAzanNight">
                اذان مغرب{" "}
                <span className="dateBrief__sunsetTime"> 20 : 51 </span>
              </AzanInfo>
              <AzanInfo icon="ephemerisMidNight">
                نیمه شب شرعی{" "}
                <span className="dateBrief__sunsetTime"> 00 : 34 </span>
              </AzanInfo>
            </div>
          </div>
        </div>
        <div className="dateBrief__Clock">
          <TimeirClock amPm c />
        </div>
      </div>
    </div>
  );
}

export default DateBrief;
