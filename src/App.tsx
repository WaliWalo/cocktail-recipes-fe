import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Card from "./components/Card/Card";
import SearchBar from "./components/SearchBar/SearchBar";
import Glasses from "./components/Glasses/Glasses";
import { Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./store/setup/store";
import { getRandomRecipesAsync } from "./store/recipe/recipeSlice";
import { IDrink } from "./components/Card/Types";
import Lists from "./components/Lists/Lists";
import { getUserById, loginWithFB } from "./store/user/userSlice";
import Overlay from "./components/Overlay/Overlay";

function App() {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.recipe.data);
  const queries = useAppSelector((state) => state.recipe.query);
  const recipes = useAppSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getRandomRecipesAsync());
    const userId = localStorage.getItem("loggedIn");
    if (userId) {
      dispatch(getUserById(userId));
    }
    if (window.location.hash === "#_=_") {
      window.location.hash = ""; // for older browsers, leaves a # behind
    }
    var urlParams = new URLSearchParams(window.location.search);
    const queryId = urlParams.get("userId");

    if (queryId) {
      dispatch(loginWithFB(queryId));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {/* <Overlay type="landing" /> */}
      {recipes.status === "loading" && <Overlay type="loader" />}
      <Container className="appContainer">
        <Row>
          <SearchBar />
        </Row>
        <Row>
          <Glasses />
        </Row>
        <Row className="contentContainer">
          {drinks !== undefined && drinks.length > 0 ? (
            drinks.map((drink: IDrink, index: number) => (
              <Card drink={drink} index={index + 1000} key={index} />
            ))
          ) : queries !== undefined && queries.length > 0 ? (
            <Lists />
          ) : (
            <div id="noResultContainer">No results</div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
