import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getBooks, getGenres, postBook } from "../../actions";
import "./BookCreate.css";
import oasis from "./oasis.jpg";
const Swal = require("sweetalert2");

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "El Nombre es necesario";
  } else if (!input.year) {
    errors.year = "El Año es necesario";
  } else if (!input.author) {
    errors.author = "El Autor es necesario";
  } else if (!input.price) {
    errors.price = "El Precio es necesario";
  } else if (!input.score) {
    errors.score = "Una Puntuacion es necesaria";
  } else if (!input.language) {
    errors.language = "El Idioma es necesario";
  }
  return errors;
}

export default function BookCreate() {
  const dispatch = useDispatch();

  const history = useHistory();
  const books = useSelector((state) => state.books);
  const genres = useSelector((state) => state.genres);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getBooks());
  }, []);

  const [input, setInput] = useState({
    name: "",
    year: "",
    genre: [],
    author: "",
    authorDescription: "",
    authorImg: "",
    price: "",
    score: "",
    language: "",
    description: "",
    image: "",
  });

  const [cantInputs, setCantInputs] = useState(["x"]);

  function handleChange(g) {
    setInput({
      ...input,
      [g.target.name]: g.target.value,
    });
    setErrors(
      validate({
        ...input,
        [g.target.name]: g.target.value,
      })
    );
  }

  function handleChangeGenre(g) {
    let arrayResultado = [];
    let arr = Array.prototype.slice.call(g.target.parentNode.childNodes);
    arr.pop();
    arr.map((s) => {
      arrayResultado.push(s.value);
    });
    input.genre = arrayResultado;
    console.log(arrayResultado);
  }
  const authorDetails = useSelector((state) => state.books);
  // console.log(authorDetails);

  function handleSubmit(g) {
    g.preventDefault();
    {
      const image =
        input.image ||
        "https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg";
      const description =
        input.description ||
        "Mauris quis lacus vitae tellus aliquet pulvinar. Donec eu magna neque. Morbi mattis urna ex, quis porta ligula scelerisque id. Aenean tempus eget nibh sed ornare. Sed nibh est, iaculis sed mauris eget, hendrerit malesuada quam. Ut dolor nibh, accumsan eget pharetra ut, rhoncus ut nunc. Curabitur a nibh ac erat commodo lobortis. Sed augue justo, placerat at leo quis, porta eleifend arcu. Sed et ex molestie, ullamcorper augue nec, dignissim augue. Etiam ac erat ipsum. Etiam vulputate, turpis at posuere elementum, ex enim dapibus augue, euismod mollis turpis augue in arcu. Nam accumsan nec neque eget porta. Morbi tristique pretium magna efficitur ultricies. Aliquam et nulla turpis. Cras sit amet erat fringilla, cursus velit et, ullamcorper elit. Vestibulum efficitur faucibus pharetra. Morbi rutrum magna eget quam molestie porttitor. Fusce euismod elementum massa id iaculis.";

      for (let i = 0; i < authorDetails.length; i++) {
        if (input.author === authorDetails[i].author) {
          const authorDescription = authorDetails[i].authorDescription;
          const authorImg = authorDetails[i].authorImg;

          const book = {
            name: input.name,
            year: input.year,
            genre: input.genre,
            author: input.author,
            authorDescription: authorDescription,
            authorImg: authorImg,
            price: input.price,
            score: input.score,
            language: input.language,
            description: description,
            image: image,
          };
          dispatch(postBook(book));
          Swal.fire({
            icon: "success",
            title: "¡Listo!",
            text: "Libro creado correctamente.",
          });
          return history.push("/dashboard");
        }
      }

      const authorDescription =
        input.authorDescription ||
        "Mauris quis lacus vitae tellus aliquet pulvinar. Donec eu magna neque. Morbi mattis urna ex, quis porta ligula scelerisque id. Aenean tempus eget nibh sed ornare. Sed nibh est, iaculis sed mauris eget, hendrerit malesuada quam. Ut dolor nibh, accumsan eget pharetra ut, rhoncus ut nunc. Curabitur a nibh ac erat commodo lobortis. Sed augue justo, placerat at leo quis, porta eleifend arcu. Sed et ex molestie, ullamcorper augue nec, dignissim augue. Etiam ac erat ipsum. Etiam vulputate, turpis at posuere elementum, ex enim dapibus augue, euismod mollis turpis augue in arcu. Nam accumsan nec neque eget porta. Morbi tristique pretium magna efficitur ultricies. Aliquam et nulla turpis. Cras sit amet erat fringilla, cursus velit et, ullamcorper elit. Vestibulum efficitur faucibus pharetra. Morbi rutrum magna eget quam molestie porttitor. Fusce euismod elementum massa id iaculis.";
      const authorImg =
        input.authorImg ||
        "https://images.prismic.io/barnebys/3891b62ae1e5e84687e179c47c668f6eae3240f1_pablo-picasso.-le-marin.jpg?w=800&auto=format%2Ccompress&cs=tinysrgb";

      const book = {
        name: input.name,
        year: input.year,
        genre: input.genre,
        author: input.author,
        authorDescription: authorDescription,
        authorImg: authorImg,
        price: input.price,
        score: input.score,
        language: input.language,
        description: description,
        image: image,
      };
      dispatch(postBook(book));
      Swal.fire({
        icon: "success",
        title: "¡Listo!",
        text: "Libro creado correctamente.",
      });
      history.push("/dashboard");
    }
  }

  const addGenre = () => {
    setCantInputs([...cantInputs, "x"]);
  };

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
      <div className="container">
        <img
          src="https://1.bp.blogspot.com/-hSPeHtslH-g/YEXh0nET5yI/AAAAAAAAA64/CedWFXdcmeQHL2QcbpKLZkMRg23Ly2mEACLcBGAsYHQ/s900/1576518279-1576518279_goodreads_misc.gif"
          width="40%"
        ></img>

        <form className="form" onSubmit={(g) => handleSubmit(g)}>
          <h1 className="create">Publicar un Libro</h1>
          <div className="group">
            <label className="letter">Nombre</label>
            <input
              required
              type="text"
              value={input.name}
              name="name"
              onChange={(g) => handleChange(g)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="group">
            <label className="letter">Año de publicacion</label>
            <input
              required
              type="number"
              value={input.year}
              name="year"
              onChange={(g) => handleChange(g)}
            />
            {errors.year && <p className="error">{errors.year}</p>}
          </div>
          <div className="group">
            <label className="letter">Generos</label>
            <div className="genres">
              {cantInputs.map(() => (
                <select
                  required
                  type="text"
                  name="genre"
                  onChange={(g) => handleChangeGenre(g)}
                >
                  {genres.map((g) => (
                    <option value={g.name}>{g.name}</option>
                  ))}
                </select>
              ))}
              <button onClick={(g) => addGenre(g)}> + </button>
            </div>
          </div>
          <div className="group">
            <label className="letter">Autor</label>
            <input
              required
              type="text"
              value={input.author}
              name="author"
              onChange={(g) => handleChange(g)}
            />
            {errors.author && <p className="error">{errors.author}</p>}
          </div>
          <div className="group">
            <label className="letter">Descripcion de Autor</label>
            <input
              type="text"
              value={input.authorDescription}
              name="authorDescription"
              onChange={(g) => handleChange(g)}
            />
          </div>
          <div className="group">
            <label className="letter">Imagen de Autor</label>
            <input
              type="text"
              value={input.authorImg}
              name="authorImg"
              onChange={(g) => handleChange(g)}
            />
          </div>
          <div className="group">
            <label className="letter">Precio</label>
            <input
              required
              type="number"
              value={input.price}
              name="price"
              onChange={(g) => handleChange(g)}
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <div className="group">
            <label className="letter">Puntuacion</label>
            <input
              required
              type="number"
              value={input.score}
              name="score"
              onChange={(g) => handleChange(g)}
            />
            {errors.score && <p className="error">{errors.score}</p>}
          </div>
          <div className="group">
            <label className="letter">Idioma</label>
            <input
              required
              type="text"
              value={input.language}
              name="language"
              onChange={(g) => handleChange(g)}
            />
            {errors.language && <p className="error">{errors.language}</p>}
          </div>
          <div className="group">
            <label className="letter">Description</label>
            <textarea
              className="desc"
              type="text"
              value={input.description}
              name="description"
              onChange={(g) => handleChange(g)}
            />
          </div>
          <div className="group">
            <label className="letter">Portada URL</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(g) => handleChange(g)}
            />
          </div>
          <button
            className="submit"
            type="submit"
            disabled={
              !input.name ||
              !input.year ||
              !input.author ||
              !input.price ||
              !input.score ||
              !input.language
            }
          >
            CreateBook
          </button>
        </form>
      </div>
    </div>
  );
}
