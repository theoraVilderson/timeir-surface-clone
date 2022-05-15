import React, { useState } from "react";
import "./Header.css";
import headerImg from "../imgs/headerImg.jpg";
import headerLogo from "../imgs/headerLogo.svg";
function Header() {
  const [theme, setTheme] = useState("light");
  const isLight = theme === "light";
  return (
    <header style={{ backgroundImage: `url("${headerImg}")` }}>
      <div className="header__box">
        <img src={headerLogo} alt="Logo" className="logo" />
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={"themeToggle" + (!isLight ? " themeToggle--active" : "")}
        >
          <button className={"themeToggle__toggler"}>
            <div className="themeToggle__toggleBar">
              <i
                className={
                  "glyphicon " + (isLight ? "glyphicon-sun" : "glyphicon-moon")
                }
              ></i>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
