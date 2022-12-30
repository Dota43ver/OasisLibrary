import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview, getUsers } from "../../actions";

export default function Reviews() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(getUsers)
    });

    const [input, setInput] = useState({
        descript:"",
        votes:"",
        userId:"",
        bookId:"",
    })
    console.log(user.name);
    
    return(
        <div>
            <div>
                <h1>Valora El Libro</h1>
                <form>
                    <h3 className="dato" name="name" value={user.name}> Name: {user.name} </h3>
                </form>
            </div>
        </div>
    )
}