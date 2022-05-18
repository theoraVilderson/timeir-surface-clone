import React, { useContext } from "react";
import { globalContext } from "../../appContext";
import DateConvertor from "../../components/DateConvertor";
import DateExtraInfo from "../../components/DateExtraInfo";
import DateBrief from "./DateBrief";
import "./Home.css";
function Home() {
  const info = useContext(globalContext);

  return (
    <div info={info} className="Home">
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
