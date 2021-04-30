import React, { useEffect, useState } from "react";
import "./styles.css";
import { ICardProps } from "./Types";
import gsap from "gsap/all";
import { TextPlugin } from "gsap/TextPlugin";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { Draggable } from "gsap/Draggable";

function Card(props: ICardProps) {
  const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [measures, setMeasures] = useState<Array<string>>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);

  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(Draggable);

  useEffect(() => {
    getIngredients();
    const dragInstance = Draggable.create(`#card${props.drink.idDrink}`, {
      onDragEnd: () => {
        const direction = dragInstance[0].getDirection("start");
        if (direction === "right" || direction.slice(0, 5) === "right") {
          gsap.to(`#card${props.drink.idDrink}`, { x: "100vw" });
        } else if (direction === "left" || direction.slice(0, 4) === "left") {
          gsap.to(`#card${props.drink.idDrink}`, { x: "-100vw" });
        } else if (direction === "up") {
          gsap.to(`#card${props.drink.idDrink}`, { y: "-100vh" });
        } else if (direction === "down") {
          gsap.to(`#card${props.drink.idDrink}`, { y: "100vh" });
        }
        gsap.to(`#card${props.drink.idDrink}`, { x: "0", y: "0", delay: 1 });
      },
    });
  }, []);

  const getIngredients = () => {
    const newIngredients = [];
    const newMeasures = [];
    for (const [key, value] of Object.entries(props.drink)) {
      if (key.slice(0, 13) === "strIngredient") {
        if (value !== null) {
          newIngredients.push(value);
        }
      }
      if (key.slice(0, 10) === "strMeasure") {
        if (value !== null) {
          newMeasures.push(value);
        }
      }
    }
    setIngredients(newIngredients);
    setMeasures(newMeasures);
  };

  const handleInstruction = () => {
    if (toggle) {
      gsap.to(".cocktailName", { duration: 2, text: props.drink.strDrink });
      gsap.to(".instructions", {
        autoAlpha: 0,
        onComplete: function () {
          gsap.to(".instructions", { display: "none" });
        },
      });
      gsap.to(".ingredients", { delay: 1, display: "initial", autoAlpha: 1 });
      gsap.to(".measures", { delay: 1, display: "initial", autoAlpha: 1 });
    } else {
      gsap.to(".cocktailName", { duration: 2, text: "Instructions" });
      gsap.to(".ingredients", {
        duration: 1,
        autoAlpha: 0,
        onComplete: function () {
          gsap.to(".ingredients", { display: "none" });
        },
      });
      gsap.to(".measures", {
        duration: 1,
        autoAlpha: 0,
        onComplete: function () {
          gsap.to(".measures", { display: "none" });
        },
      });
      gsap.to(".instructions", {
        delay: 2,
        display: "initial",
        autoAlpha: 1,
        text: props.drink.strInstructions,
      });
    }
    setToggle(!toggle);
  };

  return (
    <>
      <div className="cardContainer" id={`card${props.drink.idDrink}`}>
        <div id="topRightIconContainer">
          {/* <Icon icon={glassCocktail} /> */}
          {/* <Heart /> */}
          <HeartFill />
        </div>
        <div id="cardImageContainer">
          <img
            src={props.drink.strDrinkThumb}
            alt={`${props.drink.strDrink}img`}
          />
        </div>
        <div id="mainDescriptionContainer">
          <div className="cocktailName">{props.drink.strDrink}</div>
          <div className="ingredientsContainer">
            <div className="ingredients">
              {ingredients.length !== 0 &&
                ingredients.map((ingredient, index) => (
                  <div key={`${ingredient}(${index})`}>{ingredient}</div>
                ))}
            </div>
            <div className="measures">
              {measures.length !== 0 &&
                measures.map((measure, index) => (
                  <div key={`${measure}(${index})`}>{measure}</div>
                ))}
            </div>
            <div className="instructions"></div>
          </div>

          {window.innerWidth > 480 ? (
            <div className="instructions">{props.drink.strInstructions}</div>
          ) : (
            <div className="instructionBtn">
              <button onClick={handleInstruction}>
                {toggle ? "Ingredients" : "Instructions"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
