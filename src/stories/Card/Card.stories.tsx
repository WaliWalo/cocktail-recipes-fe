import React from "react";
import Card from "../../components/Card/Card";
export default {
  title: "Card",
  component: Card,
};

const data = {
  idDrink: "17204",
  strDrink: "Long Island Iced Tea",
  strDrinkAlternate: null,
  strTags: "IBA,ContemporaryClassic",
  strVideo: null,
  strCategory: "Ordinary Drink",
  strIBA: "Contemporary Classics",
  strAlcoholic: "Alcoholic",
  strGlass: "Highball glass",
  strInstructions:
    "Mix all contents in a highball glass and sitr gently. Add dash of Coca-Cola for the coloring and garnish with lemon or lime twist.",
  strInstructionsES: null,
  strInstructionsDE:
    "Den gesamten Inhalt in einem Highball-Glas mischen und vorsichtig umrühren. Für die Farbgebung einen Schuss Coca-Cola hinzufügen und mit Zitronen- oder Limettenspirale garnieren.",
  strInstructionsFR: null,
  strInstructionsIT:
    "Mescolare tutto il contenuto in un bicchiere highball e mescolare delicatamente.\r\nAggiungere un pizzico di Coca-Cola per la colorazione e guarnire con una scorza di limone o lime.",
  "strInstructionsZH-HANS": null,
  "strInstructionsZH-HANT": null,
  strDrinkThumb:
    "https://www.thecocktaildb.com/images/media/drink/wx7hsg1504370510.jpg",
  strIngredient1: "Vodka",
  strIngredient2: "Tequila",
  strIngredient3: "Light rum",
  strIngredient4: "Gin",
  strIngredient5: "Coca-Cola",
  strIngredient6: "Lemon peel",
  strIngredient7: null,
  strIngredient8: null,
  strIngredient9: null,
  strIngredient10: null,
  strIngredient11: null,
  strIngredient12: null,
  strIngredient13: null,
  strIngredient14: null,
  strIngredient15: null,
  strMeasure1: "1/2 oz ",
  strMeasure2: "1/2 oz ",
  strMeasure3: "1/2 oz ",
  strMeasure4: "1/2 oz ",
  strMeasure5: "1 dash ",
  strMeasure6: "Twist of ",
  strMeasure7: null,
  strMeasure8: null,
  strMeasure9: null,
  strMeasure10: null,
  strMeasure11: null,
  strMeasure12: null,
  strMeasure13: null,
  strMeasure14: null,
  strMeasure15: null,
  strImageSource: null,
  strImageAttribution: null,
  strCreativeCommonsConfirmed: "No",
  dateModified: "2017-09-02 17:41:50",
};

export function Cards() {
  return <Card drink={data} index={1} />;
}
