import React, { useEffect, useState } from "react";
import "./styles.css";
import { ICardProps, IIngredient } from "./Types";
import { Icon, InlineIcon } from "@iconify/react";
import glassCocktail from "@iconify-icons/mdi/glass-cocktail";

function Card(props: ICardProps) {
  const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [measures, setMeasures] = useState<Array<string>>([]);

  useEffect(() => {
    getIngredients();
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

  return (
    <div className="cardContainer">
      <div id="topRightIconContainer">
        <Icon icon={glassCocktail} />
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
              ingredients.map((ingredient) => <div>{ingredient}</div>)}
          </div>
          <div className="measures">
            {measures.length !== 0 &&
              measures.map((measure) => <div>{measure}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
