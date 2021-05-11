import React, { useEffect } from "react";
import "./landing.css";
import { gsap } from "gsap";

function Landing() {
  useEffect(() => {
    let vw;
    window.innerWidth > 1440 ? (vw = "70%") : (vw = "60%");
    const tl = gsap.timeline();
    tl.to("#whiskeyContainer", { duration: 1, left: "40%" });
    tl.to("#oldFashionedContainer", { duration: 1, right: "37vw" });
    tl.to("#orangePeelContainer", {
      duration: 1,
      top: vw,
      rotate: 180,
    });
    tl.to(".landingContainers", {
      duration: 1,
      rotate: 360,
      width: "0%",
      height: "0%",
      onStart: function () {
        gsap.to("#overlay", { x: "100vw", duration: 1 });
      },
      onComplete: function () {
        gsap.to("#overlay", { display: "none" });
      },
    });
  });

  return (
    <div id="landing">
      <div id="orangePeelContainer" className="landingContainers">
        <img
          src="https://res.cloudinary.com/waliwalo/image/upload/v1619171716/cocktail-recipes/orange-peel-isolated-on-white-260nw-1174651438-removebg-preview_qr4cf2.png"
          alt="orangePeel"
        />
      </div>

      <div id="whiskeyContainer" className="landingContainers">
        <img
          alt="whiskey"
          src="https://res.cloudinary.com/waliwalo/image/upload/v1619182332/cocktail-recipes/tullamore-removebg-preview_ldco1m.png"
        />
      </div>

      <div id="oldFashionedContainer" className="landingContainers">
        <img
          alt="oldFashioned"
          src="https://res.cloudinary.com/waliwalo/image/upload/v1619176230/cocktail-recipes/oldfashonediceball-removebg-preview_tmfjoj.png"
        />
      </div>
    </div>
  );
}

export default Landing;
