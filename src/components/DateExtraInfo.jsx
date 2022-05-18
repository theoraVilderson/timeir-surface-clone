import React from "react";
import "./DateExtraInfo.css";
import extraInfoImage from "../imgs/extraInfoImage.png";
function DateExtraInfo() {
  return (
    <div className="dateExtraInfo">
      <div className="dateExtraInfo__header">
        <h4>معرفی کتابِ زوربای یونانی</h4>
      </div>
      <img src={extraInfoImage} alt="book" />
      <p>
        زوربای یونانی (Zorba the Greek) اثر{" "}
        <a
          href="https://fa.wikipedia.org/wiki/نیکوس_کازانتزاکیس"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          نیکوس کازانتزاکیس
        </a>{" "}
        نویسنده‌ی نام‌دار یونان است. داستان از زبانِ نویسنده‌ای جوان و روشن‌فکر
        روایت می‌شود که حدود ۳۵ سال دارد و کتاب‌های زیادی خوانده و از لابه‌لای
        آنها در جستجوی معنای زندگی است. او که در حال سفر به{" "}
        <a
          href="https://fa.wikipedia.org/wiki/%DA%A9%D8%B1%D8%AA"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          جزیره کِرت
        </a>{" "}
        برای کار روی معدن زغال‌سنگی است، در بندر با شخصیتِ اصلی داستان یعنی
        «الکسیس زوربا» روبه‌رو می‌شود و داستان حولِ دوستی این دو و حوادث جزیره
        کِرت شکل می‌گیرد. تلاش برای توصیف شخصیت زوربا در اینجا کاری بیهوده است،
        باید خود دست به کار شوید و با خواندن داستان با آن آشنا شوید و از این
        کتاب بهره و لذت ببرید.{" "}
      </p>
      <div className="dateExtraInfo___downloads">
        <div className="dateExtraInfo__download">
          <h4 className="dateExtraInfo___downloadsTitle">اپلیکیشن Time.ir</h4>
          <div className="dateExtraInfo___downloadsAbout">
            اپلیکیشن سایت تایم، آماده‌ی استفاده‌ی شما عزیزان است، نسخه‌ی اندروید
            اپلیکیشن تایم را می‌توانید از لینک روبرو دانلود کنید.
          </div>
          <div className="dateExtraInfo___downloadsLink">
            <button className="primaryButton primaryButton__ballEffect">
              دانلود از کافه بازار
              <em className="glyphicon glyphicon-bazar"></em>
            </button>
            <button className="primaryButton primaryButton__ballEffect">
              دانلود مستقیم
              <em className="glyphicon glyphicon-android"></em>
            </button>
          </div>
        </div>
        <div className="dateExtraInfo__download">
          <h4 className="dateExtraInfo___downloadsTitle">تقویم چاپی ۱۴۰۱</h4>
          <div className="dateExtraInfo___downloadsAbout">
            تقویم چاپی سال 1401 خورشیدی
            <b>&nbsp; نسخه A3 </b>
          </div>
          <div className="dateExtraInfo___downloadsLink">
            <button className="primaryButton primaryButton__ballEffect">
              دانلود نسخه A3 <em className="glyphicon glyphicon-download"></em>
            </button>
          </div>
        </div>
        <div className="dateExtraInfo__download">
          <h4 className="dateExtraInfo___downloadsTitle">تقویم چاپی ۱۴۰۱</h4>
          <div className="dateExtraInfo___downloadsAbout">
            تقویم چاپی سال 1401 خورشیدی <b>&nbsp; نسخه A4 </b>
          </div>
          <div className="dateExtraInfo___downloadsLink">
            <button className="primaryButton primaryButton__ballEffect">
              دانلود نسخه A4 <em className="glyphicon glyphicon-download"></em>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateExtraInfo;
