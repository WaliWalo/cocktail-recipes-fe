import React from "react";
import "./styles.css";
import Pitcher from "./pitcher.svg";
import PunchBowl from "./punch-bowl.svg";
import ShotGlass from "./shot-glass.svg";
import WaterGlass from "./water-glass.svg";
import CocktailGlass from "./cocktail.svg";
import OldFashionedGlass from "./whiskey.svg";
import ChampagneGlass from "./champagne.svg";
import { Container, Row } from "react-bootstrap";

function Glasses() {
  return (
    <Container id="outerContainer">
      <Row id="glassesContainer">
        <div className="glasses" id="highBall">
          <img
            src={WaterGlass}
            alt="waterGlass-icon"
            className="waterGlassIcon"
          />
        </div>
        <div className="glasses" id="cocktail">
          <img
            src={CocktailGlass}
            alt="CocktailGlass-icon"
            className="CocktailGlassIcon"
          />
        </div>
        <div className="glasses" id="oldFashioned">
          <img
            src={OldFashionedGlass}
            alt="OldFashionedGlass-icon"
            className="OldFashionedGlassIcon"
          />
        </div>
        <div className="glasses" id="champagne">
          <img
            src={ChampagneGlass}
            alt="ChampagneGlass-icon"
            className="ChampagneGlassIcon"
          />
        </div>
        <div className="glasses" id="shot">
          <img src={ShotGlass} alt="shotGlass-icon" className="shotGlassIcon" />
        </div>
        <div className="glasses" id="punchBowl">
          <img src={PunchBowl} alt="punchBowl-icon" className="punchBowlIcon" />
        </div>
        <div className="glasses" id="pitcher">
          <img src={Pitcher} alt="pitcher-icon" className="pitcherIcon" />
        </div>
      </Row>
    </Container>
  );
}

export default Glasses;
