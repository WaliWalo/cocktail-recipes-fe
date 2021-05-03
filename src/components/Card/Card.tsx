import React, { useEffect, useState } from "react";
import "./styles.css";
import { ICardProps } from "./Types";
import gsap from "gsap/all";
import { TextPlugin } from "gsap/TextPlugin";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { Draggable } from "gsap/Draggable";
import { useAppSelector } from "./../../store/setup/store";

function Card(props: ICardProps) {
  const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [measures, setMeasures] = useState<Array<string>>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  const [zIndex, setZIndex] = useState(props.index);
  const drinks = useAppSelector((state) => state.recipe.data);

  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(Draggable);

  useEffect(() => {
    gsap.to(`#card${props.drink.idDrink}`, { rotate: props.index - 1000 });
  });

  useEffect(() => {
    getIngredients();
    const dragInstance = Draggable.create(`#card${props.drink.idDrink}`, {
      onDragEnd: () => {
        const newIndex = zIndex - drinks.length;
        setZIndex(newIndex);
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
        gsap.to(`#card${props.drink.idDrink}`, {
          delay: 0.5,
          zIndex: newIndex,
        });
        gsap.to(`#card${props.drink.idDrink}`, {
          x: "0",
          y: "0",
          delay: 1,
        });
      },
    });
  }, [zIndex]);

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
      gsap.to(`#name${props.drink.idDrink}`, {
        duration: 2,
        text: props.drink.strDrink,
      });
      gsap.to(`#instructions${props.drink.idDrink}`, {
        autoAlpha: 0,
        onComplete: function () {
          gsap.to(`#instructions${props.drink.idDrink}`, { display: "none" });
        },
      });
      gsap.to(`#ingredients${props.drink.idDrink}`, {
        delay: 1,
        display: "initial",
        autoAlpha: 1,
      });
      gsap.to(`#measures${props.drink.idDrink}`, {
        delay: 1,
        display: "initial",
        autoAlpha: 1,
      });
    } else {
      gsap.to(`#name${props.drink.idDrink}`, {
        duration: 2,
        text: "Instructions",
      });
      gsap.to(`#ingredients${props.drink.idDrink}`, {
        duration: 1,
        autoAlpha: 0,
        onComplete: function () {
          gsap.to(`#ingredients${props.drink.idDrink}`, { display: "none" });
        },
      });
      gsap.to(`#measures${props.drink.idDrink}`, {
        duration: 1,
        autoAlpha: 0,
        onComplete: function () {
          gsap.to(`#measures${props.drink.idDrink}`, { display: "none" });
        },
      });
      gsap.to(`#instructions${props.drink.idDrink}`, {
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
          <div className="cocktailName" id={`name${props.drink.idDrink}`}>
            {props.drink.strDrink}
          </div>
          <div className="ingredientsContainer">
            <div
              className="ingredients"
              id={`ingredients${props.drink.idDrink}`}
            >
              {ingredients.length !== 0 &&
                ingredients.map((ingredient, index) => (
                  <div key={`${ingredient}(${index})`}>{ingredient}</div>
                ))}
            </div>
            <div className="measures" id={`measures${props.drink.idDrink}`}>
              {measures.length !== 0 &&
                measures.map((measure, index) => (
                  <div key={`${measure}(${index})`}>{measure}</div>
                ))}
            </div>
            <div
              className="instructions"
              id={`instructions${props.drink.idDrink}`}
            ></div>
          </div>

          {window.innerWidth > 480 ? (
            <div
              className="instructions"
              id={`instructions${props.drink.idDrink}`}
            >
              {props.drink.strInstructions}
            </div>
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
