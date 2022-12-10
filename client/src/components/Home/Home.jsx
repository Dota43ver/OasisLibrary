import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  aplhabeticalSort,
  getBooks,
  priceSort,
  scoreSort,
} from "../../actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import "./Home.css";

export default function Home() {
  const allBooks = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getBooks());
    // setPage(1);
  }
  function handleAlphabeticalSort(e) {
    e.preventDefault();
    dispatch(aplhabeticalSort(e.target.value));
    // setPage(1);
    setOrder(`Order ${e.target.value}`);
  }
  function handlePriceSort(e) {
    e.preventDefault();
    dispatch(priceSort(e.target.value));
    // setPage(1);
    setOrder(`Order ${e.target.value}`);
  }
  function handleScoreSort(e) {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
    // setPage(1);
    setOrder(`Order ${e.target.value}`);
  }
  return (
    <div>
      <NavBar />
      <div className="filtersDiv">
        <div>
          <button className="refreshButton" onClick={handleClick}>
            Refresh recipes
          </button>
        </div>
        <div className="alphOrder">
          <select
            className="select"
            name="alphabetical"
            onChange={(e) => handleAlphabeticalSort(e)}
          >
            <option disabled selected>
              Alphabetical
            </option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
          </select>
        </div>
        <div className="filterPrice">
          <select
            className="select"
            name="price"
            onChange={(e) => handlePriceSort(e)}
          >
            <option disabled selected>
              Price
            </option>
            <option value="asc">Ascendiente</option>
            <option value="desc">Descendiente</option>
          </select>
        </div>
        <div className="filterScore">
          <select
            className="select"
            name="score"
            onChange={(e) => handleScoreSort(e)}
          >
            <option disabled selected>
              Score
            </option>
            <option value="asc">Ascendiente</option>
            <option value="desc">Descendiente</option>
          </select>
        </div>
      </div>
      <div className="allBooksDiv">
        <h3 className="home">
          {allBooks && Array.isArray(allBooks) && allBooks.length !== 0
            ? allBooks.map((el) => {
                return (
                  <div className="cards">
                    <Card
                      Nombre={el.name}
                      Precio={el.price}
                      Puntuación={el.score}
                      Imagen={el.image}
                    />
                  </div>
                );
              })
            : null}
        </h3>
      </div>
    </div>
  );
}
