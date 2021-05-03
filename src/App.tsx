import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import Card from "./components/Card/Card";
import SearchBar from "./components/SearchBar/SearchBar";
import Glasses from "./components/Glasses/Glasses";
import { Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./store/setup/store";
import {
  getRandomRecipesAsync,
  getSearchedRecipesAsync,
} from "./store/recipe/recipeSlice";
import { IDrink } from "./components/Card/Types";

function App() {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.recipe.data);

  useEffect(() => {
    const query = { type: "glass", query: "cocktail_glass" };
    dispatch(getRandomRecipesAsync());
    // dispatch(getSearchedRecipesAsync(query));
  }, []);

  return (
    <div className="App">
      {/* <Overlay type="landing" /> */}
      <Container className="appContainer">
        <Row>
          <SearchBar />
        </Row>
        <Row>
          <Glasses />
        </Row>
        <Row>
          {drinks !== undefined &&
            drinks.map((drink: IDrink, index: number) => (
              <Card drink={drink} index={index + 1000} key={drinks.idDrink} />
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
