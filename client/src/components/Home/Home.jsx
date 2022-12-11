import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  aplhabeticalSort,
  genreFilter,
  getBooks,
  getGenres,
  languageFilter,
  priceSort,
  sagaFilter,
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
  // console.log(currentBooks);

  const paginated = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  const [refresh, setRefresh] = useState();
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getGenres());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getBooks());
    setRefresh("default");
    setCurrentPage(1);
  }
  function handleAlphabeticalSort(e) {
    e.preventDefault();
    dispatch(aplhabeticalSort(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
    setRefresh();
  }
  function handlePriceSort(e) {
    e.preventDefault();
    dispatch(priceSort(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
    setRefresh();
  }
  function handleScoreSort(e) {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
    setRefresh();
  }

  // function prevPage(e) {
  //   if(currentPage == 1 ||currentPage < 1) {
  //     e.preventDefault()
  //     setCurrentPage(currentPage -1)
  //   }
  // }

  // function nextPage(e) {
  //   e.preventDefault()
  //   setCurrentPage(currentPage +1)
  // }

  function handlerFilterByGenre(e) {
    e.preventDefault();
    dispatch(genreFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
    setRefresh();
  }
  function handlerFilterBySaga(e) {
    e.preventDefault();
    dispatch(sagaFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
    setRefresh();
  }
  function handlerFilterByLanguage(e) {
    e.preventDefault();
    dispatch(languageFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
    setRefresh();
  }
  return (
    <div>
      <NavBar />
      <div className="all">
        <div className="filtersDiv">
          <h2 className="filterh2"> Filter by: </h2>
          <div>
            <button className="refreshButton" onClick={handleClick}>
              Refresh books
            </button>
          </div>
          <div className="alphOrder">
            <label>Ordenamieto</label>
            <select
              className="select"
              name="alphabetical"
              onChange={(e) => handleAlphabeticalSort(e)}
              value={refresh}
            >
              <option disabled selected value="default">
                Alphabetical
              </option>
              <option value="atoz">A to Z</option>
              <option value="ztoa">Z to A</option>
            </select>
          </div>
          <div className="filterPrice">
            <label> Price </label>
            <select
              className="select"
              name="price"
              onChange={(e) => handlePriceSort(e)}
              value={refresh}
            >
              <option disabled selected value="default">
                Price
              </option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <div className="filterScore">
            <label> Score </label>
            <select
              className="select"
              name="score"
              onChange={(e) => handleScoreSort(e)}
              value={refresh}
            >
              <option disabled selected value="default">
                Score
              </option>
              <option value="asc">Descendente</option>
              <option value="desc">Ascendente</option>
            </select>
            <div>
              <label>Genre </label>
              <select
                className="select"
                onChange={(e) => handlerFilterByGenre(e)}
                value={refresh}
              >
                <option value="all">All</option>
                {allGenres?.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <br />
              <label>Saga </label>
              <select
                className="select"
                onChange={(e) => handlerFilterBySaga(e)}
                value={refresh}
              >
                <option value="all">None</option>
                <option value="El señor de los anillos">
                  Señor de los añillos
                </option>
                <option value="Harry Potter">Harry Potter</option>
                <option value="Juego de Tronos">Juego de tronos</option>
              </select>
              <br />
              <label>Idioma </label>
              <select
                className="select"
                onChange={(e) => handlerFilterByLanguage(e)}
                value={refresh}
              >
                <option value="all">Todos</option>
                <option value="Español">Español</option>
                <option value="Ingles">Inglés</option>
              </select>
            </div>
          </div>
        </div>
        <div className="allBooksDiv">
          <h3 className="home">
            {currentBooks.length > 0
              ? currentBooks.map((el) => {
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
          {/* <div onClick={e => prevPage(e)}>Previous</div> */}
          <div className="paginadoHome">
            <Paginated
              booksPerPage={booksPerPage}
              allBooks={allBooks.length}
              paginated={paginated}
            />
          </div>

          {/* <div onClick={e => nextPage(e)}>Next</div> */}
        </div>
      </div>
    </div>
  );
}
