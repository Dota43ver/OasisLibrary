import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, cleanCache, getBookDetails } from "../../actions";
import "../BookDetail/BookDetail.css";
import NavBar from "../NavBar/NavBar.jsx";

export default function BookDetails(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    dispatch(getBookDetails(id));
    dispatch(cleanCache());
  }, [dispatch, id]);
  const handleAddToCart = () => {
    if (quantity > bookDetails.stock) {
      alert(
        "No hay suficiente stock disponible para agregar esta cantidad al carrito."
      );
    } else {
      dispatch(
        addToCart({
          id: bookDetails.id,
          name: bookDetails.name,
          price: bookDetails.price,
          image: bookDetails.image,
          stock: bookDetails.stock,
          quantity: quantity,
        })
      );
      setQuantity(1); // Establece la cantidad en 0 después de agregar el libro al carrito
    }
  };

  const bookDetails = useSelector((state) => state.bookDetails);
  let genreString;
  if (Array.isArray(bookDetails.genre)) {
    genreString = bookDetails.genre.join(", ");
  } else {
    genreString = ""; // Establece un valor predeterminado para genreString
  }
  return (
    <div>
      <NavBar />

      <div className="allDetails">
        <div className="firstCont">
          <img className="bookImg" src={bookDetails.image} alt="" />
          <h3 className="score1">
            {" "}
            {[...new Array(5)].map((star, index) => {
              return index < bookDetails.score ? (
                <AiFillStar />
              ) : (
                <AiOutlineStar />
              );
            })}{" "}
          </h3>
          <h1>${bookDetails.price}</h1>
          <h2>
            Autor:{" "}
            <Link to={`/author/${bookDetails.author}`} className="author">
              {bookDetails.author}
            </Link>
          </h2>
          <h2>Géneros: {genreString}</h2>
          <h2>Idioma: {bookDetails.language}</h2>
          <h2>Año: {bookDetails.year}</h2>
        </div>
        <div className="secondCont">
          <div className="back">
            <Link to="/home">
              <button className="backButton">Volver a Inicio</button>
            </Link>
          </div>
          <h1>Stock: {bookDetails.stock}</h1>
          <h1 className="quantity">Agregar: {quantity}</h1>
          <div className="quantityControls">
            {quantity >= 1 && (
              <button
                onClick={() => setQuantity(quantity - 1)}
                className="quantityBtn"
              >
                -
              </button>
            )}{" "}
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="quantityBtn"
            >
              +
            </button>
          </div>
          <div className="cart">
            <button onClick={handleAddToCart} className="cartButton">
              Añadir al carro
            </button>
          </div>
        </div>
        <div className="thirdCont">
          <h2 className="bookTitle">{bookDetails.name}</h2>
          <p className="bookDescription">{bookDetails.description}</p>
        </div>
      </div>
    </div>
  );
}
