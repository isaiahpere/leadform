import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section>
        <p>this is where nav will go.</p>
      </section>
      <main>
        <h1>This is Main page</h1>
      </main>
    </>
  );
}

export default App;
