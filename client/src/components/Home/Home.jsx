import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  aplhabeticalSort,
  genreFilter,
  getBooks,
  getGenres,
  priceSort,
  scoreSort,
} from "../../actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Paginated from "../Paginated/Paginated";
import "./Home.css";

export default function Home() {
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();


  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(9);
  const indexLast = currentPage * booksPerPage;
  const indexFirst = indexLast - booksPerPage;
  const currentBooks = allBooks.slice(indexFirst, indexLast);
  console.log(currentBooks);

  const paginated = (pageNumbers) => {
    setCurrentPage(pageNumbers)
  }

  const [order, setOrder] = useState("");


  useEffect(() => {
    dispatch(getBooks());
    dispatch(getGenres());
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

  function handlerFilterByGenre(e) {
    e.preventDefault();
    dispatch(genreFilter(e.target.value));
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
          <select onChange={(e) => handlerFilterByGenre(e)}>
            <option value="all">todos</option>
            {allGenres?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="allBooksDiv">
      <h3 className="home">
        {currentBooks.length > 0 ?
          currentBooks.map((el) => {
              return (
                <div className="cards">
                  <Link to={`/book/${el.id}`}>
                  <Card
                    Nombre={el.name}
                    Precio={el.price}
                    Puntuación={el.score}
                    Imagen={el.image}
                  />
                  </Link>
                </div>
              );
            })
          : "Loading..."}
      </h3>
      <Paginated booksPerPage={booksPerPage} allBooks={allBooks.length} paginated={paginated}/>
      </div>
    </div>
  );
}
