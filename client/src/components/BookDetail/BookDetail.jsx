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
    dispatch(
      addToCart({
        id: bookDetails.id,
        name: bookDetails.name,
        price: bookDetails.price,
        image: bookDetails.image,
        quantity: quantity,
      })
    );
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
          <Link to={`/author/${bookDetails.author}`}>
            <h2 className="author">Autor: {bookDetails.author}</h2>
          </Link>
          <h2>Géneros: {genreString}</h2>
          <h2>Idioma: {bookDetails.language}</h2>
          <h2>Año: {bookDetails.year}</h2>
        </div>
        <div className="secondCont">
          <div className="back">
            <Link to="/home">
              <button className="backButton">Back to home</button>
            </Link>
          </div>
          <h1 className="quantity">Cantidad: {quantity}</h1>
          <div className="quantityControls">
            {quantity >= 1 && (
              <button onClick={() => setQuantity(quantity - 1)}>-</button>
            )}
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <div className="cart">
            <button onClick={handleAddToCart} className="cartButton">
              Add to cart
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
