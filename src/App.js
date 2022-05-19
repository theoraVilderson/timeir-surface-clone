import "./glyphicon.css";
// import "./App.css";
import { globalContext } from "./appContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import TimeirClock from "./components/TimeirClock.jsx";

function App() {
  return (
    <>
      <globalContext.Provider value={{ date: new Date() }}>
        {/* <Header />
        <main>
          <Home />
        </main>
        <Footer /> */}
        <TimeirClock amPm date={new Date()} />
      </globalContext.Provider>
    </>
  );
}

export default App;
