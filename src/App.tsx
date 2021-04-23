import React from "react";
import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <Overlay type="landing" />
    </div>
  );
}

export default App;
