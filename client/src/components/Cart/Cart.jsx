import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../actions";
import NavBar from "../NavBar/NavBar";
import "./Cart.css";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const totalBooks = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const dispatch = useDispatch();
  //   const totalPriceById = cart.map((item) => item.price * item.quantity);
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };
  return (
    <div>
      <NavBar />
      {cart.length ? (
        <div>
          <h1 className="shopTitle">Shop Cart</h1>
          <div className="totalPrice">
            <h2 className="cant">
              Tienes {totalBooks} libros por un total de ${totalPrice}
            </h2>
            <div className="checkDiv">
              <button className="checkoutBtn">Checkout</button>
            </div>
          </div>
          <div className="infoBookCart">
            <h2 className="detailTitle">Detalles de compra</h2>
            {cart.map((item) => (
              <div className="itemCart">
                <div className="imgDiv">
                  <img className="itemImg" src={item.image} />
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
