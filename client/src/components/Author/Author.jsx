import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addFavs,
  addToCart,
  cleanCache,
  getAuthorBooks,
  getAuthorDetailsName,
} from "../../actions";
import "../Author/Author.css";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar.jsx";

export default function Author(props) {
  const dispatch = useDispatch();
  const name = props.match.params.name;
  const [quantity, setQuantity] = useState(1);
  const [btnActive, setBtnActive] = useState(false);
  useEffect(() => {
    dispatch(getAuthorDetailsName(name));
    dispatch(getAuthorBooks(name));
    dispatch(cleanCache());
  }, [dispatch, name]);

  const authorDetails = useSelector((state) => state.authorDetails);
  const allAuthorBooks = useSelector((state) => state.authorBooks);

  const handleAddToCart = (el) => {
    const addBooks = allAuthorBooks.find((e) => e.id === el.target.value);
    dispatch(
      addToCart({
        id: el.target.value,
        name: addBooks.name,
        price: addBooks.price,
        image: addBooks.image,
        quantity: quantity,
      })
    );
    alert("Item agregado");
  };
  const handleAddFavs = (el) => {
    const favsBooks = allAuthorBooks.find((e) => e.id === el.target.id);
    dispatch(
      addFavs({
        id: el.target.id,
        name: favsBooks.name,
        price: favsBooks.price,
        image: favsBooks.image,
      })
    );
  };
  return (
    <div>
      <NavBar />
      <h1 className="titles">Información del autor</h1>
      <div className="authorInfo">
        <h2 className="authorName">{authorDetails.name}</h2>
        <div className="imgDivv">
          <img
            className="authorImg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Denis_Diderot_by_Louis-Michel_van_Loo.jpg/235px-Denis_Diderot_by_Louis-Michel_van_Loo.jpg"
            alt="wikiimg"
          />
        </div>
        <p className="authorBio">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          minus autem optio, eveniet repellendus molestias eius fuga quia
          reprehenderit aut repellat accusamus harum. Consequatur voluptatum
          doloremque distinctio totam reiciendis nulla officia magni delectus
          vitae nisi odio voluptatibus facilis placeat est sapiente, provident
          inventore sit dolorem ea! Impedit, eligendi! Ex rerum harum voluptatum
          aspernatur deserunt magnam provident beatae fugiat. Inventore sint
          ipsa perspiciatis quo. Aliquam qui sed nam ducimus enim impedit
          voluptatum, alias dicta error commodi facere omnis debitis, autem
          ullam.
        </p>
      </div>

      <h1 className="titles">Libros del autor:</h1>
      <div className="home">
        {allAuthorBooks.length > 0 ? (
          allAuthorBooks.map((el) => {
            return (
              <div className="linkDetail">
                <div className="content">
                  <div className="topCards">
                    <h4>{el.name}</h4>

                    {
                      <link
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"
                      ></link>
                    }
                    <button
                      value={el.id}
                      onClick={(el) => handleAddFavs(el)}
                      // onClick={() => setBtnActive(!btnActive)}
                      className={
                        btnActive ? "borderless-button" : "borderless-button"
                      }
                    >
                      <i id={el.id} class="material-icons">
                        favorite
                      </i>
                    </button>
                  </div>

                  <Link to={`/book/${el.id}`}>
                    <button className="detailButton"> Ver detalles </button>
                  </Link>
                  <button
                    value={el.id}
                    onClick={(el) => handleAddToCart(el)}
                    className="addButton"
                  >
                    Agregar al carrito
                  </button>
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
        ) : (
          <div className="loading">
            <div>
              <p className="loadingP">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
