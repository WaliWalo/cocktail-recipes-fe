import React, { useEffect } from "react";
import "./styles.css";
import Pitcher from "./pitcher.svg";
import PunchBowl from "./punch-bowl.svg";
import ShotGlass from "./shot-glass.svg";
import WaterGlass from "./water-glass.svg";
import CocktailGlass from "./cocktail.svg";
import OldFashionedGlass from "./whiskey.svg";
import ChampagneGlass from "./champagne.svg";
import Shuffle from "./shuffle.svg";
import { Container, Row } from "react-bootstrap";
import { useAppDispatch } from "../../store/setup/store";
import {
  getRandomRecipesAsync,
  getSearchedRecipesAsync,
  setRecipes,
} from "../../store/recipe/recipeSlice";
import { useAppSelector } from "./../../store/setup/store";
import { IDrink } from "../Card/Types";
import gsap from "gsap/all";
import { BoxArrowRight, HeartFill } from "react-bootstrap-icons";
import { logout } from "../../store/user/userSlice";
import { IRecipe } from "../../store/recipe/types";

function Glasses() {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.recipe.data);
  const user = useAppSelector((state) => state.user);

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
        gsap.fromTo(
          `#card${drink.idDrink}`,
          {
            x: 0,
            y: 0,
            rotate: index,
            duration: 1,
          },
          randomDirection
        );
        gsap.to(`#card${drink.idDrink}`, {
          x: 0,
          y: 0,
          rotate: index,
          delay: 1,
        });
      });
    // eslint-disable-next-line
    // eslint-disable-next-line
  }, [drinks]);

  const randomize = () => {
    dispatch(getRandomRecipesAsync());
  };

  const handleGlasses = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const query = { type: "glasses", query: e.currentTarget.id };
    dispatch(getSearchedRecipesAsync(query));
  };

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
    <Container id="outerContainer">
      <Row id="glassesContainer">
        <div
          className="glasses"
          id="highball_glass"
          onClick={(e) => handleGlasses(e)}
        >
          <img
            src={WaterGlass}
            alt="waterGlass-icon"
            className="waterGlassIcon"
          />
        </div>
        <div
          className="glasses"
          id="cocktail_glass"
          onClick={(e) => handleGlasses(e)}
        >
          <img
            src={CocktailGlass}
            alt="CocktailGlass-icon"
            className="CocktailGlassIcon"
          />
        </div>
        <div
          className="glasses"
          id="whiskey_sour_glass"
          onClick={(e) => handleGlasses(e)}
        >
          <img
            src={OldFashionedGlass}
            alt="OldFashionedGlass-icon"
            className="OldFashionedGlassIcon"
          />
        </div>
        <div
          className="glasses"
          id="champagne_flute"
          onClick={(e) => handleGlasses(e)}
        >
          <img
            src={ChampagneGlass}
            alt="ChampagneGlass-icon"
            className="ChampagneGlassIcon"
          />
        </div>
        <div
          className="glasses"
          id="shot_glass"
          onClick={(e) => handleGlasses(e)}
        >
          <img src={ShotGlass} alt="shotGlass-icon" className="shotGlassIcon" />
        </div>
        <div
          className="glasses"
          id="punch_bowl"
          onClick={(e) => handleGlasses(e)}
        >
          <img src={PunchBowl} alt="punchBowl-icon" className="punchBowlIcon" />
        </div>
        <div className="glasses" id="pitcher" onClick={(e) => handleGlasses(e)}>
          <img src={Pitcher} alt="pitcher-icon" className="pitcherIcon" />
        </div>
        <div className="glasses" id="shuffle" onClick={randomize}>
          <img src={Shuffle} alt="Shuffle-icon" className="ShuffleIcon" />
        </div>
        {user.loggedIn && (
          <>
            <div className="glasses">
              <button onClick={() => dispatch(logout())} className="ml-2">
                <BoxArrowRight size={30} color="black" id="logoutIcon" />
              </button>
            </div>
            <div className="glasses">
              {user.user.favs.length > 0 && (
                <button onClick={getFavs} className="mt-1">
                  <HeartFill size={30} color="black" />
                </button>
              )}
            </div>
          </>
        )}
      </Row>
    </Container>
  );
}

export default Glasses;
