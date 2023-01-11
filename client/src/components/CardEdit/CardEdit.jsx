import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { destroyBook, updateBook } from "../../actions";
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
    if (formData.description.trim() === "") {
      Swal.fire("Error", "Debe ingresar una descripción", "error");
      return false;
    }
    if (formData.price <= 0) {
      Swal.fire("Error", "El precio debe ser mayor a 0", "error");
      return false;
    }
    if (formData.score < 0 || formData.score > 5) {
      Swal.fire(
        "Error",
        "La puntuación debe ser mayor o igual a 0 y menor que 5",
        "error"
      );
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
  function handleDelete(id, formData) {
    Swal.fire({
      title: `Estás seguro de que quieres eliminar el libro: ${formData.name}?`,
      icon: "`warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar",
    }).then((result) => {
      if (result.value) {
        destroyBook(id);
        Swal.fire(
          "Hecho",
          `${formData.name} fue eliminado correctamente`,
          "success"
        );
      }
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    });
  }
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
          setIsEditable(true);
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

  const [isEditable, setIsEditable] = useState(true);

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
              Titulo:
              <input
                disabled={isEditable}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </h3>
            <h3 className="nameEdit">
              Autor:
              <input
                disabled={isEditable}
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </h3>

            <h3 className="priceEdit">
              Precio:
              <input
                disabled={isEditable}
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </h3>
            <h3 className="scoreEdit">
              Puntuación:
              <input
                disabled={isEditable}
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
                disabled={isEditable}
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </h3>
            <h3>
              Año:
              <input
                disabled={isEditable}
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
            </h3>

            <h3>
              {/* Muestra un botón si el textarea no está visible, o el textarea si está visible */}
              {!descriptionVisible ? (
                <button
                  type="button"
                  onClick={toggleDescription}
                  disabled={isEditable}
                >
                  Mostrar Descripción
                </button>
              ) : (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              )}
            </h3>
            <h3 style={{ paddingLeft: "2rem" }}>
              <select
                disabled={isEditable}
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="custom-select"
              >
                <option value="" disabled>
                  Seleccione un idioma
                </option>
                <option value="Español">Español</option>
                <option value="Ingles">Inglés</option>
              </select>
            </h3>
            <h3>
              Saga:
              <select
                name="saga"
                value={formData.saga}
                onChange={handleChange}
                disabled={isEditable}
              >
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

            {isEditable ? (
              <button
                onClick={() => setIsEditable(false)}
                type="button"
                key={`edit-${id}`}
              >
                {" "}
                Editar{" "}
              </button>
            ) : (
              <button type="submit" key={`save-${id}`}>
                Guardar
              </button>
            )}
          </div>
        </div>
      </form>
      <div className="delButDiv">
        <button
          className="deleteBut"
          onClick={() => handleDelete(id, formData)}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-trash"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
