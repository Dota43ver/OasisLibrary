import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanCache, getAuthorDetails } from "../../actions";
import "../BookDetail/BookDetail.css";
import NavBar from "../NavBar/NavBar.jsx";

export default function Author(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getAuthorDetails(id));
    dispatch(cleanCache());
  }, [dispatch, id]);

  const authorDetails = useSelector((state) => state.authorDetails);

  return (
    <div>
      <NavBar />
      <h1>hola</h1>
      <h2>{authorDetails.name}</h2>
      <h2>{authorDetails.id}</h2>
    </div>
  );
}
