import React from "react";
import {AiOutlineStar, AiFillStar} from "react-icons/ai"


export default function Review({ user, votes, descript}) {
    return (
        <div className="card">

            
            <h2 className="name"> {user} </h2>

            <div className="datos">
                <h3 className="price"> {descript} </h3>
                <h3 className="score"> {votes}</h3>
            </div>
        </div>
    )
}