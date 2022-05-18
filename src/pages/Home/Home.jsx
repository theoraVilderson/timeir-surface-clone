import React, { useContext } from "react";
import { globalContext } from "../../appContext";
import DateConvertor from "../../components/DateConvertor";
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
    </div>
  );
}

export default Home;
