import React from "react";
import style from "./Dashboard.module.css";
import oasis from "./oasis.jpg";
import {Link} from "react-router-dom"

export default function Dashboard(){

    return(
    <div>
        <div className={style.barra}>

            <div className={style.barraContent}>
                <Link to="/home">
                  <img src={oasis} alt="" width="114px" height="105px" />
                </Link>
                <h2 className={style.title}>Dashboard Admin</h2>
            </div>

            <div className={style.linkCreate}>
                <Link to="/bookcreate">
                    <button className={style.createBtn}>Add Books</button>
                </Link>
            </div>

        </div>
        <div className={style.content}>
            <h3>Registered Users</h3>
        </div>
    </div>
    )
        
}

