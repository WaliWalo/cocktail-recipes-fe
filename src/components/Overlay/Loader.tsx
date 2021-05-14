import gsap from "gsap/all";
import React, { useEffect } from "react";
import "./loader.css";
function Loader() {
  useEffect(() => {
    const tl = gsap.timeline({ yoyo: true, repeat: -1 });
    tl.from(".top", {
      duration: 0.2,
      width: "0",
      height: "0.5em",
    });
    tl.from(".diag", { duration: 0.2, width: "0", height: "0.5em" });
    tl.from("#middle", { duration: 0.2, width: "0.5em", height: "0" });
    tl.from(".bottom", { duration: 0.2, width: "0", height: "0.5em" });
  });
  return (
    <div id="loader">
      <div id="loaderContainer">
        <div id="leftTop" className="top"></div>
        <div id="leftDiag" className="diag"></div>
        <div id="rightTop" className="top"></div>
        <div id="rightDiag" className="diag"></div>
        <div id="middle"></div>
        <div id="bottomLeft" className="bottom"></div>
        <div id="bottomRight" className="bottom"></div>
      </div>
    </div>
  );
}

export default Loader;
