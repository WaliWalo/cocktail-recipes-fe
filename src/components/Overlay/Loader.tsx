import gsap from "gsap/all";
import React, { useEffect } from "react";
import "./loader.css";
function Loader() {
  useEffect(() => {
    gsap.to("#overlay", { duration: 2, x: "100vw", display: "none" });
  });
  return <div id="loader"></div>;
}

export default Loader;
