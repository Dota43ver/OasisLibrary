import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBook } from "../../actions"; 
import "./CardEdit.css";
const Swal = require("sweetalert2");

export default function Card({
  name,
  price,
  score,
  image,
  stock,
  year,
  author,
  description,
  language,
  saga,
  id,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name,
    price,
    score,
    image,
    stock,
    year,
    author,
    description,
    language,
    saga,
  });
  const validateForm = () => {
    if (formData.name.trim() === "") {
      Swal.fire("Error", "Debe ingresar un nombre de libro", "error");
      return false;
    }
    if (formData.author.trim() === "") {
      Swal.fire("Error", "Debe ingresar un autor", "error");
      return false;
    }
    if (formData.price <= 0) {
      Swal.fire("Error", "El precio debe ser mayor a 0", "error");
      return false;
    }
    if (formData.score < 0) {
      Swal.fire("Error", "La puntuación debe ser mayor o igual a 0", "error");
      return false;
    }
    if (formData.stock < 0) {
      Swal.fire("Error", "El stock debe ser mayor o igual a 0", "error");
      return false;
    }
    if (formData.year < 0) {
      Swal.fire("Error", "El año debe ser mayor o igual a 0", "error");
      return false;
    }
    if (formData.description.trim() === "") {
      Swal.fire("Error", "Debe ingresar una descripción", "error");
      return false;
    }

    // Si todas las condiciones se cumplen, se devuelve true
    return true;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      Swal.fire({
        icon: "question",
        title: "¿Estás seguro?",
        text: "¿Deseas actualizar el libro?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          dispatch(updateBook({ ...formData, id }));
          Swal.fire({
            icon: "success",
            title: "¡Listo!",
            text: "Se ha actualizado el libro correctamente.",
          });
        }
      });
    }
  };
  // Crea un estado para la descripción y otro para controlar si el textarea está o no visible
  const [descriptionn, setDescription] = useState(formData.description);
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  // Crea una función que se ejecute cuando se presione el botón y muestre u oculte el textarea
  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };
  return (
    <div className="cardEdits">
      <form className="cardEdit" onSubmit={handleSubmit}>
        <div>
          <div className="dataEdit">
            <img
              className="cardimagen"
              src={formData.image}
              alt="img not found"
              width="40"
            ></img>

            <h3 className="nameEdit">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </h3>
            <h3 className="nameEdit">
              Autor:
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </h3>

            <h3 className="priceEdit">
              $
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </h3>
            <h3 className="scoreEdit">
              Puntuación:
              <input
                type="number"
                name="score"
                value={formData.score}
                onChange={handleChange}
                step="0.1"
              />
            </h3>
            <h3>
              Stock:
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </h3>
            <h3>
              Año:
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
            </h3>

            <h3>
              {/* Muestra un botón si el textarea no está visible, o el textarea si está visible */}
              {!descriptionVisible ? (
                <button type="button" onClick={toggleDescription}>
                  Mostrar Descripción
                </button>
              ) : (
                <textarea
                  name="description"
                  value={descriptionn}
                  onChange={(event) => setDescription(event.target.value)}
                />
              )}
            </h3>
            <h3>
              Idioma:
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Seleccione un idioma
                </option>
                <option value="español">Español</option>
                <option value="ingles">Inglés</option>
              </select>
            </h3>
            <h3>
              Saga:
              <select name="saga" value={formData.saga} onChange={handleChange}>
                <option value="" disabled>
                  Seleccione una saga
                </option>
                <option value="none">Ninguna</option>
                <option value="Harry Potter">Harry Potter</option>
                <option value="Juego de Tronos">Juego de Tronos</option>
                <option value="El Señor de los Anillos">
                  El Señor de los Anillos
                </option>
              </select>
            </h3>
            <button type="submit">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
