import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  getCart,
  getUsers,
  addCart,
  increaseQuantity,
  removeFromCart,
  getBooks,
} from "../../actions";
import NavBar from "../NavBar/NavBar";
import "./Cart.css";
export default function Cart() {
  const user = useSelector((state) => state.user)
  const allBooks = useSelector((state => state.books))
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //   const totalPriceById = cart.map((item) => item.price * item.quantity);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (user.length === 0)
    dispatch(getUsers())
    else
    dispatch(getCart(user.id))
    dispatch(getBooks())
  }, [user])

  const totalBooks = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

const handleIncreaseQuantity = (id) => {
  const addBooks = allBooks.find((e) => e.id === id);
  console.log(id);
    dispatch(addCart({
      bookId: id,
      name: addBooks.name,
      price: addBooks.price,
      image: addBooks.image,
      quantity: quantity,
      userId: user.id
    }));
}

  const handleDecreaseQuantity = (id) => {
    const book = cart.find((item) => item.id === id);
    if (book.quantity <= 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };
  return (
    <div>
      <NavBar />
      {cart && cart.length !== 0 ? (
        <div>
          <h1 className="shopTitle">Shop Cart</h1>
          <div className="totalPrice">
            <h2 className="cant">
              Tienes {totalBooks} libros por un total de ${totalPrice}
            </h2>
            <div className="checkDiv">
              <Link to={"/checkout"}>
                <button className="checkoutBtn">Checkout</button>
              </Link>
            </div>
          </div>
          <div className="infoBookCart">
            <h2 className="detailTitle">Detalles de compra</h2>
            {cart.map((item) => (
              <div className="itemCart">
                <div className="imgDiv">
                  <Link to={`/book/${item.id}`}>
                    <img className="itemImg" src={item.image} alt="itemImg" />
                  </Link>
                </div>

                <div className="namePriceDiv">
                  <h3 className="itemName">{item.name}</h3>
                  <h3 className="itemPrice">Precio: ${item.price}</h3>
                </div>
                <div className="quantityTotalDiv">
                  <h3 className="itemQuantity">Cantidad: {item.quantity}</h3>
                  <div className="quantBtns">
                    <button
                      className="decrementBtn"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <button
                      className="incrementBtn"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <h1 className="itemTotal">
                    Total ${item.price * item.quantity}
                  </h1>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="btnDelete"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="totalPrice">
          <h2 className="cant">No hay libros en el carrito</h2>
        </div>
      )}
    </div>
  );
}
