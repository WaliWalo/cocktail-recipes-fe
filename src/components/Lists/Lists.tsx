import gsap from "gsap/all";
import React, { useEffect } from "react";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "./../../store/setup/store";
import { ISearchResult } from "../../store/recipe/types";
import { getSearchedRecipesAsync } from "../../store/recipe/recipeSlice";

function Lists() {
  const queries = useAppSelector((state) => state.recipe.query);
  const dispatch = useAppDispatch();
  useEffect(() => {
    gsap.to(".listCard", {
      width: "5em",
      height: "5em",
      autoAlpha: 1,
      stagger: {
        from: "random",
        amount: 2,
      },
    });
  }, [queries]);

  const handleDrinkSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const query = { query: e.currentTarget.id, type: "Id" };
    dispatch(getSearchedRecipesAsync(query));
  };

  return (
    <div className="listContainer">
      {queries !== undefined &&
        queries.length !== 0 &&
        queries.map((query: ISearchResult) => (
          <div
            className="listCard"
            id={query.idDrink}
            onClick={(e) => handleDrinkSelect(e)}
            key={query.idDrink}
          >
            <div className="listCardInner">
              <div className="listImgContainer">
                <img
                  className="listImg"
                  src={query.strDrinkThumb}
                  alt="drinkThumb"
                />
              </div>
              <div className="listDetails">
                <span>{query.strDrink}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Lists;
