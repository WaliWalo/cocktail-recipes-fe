import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Card from "./components/Card/Card";
import SearchBar from "./components/SearchBar/SearchBar";
import Glasses from "./components/Glasses/Glasses";
import { Button, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./store/setup/store";
import { getRandomRecipesAsync, setRecipes } from "./store/recipe/recipeSlice";
import { IDrink } from "./components/Card/Types";
import Lists from "./components/Lists/Lists";
import { getUserById, logout, loginWithFB } from "./store/user/userSlice";
import { BoxArrowRight, HeartFill } from "react-bootstrap-icons";
import { IRecipe } from "./store/recipe/types";

function App() {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.recipe.data);
  const queries = useAppSelector((state) => state.recipe.query);
  const user = useAppSelector((state) => state.user);
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
    console.log(queryId);
    if (queryId) {
      dispatch(loginWithFB(queryId));
    }
    // eslint-disable-next-line
  }, []);

  const getFavs = () => {
    let favs: Array<IRecipe> = [];
    user.user.favs.forEach(async (fav: string) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/api/cocktails/lookupCocktail/${fav}`
        );
        if (response.ok) {
          const data = await response.json();
          favs = [...favs, data.drinks[0]];
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
      dispatch(setRecipes(favs));
    });
  };

  return (
    <div className="App">
      {/* <Overlay type="landing" /> */}
      <Container className="appContainer">
        <Row>
          <SearchBar />
          {user.loggedIn && (
            <div>
              <Button
                variant="light"
                className="mx-2"
                onClick={() => dispatch(logout())}
              >
                <BoxArrowRight size={25} color="black" />
              </Button>
              {user.user.favs.length > 0 && (
                <Button variant="light" onClick={getFavs}>
                  <HeartFill size={25} color="black" />
                </Button>
              )}
            </div>
          )}
        </Row>
        <Row>
          <Glasses />
        </Row>
        <Row className="contentContainer">
          {drinks !== undefined &&
            drinks.length > 0 &&
            drinks.map((drink: IDrink, index: number) => (
              <Card drink={drink} index={index + 1000} key={index} />
            ))}
          {queries !== undefined && queries.length > 0 && <Lists />}
        </Row>
      </Container>
    </div>
  );
}

export default App;
