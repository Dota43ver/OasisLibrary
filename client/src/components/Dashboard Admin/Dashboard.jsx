import React from "react";
import { Link } from "react-router-dom";
import style from "./Dashboard.module.css";
import oasis from "./oasis.jpg";

export default function Dashboard() {
  return (
    <div>
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
        </div>
      </div>
      <div className={style.content}>
        <h3>Registered Users</h3>
      </div>
    </div>
  );
}
