import React from "react";
import "./AzanSelection.css";
function AzanSelection({ selections = [], name = "" }) {
  return (
    <>
      <select className="azanSelect" name={name} id="">
        {selections.map((e) => {
          return (
            <option key={e.value} value={e.value}>
              {e.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
export function AzanInfo({ icon = "", children }) {
  return (
    <div className="azanInfo ephemeris">
      <i className={"glyphicon" + (icon ? " " + icon : "")}></i>
      {children}
    </div>
  );
}
export default AzanSelection;
