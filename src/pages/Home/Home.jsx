import React from "react";
import DateConvertor from "../../components/DateConvertor";
import DateExtraInfo from "../../components/DateExtraInfo";
import DateBrief from "./DateBrief";
import "./Home.css";
function Home() {
  return (
    <div className="Home">
      <section>
        <DateBrief />
      </section>
      <section>
        <DateConvertor />
      </section>

      <section>
        <DateExtraInfo />
      </section>
    </div>
  );
}

export default Home;
