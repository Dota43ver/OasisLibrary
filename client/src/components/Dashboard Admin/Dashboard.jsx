import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions";
import style from "./Dashboard.module.css";
import oasis from "./oasis.jpg";

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
        <div className={style.barra}>
          <div className={style.barraContent}>
            <Link to="/home">
              <img src={oasis} alt="" width="114px" height="105px" />
            </Link>
            <h2 className={style.title}>Dashboard Admin</h2>
          </div>
          <div className={style.linkCreate}>
            <Link to="/dashboard/bookcreate">
              <button className={style.createBtn}>Add Books</button>
            </Link>
            <Link to="/dashboard/bookedit">
              <button className={style.createBtn}>Edit book</button>
            </Link>
            <Link to="/dashboard/users">
              <button className={style.createBtn}>Users</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={style.content}>
          <h3>Registered Users Only</h3>
        </div>
      )}
    </div>
  );
}
