import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { getSearchedRecipesAsync } from "../../store/recipe/recipeSlice";
import { useAppDispatch } from "../../store/setup/store";
import "./styles.css";
import { useAppSelector } from "./../../store/setup/store";
import { IDrink } from "../Card/Types";
import gsap from "gsap/all";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Cocktail");
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.recipe.data);

  const directions = [
    { x: "120vh" },
    { x: "-120vh" },
    { y: "100vw" },
    { y: "-100vw" },
  ];

  const randomDirection = directions[Math.floor(Math.random() * 3)];

  useEffect(() => {
    drinks !== undefined &&
      drinks.length > 0 &&
      drinks.forEach((drink: IDrink, index: number) => {
        const rotation = index > 6 ? 0 : index;
        gsap.fromTo(
          `#card${drink.idDrink}`,
          {
            x: 0,
            y: 0,
            rotate: rotation,
            duration: 1,
          },
          randomDirection
        );
        gsap.to(`#card${drink.idDrink}`, {
          x: 0,
          y: 0,
          rotate: rotation,
          delay: 1,
        });
      });
  }, [drinks]);

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const value = { query: query, type: type };
    dispatch(getSearchedRecipesAsync(value));
  };

  return (
    <div id="searchForm">
      <Form onSubmit={(e: React.SyntheticEvent) => submitForm(e)}>
        <InputGroup>
          <FormControl
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputGroup.Prepend>
            <Form.Control as="select" onChange={(e) => setType(e.target.value)}>
              <option>Cocktail</option>
              <option>Ingredient</option>
            </Form.Control>
          </InputGroup.Prepend>
        </InputGroup>
      </Form>
    </div>
  );
}

export default SearchBar;
