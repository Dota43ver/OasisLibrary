import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions";
import NavBarDash from "../NavBarDash/NavBarDash";
import style from "./Dashboard.module.css";
import Users from "../Users/Users"

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  return (
    <div>
      {" "}
      {user && user.role === "admin" ? (
        <div>
          <NavBarDash></NavBarDash>
          <Users></Users>
        </div>
      ) : (
        <div className={style.content}>
          <h3 className={style.advertisment}>Acceso Restringido a Administradores</h3>
        </div>
      )}
    </div>
  );
}
