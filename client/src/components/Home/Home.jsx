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
  addToCart,
  addFavs,
} from "../../actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Paginated from "../Paginated/Paginated";
import "./Home.css";
import CarouselBook from "../Carousel/Carousel";
import Float from "../FloatWApp/Float";

export default function Home() {
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20);
  const indexLast = currentPage * booksPerPage;
  const indexFirst = indexLast - booksPerPage;
  const currentBooks = allBooks.slice(indexFirst, indexLast);

  const paginated = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  const [btnActive, setBtnActive] = useState(false);

  const [refresh, setRefresh] = useState();
  const [order, setOrder] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [productIds, setProductIds] = useState([]); // lista de IDs de productos

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getGenres());
  }, [dispatch]);

  const handleAddToCart = (el) => {
    const addBooks = allBooks.find(e => e.id === el.target.value)
    dispatch(
      addToCart({
        id: el.target.value,
        name: addBooks.name,
        price: addBooks.price,
        image: addBooks.image,
        quantity: quantity,

      })
    );
    alert('Item agregado')
  };

  const handleAddFavs = (el) => {
    const favsBooks = allBooks.find(e => e.id === el.target.id)
    dispatch(
      addFavs({
        id: el.target.id,
        name: favsBooks.name,
        price: favsBooks.price,
        image: favsBooks.image,
      })
    );
  }

  function handleRandomId() {
    const randomIndex = Math.floor(Math.random() * allBooks.length);
    const productIds = allBooks[randomIndex];
    setProductIds(productIds); // guarda el ID seleccionado al azar en el estado
  }

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
      <div className="carrusel">
        <CarouselBook />
      </div>
      <Float />
      <div className="all">
        <div className="side">
          <div className="filtersDiv">
            <h2> Filter by: </h2>
            <button className="refreshButton" onClick={handleClick}>
              Refresh books
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
          </div>

          <div className="azarAll">
            <p> ¿No sabes qué leer? </p>
            <button onClick={handleRandomId} className="azarButton"> Encontrá un libro al azar </button>
            {
              productIds ?
                <div className="azar">
                  <a href={`/book/${productIds.id}`}>{productIds.name}</a>
                  {/* <p>{productIds.genre}</p> */}
                  <img src={productIds.image} width='150px' />
                </div>
                : null
            }
          </div>

        </div>
        <div className="home">
          {currentBooks.length > 0
            ? currentBooks.map((el) => {
              return (
                <div className="linkDetail">
                  <div className="content">
                    <div className="topCards">
                      <h4>{el.name.length > 32 ? el.name.substr(0, 33) + "..." : el.name}</h4>
                      {
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                      }
                      <button value={el.id}
                        onClick={(el) => handleAddFavs(el)}
                        // onClick={() => setBtnActive(!btnActive)} 
                        className={btnActive ? 'borderless-button' : 'borderless-button'}>
                        <i id={el.id} class="material-icons">favorite</i>
                      </button>
                    </div>
                    <Link to={`/book/${el.id}`}>
                      <button className="detailButton"> Ver detalles </button>
                    </Link>
                    <button value={el.id} onClick={(el) => handleAddToCart(el)} className="addButton">Agregar al carrito</button>
                  </div>
                  <div className="cards">
                    <Card
                      Nombre={el.name}
                      Precio={el.price}
                      Puntuación={el.score}
                      Imagen={el.image}
                    />
                  </div>
                </div>
              );
            })
            : <div className="loading"><div><img src="https://media.tenor.com/nuCeLTABSTsAAAAM/jalan-book.gif" height="300px" width="200px" /></div></div>}
        </div>
        {/* <div onClick={e => prevPage(e)}>Previous</div> */}

        {/* <div onClick={e => nextPage(e)}>Next</div> */}
      </div>
      <div className="paginadoHome">
        <Paginated
          booksPerPage={booksPerPage}
          allBooks={allBooks.length}
          paginated={paginated}
        />
      </div>
      <div className="about">
        <div >
          <Link to='/about'>
            <p className="aboutBtn">About Us</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
