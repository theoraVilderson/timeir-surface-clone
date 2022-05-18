import React from "react";
import "./Footer.css";

export function FooterLink({ dotIgnore, children, className = "", ...props }) {
  return (
    <a
      className={`footer__link${
        dotIgnore ? " footer__linkDotIgnre" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer>
      <a href="#header" className="footer__goToTop">

      </a>
      <div className="footer__links">
        <FooterLink href="/" dotIgnore>
          ساعت و تقویم ایران
        </FooterLink>
        <FooterLink href="/">تقویم سالیانه</FooterLink>
        <FooterLink href="/">درباره تقویم جلالی</FooterLink>
        <FooterLink href="/">فهرست کتابهای تایم</FooterLink>
        <FooterLink href="/">انتقادها و پیشنهادها</FooterLink>
        <FooterLink href="/">تاریخ امروز</FooterLink>
      </div>
      <p>خدمات طراحی سایت ، هاست ، ثبت دامنه و سرور مجازی : رادکام</p>
      <a
        href="https://github.com/theoraVilderson"
        style={{ letterSpacing: "-1px" }}
      >
        @ Theora Vilderson @
      </a>
    </footer>
  );
}

export default Footer;
