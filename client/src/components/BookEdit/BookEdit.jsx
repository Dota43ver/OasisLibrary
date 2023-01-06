import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks, getGenres } from "../../actions";
import CardEdit from "../CardEdit/CardEdit";
import "./BookEdit.css";
import oasis from "./oasis.jpg";
export default function BookEdit() {
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [booksPerPage, setBooksPerPage] = useState(60);
  // const indexLast = currentPage * booksPerPage;
  // const indexFirst = indexLast - booksPerPage;
  // const currentBooks = allBooks.slice(indexFirst, indexLast);
  // const paginated = (pageNumbers) => {
  //   setCurrentPage(pageNumbers);
  // };

  // const [refresh, setRefresh] = useState();
  // const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getGenres());
  }, [dispatch]);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getBooks());
  //   setRefresh("default");
  //   setCurrentPage(1);
  // }
  // function handleAlphabeticalSort(e) {
  //   e.preventDefault();
  //   dispatch(aplhabeticalSort(e.target.value));
  //   setCurrentPage(1);
  //   setOrder(`Order ${e.target.value}`);
  //   setRefresh();
  // }
  // function handlePriceSort(e) {
  //   e.preventDefault();
  //   dispatch(priceSort(e.target.value));
  //   setCurrentPage(1);
  //   setOrder(`Order ${e.target.value}`);
  //   setRefresh();
  // }
  // function handleScoreSort(e) {
  //   e.preventDefault();
  //   dispatch(scoreSort(e.target.value));
  //   setCurrentPage(1);
  //   setOrder(`Order ${e.target.value}`);
  //   setRefresh();
  // }

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

  // function handlerFilterByGenre(e) {
  //   e.preventDefault();
  //   dispatch(genreFilter(e.target.value));
  //   setCurrentPage(1);
  //   setOrder(`Order ${e.target.value}`);
  //   setRefresh();
  // }
  // function handlerFilterBySaga(e) {
  //   e.preventDefault();
  //   dispatch(sagaFilter(e.target.value));
  //   setCurrentPage(1);
  //   setOrder(`Order ${e.target.value}`);
  //   setRefresh();
  // }
  // function handlerFilterByLanguage(e) {
  //   e.preventDefault();
  //   dispatch(languageFilter(e.target.value));
  //   setCurrentPage(1);
  //   setOrder(`Order ${e.target.value}`);
  //   setRefresh();
  // }
  return (
    <div>
      <div className="barra">
        <div className="barraContent">
          <Link to="/home">
            <img src={oasis} alt="" width="114px" height="105px" />
          </Link>
          <Link to="/dashboard">
            <h2 className="title">Dashboard Admin</h2>
          </Link>
        </div>
      </div>

      {/* <div className="filtersDiv">
        <h2> Filtrar por: </h2>
        <button className="refreshButton" onClick={handleClick}>
          Refrescar libros
        </button>
        <div>
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
            <option value="atoz">A - Z</option>
            <option value="ztoa">Z - A</option>
          </select>
        </div>
        <div>
          <label> Precio </label>
          <select
            className="select"
            name="price"
            onChange={(e) => handlePriceSort(e)}
            value={refresh}
          >
            <option disabled selected value="default">
              Precio
            </option>
            <option value="asc">Menor</option>
            <option value="desc">Mayor</option>
          </select>
        </div>
        <div>
          <label> Puntuación </label>
          <select
            className="select"
            name="score"
            onChange={(e) => handleScoreSort(e)}
            value={refresh}
          >
            <option disabled selected value="default">
              Puntuación
            </option>
            <option value="desc">Menor</option>
            <option value="asc">Mayor</option>
          </select>
        </div>
        <div>
          <label>Géneros </label>
          <select
            className="select"
            onChange={(e) => handlerFilterByGenre(e)}
            value={refresh}
          >
            <option value="all">Todos</option>
            {allGenres?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Saga </label>
          <select
            className="select"
            onChange={(e) => handlerFilterBySaga(e)}
            value={refresh}
          >
            <option value="all">Ninguna</option>
            <option value="El señor de los anillos">
              Señor de los anillos
            </option>
            <option value="Harry Potter">Harry Potter</option>
            <option value="Juego de Tronos">Juego de tronos</option>
            <option value="Los Juegos Del Hambre">Los Juegos Del Hambre</option>
          </select>
        </div>
        <div>
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
      </div> */}
      <div className="homeEdit">
        {/* {currentBooks.length > 0 ? (
          currentBooks.map((el) => { */}
        {allBooks.length > 0 ? (
          allBooks.map((el) => {
            return (
              <div className="linkDetailEdit">
                <div className="contentEdit">
                  <div className="topCardsEdit">
                    {
                      <link
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"
                      ></link>
                    }
                  </div>
                </div>
                <div className="cardsEdit">
                  <CardEdit
                    id={el.id}
                    name={el.name}
                    price={el.price}
                    description={el.description}
                    score={el.score}
                    image={el.image}
                    stock={el.stock}
                    year={el.year}
                    author={el.author}
                    language={el.language}
                    saga={el.saga}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="loading">
            <div>
              <img
                src="https://media.tenor.com/nuCeLTABSTsAAAAM/jalan-book.gif"
                height="300px"
                width="200px"
              />
            </div>
          </div>
        )}
      </div>
      {/* <div className="paginadoHome">
        <Paginated
          booksPerPage={booksPerPage}
          allBooks={allBooks.length}
          paginated={paginated}
        />
      </div> */}
    </div>
  );
}
