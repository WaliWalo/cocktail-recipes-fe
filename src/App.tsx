import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import Card from "./components/Card/Card";
import SearchBar from "./components/SearchBar/SearchBar";
import Glasses from "./components/Glasses/Glasses";
import { Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./store/setup/store";
import { getRandomRecipesAsync } from "./store/recipe/recipeSlice";
import { IDrink } from "./components/Card/Types";
import Lists from "./components/Lists/Lists";
import Login from "./components/Auth/Login";

function App() {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.recipe.data);
  const queries = useAppSelector((state) => state.recipe.query);

  useEffect(() => {
    dispatch(getRandomRecipesAsync());
  }, []);

  return (
    <div className="App">
      {/* <Overlay type="landing" /> */}
      <Container className="appContainer">
        <Row>
          <div></div>
          <SearchBar />
          <Login />
        </Row>
        <Row>
          <Glasses />
        </Row>
        <Row className="contentContainer">
          {drinks !== undefined &&
            drinks.length > 0 &&
            drinks.map((drink: IDrink, index: number) => (
              <Card drink={drink} index={index + 1000} key={drinks.idDrink} />
            ))}
          {queries !== undefined && queries.length > 0 && <Lists />}
        </Row>
      </Container>
    </div>
  );
}

export default App;
