import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  addCart,
  decreaseQuantity,
  deleteCart,
  getBooks,
  getCart,
  getUsers,
} from "../../actions";
import NavBar from "../NavBar/NavBar";
import "./Cart.css";
const Swal = require("sweetalert2");
export default function Cart() {
  const user = useSelector((state) => state.user);
  const allBooks = useSelector((state) => state.books);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  //   const totalPriceById = cart.map((item) => item.price * item.quantity);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (user.length === 0) dispatch(getUsers());
    else dispatch(getCart(user.id));
    dispatch(getBooks());
  }, [user]);

  console.log(cart);

  const totalBooks = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleRemoveFromCart = (id) => {
    Swal.fire({
      title: "¿Estás seguro de querer eliminar este libro del carrito?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const deleteBook = cart.find((e) => e.id === id);
        dispatch(
          deleteCart({
            userId: user.id,
            bookId: id,
            quantity: deleteBook.quantity,
          })
        );
        Swal.fire(
          "Eliminado",
          "El libro ha sido eliminado del carrito.",
          "success"
        );
      }
    });
    window.location.href = window.location.href;
  };

  const handleIncreaseQuantity = (id) => {
    const book = cart.find((item) => item.id === id);
    if (book.quantity >= book.stock) {
      Swal.fire({
        icon: "error",
        title:
          "No hay suficiente stock disponible para agregar esta cantidad al carrito.",
      });
    } else {
      const addBooks = allBooks.find((e) => e.id === id);
      dispatch(
        addCart({
          bookId: id,
          name: addBooks.name,
          price: addBooks.price,
          image: addBooks.image,
          stock: addBooks.stock,
          quantity: quantity,
          userId: user.id,
        })
      );
    }
  };

  const handleCheckoutt = () => {
    Swal.fire({
      title: `El precio final es de $${totalPrice}
       ¿Quieres proceder al pago?`,
      text: "Una vez que completes tu compra no podrás modificarla.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        history.push("/checkout");
      }
    });
  };

  const handleDecreaseQuantity = (id) => {
    const deleteBooks = cart.find((e) => e.id === id);
    if (deleteBooks.quantity <= 1) {
      Swal.fire({
        title: "¿Estás seguro de querer eliminar este libro del carrito?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          dispatch(
            deleteCart({
              bookId: id,
              name: deleteBooks.name,
              price: deleteBooks.price,
              image: deleteBooks.image,
              quantity: quantity,
              userId: user.id,
            })
          );
          Swal.fire(
            "Eliminado",
            "El libro ha sido eliminado del carrito.",
            "success"
          );
        }
      });
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
              <button onClick={handleCheckoutt} className="checkoutBtn">
                Checkout
              </button>
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
                  {/* <h3 className="itemStock">Stock:{item.stock}</h3> */}
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
