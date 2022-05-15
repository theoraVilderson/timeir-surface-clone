import React, { useContext } from "react";
import { globalContext } from "../../appContext";
import DateBrief from "./DateBrief";
import "./Home.css";
function Home() {
  const info = useContext(globalContext);
  return (
    <div className="Home">
      <section>
        <DateBrief />
      </section>
    </div>
  );
}

export default Home;
