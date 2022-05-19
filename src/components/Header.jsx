import React, { useState } from "react";
import "./Header.css";
import headerImg from "../imgs/headerImg.jpg";
import headerLogo from "../imgs/headerLogo.svg";
function Header() {
  let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const [theme, setTheme] = useState(matched ? "dark" : "light");
  const [theme, setTheme] = useState("light");
  const isLight = theme === "light";
  const previousTheme = isLight ? "dark" : "light";
  const previousThemeElm = document.querySelector(`body.${previousTheme}`);
  if (previousThemeElm) document.body.classList.toggle(previousTheme, false);
  document.body.classList.toggle(theme, true);
  return (
    <header id="header" style={{ backgroundImage: `url("${headerImg}")` }}>
      <div className="header__box">
        <img src={headerLogo} alt="Logo" className="logo" />
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={"themeToggle" + (!isLight ? " themeToggle--active" : "")}
        >
          <button className={"themeToggle__toggler"}>
            <div className="themeToggle__toggleBar">
              <i className={"glyphicon glyphicon-sunf glyphicon-moon"}></i>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
