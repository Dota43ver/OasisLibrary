import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  activeAccount,
  deactivateAccount,
  deleteAccount,
  getAllUsers,
  getUsers,
  makeAdmin,
} from "../../actions";
import NavBarDash from "../NavBarDash/NavBarDash";
import adminIcon from "./adminIcon.png";
import oasis from "./oasis.jpg";
import "./Users.css";
const Swal = require("sweetalert2");

export default function Users() {
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllUsers());
  }, [dispatch]);
  function handleRefreshUsers() {
    dispatch(getAllUsers());
  }
  function handleActiveAcc(user) {
    dispatch(activeAccount(user));
    Swal.fire({
      icon: "success",
      title: "Cuenta activada correctamente",
    });
    dispatch(getAllUsers());
  }
  function handleMakeAdmin(user) {
    Swal.fire({
      title: `¿Quieres hacer a ${user.email} administrador?`,
      icon: "`warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, hacer administrador",
    }).then(
      (result) => {
        if (result.value) {
          makeAdmin(user);
          Swal.fire("Hecho", `${user.EMAIL} ahora es administrador`, "success");
        }
      },
      setTimeout(() => {
        window.location.reload(false);
      }, 2000)
    );
  }
  function handleDeactivateAcc(user) {
    dispatch(deactivateAccount(user));
    Swal.fire({
      icon: "success",
      title: "Cuenta desactivada correctamente",
    });
    dispatch(getAllUsers());
  }
  function handleDeleteAcc(id, user) {
    Swal.fire({
      title: `¿Estás seguro de eliminar la cuenta de ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
      confirmButtonText: "Eliminar cuenta",
      denyButtonText: "Desactivar cuenta",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // Llamar a la función para eliminar la cuenta
        dispatch(deleteAccount(id))
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Cuenta eliminada correctamente",
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Ocurrió un error al eliminar la cuenta",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.deny) {
        // Llamar a la función para desactivar la cuenta
        dispatch(deactivateAccount(user))
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Cuenta desactivada correctamente",
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Ocurrió un error al desactivar la cuenta",
            });
          });
      }
    });
  }

  return (
    <div>
      <NavBarDash></NavBarDash>
      {user && user.role === "admin" ? (
        <div>
          {allUsers.length > 0 ? (
            allUsers.map((el) => {
              return user.id === el.id ? null : (
                <div className="userCont">
                  <div className="userCont2">
                    <h3 className="nameLastname">
                      {el.name} {el.lastName}
                    </h3>
                    <h3 className="userEmail">{el.email}</h3>
                    {el.role === "user" ? (
                      <h3 className="roleState">Usuario</h3>
                    ) : (
                      <div className="roleState">
                        <img
                          className="adminIcon"
                          src={adminIcon}
                          alt="adminIcon"
                        />
                      </div>
                    )}
                    <h3 className="active">
                      {el.isActive ? "Activa" : "Sin activar"}
                    </h3>
                    <button
                      className="ok-button"
                      onClick={() => handleActiveAcc(el)}
                    >
                      Activar
                    </button>
                    <button
                      className="red-button"
                      onClick={() => handleDeactivateAcc(el)}
                    >
                      Desactivar
                    </button>
                    <button
                      className="ok-button"
                      onClick={() => handleMakeAdmin(el)}
                    >
                      Hacer Administador
                    </button>
                    <div>
                      <button
                        className="red-button"
                        onClick={() => handleDeleteAcc(el.id, el)}
                      >
                        ELIMINAR
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div> nada</div>
          )}
        </div>
      ) : (
        <div>
          <h3>Registered Users Only</h3>
        </div>
      )}
    </div>
  );
}
