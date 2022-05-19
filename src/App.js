import "./glyphicon.css";
import "./App.css";
import { globalContext } from "./appContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import { useState } from "react";
const currentDate = new Date();
function App() {
  let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(
    window.localStorage.getItem("timeir-theme") ?? (matched ? "dark" : "light")
  );
  const setGlobalThem = (func = () => {}) => {
    setTheme((currentTheme) => {
      const theme = func(currentTheme);
      window.localStorage.setItem("timeir-theme", theme);
      return theme;
    });
  };
  return (
    <>
      <globalContext.Provider
        value={{
          date: currentDate,
          theme,
          setTheme: setGlobalThem,
        }}
      >
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
      </globalContext.Provider>
    </>
  );
}

export default App;
