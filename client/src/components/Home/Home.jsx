import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Paginated from "../Paginated/Paginated";
import "./Home.css";

export default function Home() {
  const allBooks = useSelector((state) => state.books);
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

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
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
  );
}
