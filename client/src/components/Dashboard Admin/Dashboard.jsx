import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions";
import NavBarDash from "../NavBarDash/NavBarDash";
import style from "./Dashboard.module.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  return (
    <div>
      <NavBarDash></NavBarDash>
      {" "}
      {user && user.role === "admin" ? (
        <div> admin </div>
      ) : (
        <div className={style.content}>
          <h3>Registered Users Only</h3>
        </div>
      )}
    </div>
  );
}
