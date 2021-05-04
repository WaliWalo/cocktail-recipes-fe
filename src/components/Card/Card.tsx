import React, { useEffect, useState } from "react";
import "./styles.css";
import { ICardProps } from "./Types";
import gsap from "gsap/all";
import { TextPlugin } from "gsap/TextPlugin";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { Draggable } from "gsap/Draggable";
import { useAppSelector } from "./../../store/setup/store";
import { Table } from "react-bootstrap";

function Card(props: ICardProps) {
  const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [measures, setMeasures] = useState<Array<string>>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  const [zIndex, setZIndex] = useState(props.index);
  const drinks = useAppSelector((state) => state.recipe.data);

  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(Draggable);

  const directions = [
    { x: "100vh" },
    { x: "-100vh" },
    { y: "100vw" },
    { y: "-100vw" },
  ];

  const randomDirection = directions[Math.floor(Math.random() * 3)];

  useEffect(() => {
    const rotation = props.index - 1000 > 6 ? 0 : props.index - 1000;
    gsap.fromTo(`#card${props.drink.idDrink}`, randomDirection, {
      x: 0,
      y: 0,
      rotate: rotation,
    });
  }, []);

  useEffect(() => {
    getIngredients();
    const dragInstance = Draggable.create(`#card${props.drink.idDrink}`, {
      dragClickables: false,
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
  }, [zIndex, drinks]);

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
            <Table striped borderless>
              <tbody>
                {ingredients.length !== 0 &&
                  ingredients.map((ingredient, index) => (
                    <tr
                      key={`${ingredient}(${index})`}
                      id={`ingredients${props.drink.idDrink}`}
                    >
                      <td>{ingredient}</td>
                      <td>{measures.length !== 0 && measures[index]}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            {window.innerWidth < 480 && (
              <div
                className="instructions mobileInstructions"
                id={`instructions${props.drink.idDrink}`}
              ></div>
            )}
          </div>

          {window.innerWidth > 480 ? (
            <div
              className="instructions"
              id={`instructions${props.drink.idDrink}`}
            >
              {props.drink.strInstructions}
            </div>
          ) : (
            <div className="instructionBtn" data-clickable="true">
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
