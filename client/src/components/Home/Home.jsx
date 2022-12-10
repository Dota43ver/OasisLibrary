import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import "./Home.css";

export default function Home() {
  const allBooks = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
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
  );
}
