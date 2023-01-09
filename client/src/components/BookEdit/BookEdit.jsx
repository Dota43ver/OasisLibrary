import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks, getGenres, getUsers } from "../../actions";
import CardEdit from "../CardEdit/CardEdit";
import "./BookEdit.css";
import oasis from "./oasis.jpg";
export default function BookEdit() {
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const user = useSelector((state) => state.user);
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
    dispatch(getUsers());
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

      {user && user.role === "admin" ? (
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
      ) : (
        <div>
          <h3>Registered Users Only</h3>
        </div>
      )}
    </div>
  );
}
