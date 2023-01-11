import React, { useEffect, useState, useRef } from "react";
import { AiFillStar, AiOutlineStar} from "react-icons/ai";
import {SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addToCart, cleanCache, getBookDetails, postReview, getUsers, getReview} from "../../actions";
import "../BookDetail/BookDetail.css";
import NavBar from "../NavBar/NavBar.jsx";
const Swal = require("sweetalert2");
//import Review from "../Reviews/Reviews";

function validate(input) {
  let errors = {};

  if(!input.descript){
      errors.descript = 'Deja tu reseña!'
  }
  else if(!input.votes){
      errors.votes = 'Puntua del 1 al 5'
  }
  return errors;
}

export default function BookDetails(props) {
  let reviewfilter;
  const dispatch = useDispatch();
  const history = useHistory();
  const id = props.match.params.id;
  const [errors, setErrors] = useState({})
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    dispatch(getBookDetails(id));
    dispatch(cleanCache());
  }, [dispatch, id]);
  const handleAddToCart = () => {
    let possible = true;
    if (quantity > bookDetails.stock) {
      Swal.fire({
        icon: "error",
        title:
          "No hay suficiente stock disponible para agregar esta cantidad al carrito.",
      });

      possible = false;
    }
    const targetId = bookDetails.id;
    let quantityCart;

    cart.forEach((item) => {
      if (item.id === targetId) {
        quantityCart = item.quantity;
      }
    });
    if (quantity + quantityCart > bookDetails.stock) {
      Swal.fire({
        icon: "error",
        title:
          "No hay suficiente stock disponible para agregar esta cantidad al carrito.",
      });

      possible = false;
    } else if (possible === true) {
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
      Swal.fire({
        icon: "success",
        title: `  ${
          quantity > 1 ? ` ${quantity} libros agregados` : "Libro agregado"
        } al carrito`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      setQuantity(1); // Establece la cantidad en 0 después de agregar el libro al carrito
    }
  };

  
  const reviews = useSelector((state) => state.reviews)
  const bookDetails = useSelector((state) => state.bookDetails);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user)
 
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getReview())
  }, [])
  
  const slideshow = useRef(null)

  const next = () => {
    if(slideshow.current.children.length > 0){
      const primerElemento = slideshow.current.children[0];
      slideshow.current.style.transition = `300ms ease-out all`

      const sizeSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`

      const transition = () => {
        slideshow.current.style.transition = 'none'
        slideshow.current.style.transform = `translateX(0)`

        slideshow.current.appendChild(primerElemento)
        slideshow.current.removeEventListener('transitionend', transition)
      }
      slideshow.current.addEventListener('transitionend', transition)
      console.log("next");
    }
  }

  const back = () => {
    if(slideshow.current.children.length > 0){
      const index = slideshow.current.children.length - 1;
      const ultimoElemento = slideshow.current.children[index];
      slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild);

      const sizeSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transition = 'none';
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`

      setTimeout(() => {
        slideshow.current.style.transition = `300ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`
      }, 30)
    }
  }

  /* useEffect(() => {
    setInterval(() => {
      next()
    }, 5000)
  }, []) */
  
  /* console.log(reviews.data.viewReviews[1]); */
  const [stateModal1, setStateModal1] = useState(false)

  const [input, setInput] = useState({
      descript:"",
      votes:"",
      userId:user.id,
      bookId:"" 
  })
  

  
  function handleChange(g){
    setInput({
      ...input,
      [g.target.name]: g.target.value
    })
    setErrors(validate({
      ...input,
      [g.target.name]: g.target.value
  }))
  }
  console.log(reviews);

  function handleSubmit(g){
    g.preventDefault();
    console.log(input);
    const review = {
      descript:input.descript,
      votes:input.votes,
      userId:user.id,
      bookId:bookDetails.id
    }
    dispatch(postReview(review))
    Swal.fire({
      icon: "success",
      title: "Review añadida correctamente",
    });
    setTimeout(() => {
      window.location.href = window.location.href
    }, 1500);
    
  }
  
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
      {
          reviews?.map(e =>  {
            if(e.bookId === bookDetails.id){
              reviewfilter = true
            }})
          }{reviewfilter?
          
              (<div className="cajita">
              <h1 className="tituloReview">Comentarios</h1>
              <button className="cartButton" onClick={(g) => setStateModal1(!stateModal1)}>Añadir Reseña</button>
              <main className="holasxd">
          
              <div ref={slideshow} className="contenederTotalSlide"> 
                {reviews &&
                 (reviews.map(g => {
                   if(g.bookId === bookDetails.id) {
                     return (
                       <div className="contenderReview1">
                        
                        
                          <div className="contenderReview">
                            <img className="imagePerfil1" src={g.user.image}></img>
                            <h2 className="nameUser">{g.user.name + " " + g.user.lastName}</h2>
                            <h3 className="textReview">{g.descript}</h3>
                            
                            <h3 className="score1">
                              {" "}
                              {[...new Array(5)].map((star, index) => {
                                return index < g.votes ? (
                                  <AiFillStar />
                                ) : (
                                  <AiOutlineStar />
                                );
                              })}{" "}
                            </h3>
                          </div>
                        
                        <div className="buttonReview">
                          <button onClick={back} className="button2Re">◀</button>
                          <button onClick={next} className="button2ReDerecha">▶</button>
                        </div>
                      </div>
                    )
                  }
                }))
                // :(<div>Se el primero en dejar una reseña</div>)
              }
      
              </div>
              </main>
            </div>): 
              
             (
              <div className="cajita">
              <h1 className="tituloReview">Comentarios</h1>
              <button className="cartButton" onClick={(g) => setStateModal1(!stateModal1)}>Añadir Reseña</button>
              <div>
                <h1 className="nameUser">Se el primero en dejar una reseña.</h1>
              </div>
              </div>
              )
            


        }
      
      {stateModal1 && 
      <div className="overlay">
        
        <div className="reviewContent">
              <button onClick={() => setStateModal1(false)} className="closeWindow">X</button>
              <img className="reviewImg" src={bookDetails.image} alt="" />
                <form id="form" className="forms" onSubmit={(g) => handleSubmit(g)}>
                    <h1>Deja tu comentario</h1>
                    <h2>{user.name}</h2>
                    <div>
                        <label className="dates">Review: </label>
                        <input className='date' type='text' value={input.descript} name="descript" onChange={handleChange} />
                        {errors.descript && (
                            <p className="error">{errors.descript}</p>
                        )}
                    </div>
                    <div>
                        <label className="dates">Puntuación: </label>
                        <input required type= 'range' min="1" max="5" className="date" value={input.votes} name="votes" onChange={handleChange}></input>
                        {errors.votes && (
                            <p className="error">{errors.votes}</p>
                        )}
                    </div>
                    <button className="submitReview" type= 'submit' disabled={!input.descript || !input.votes}>Crear Reseña</button>
                </form>
          </div>
        </div>
        }
        <div> 
        </div>
    </div>
  );
}
