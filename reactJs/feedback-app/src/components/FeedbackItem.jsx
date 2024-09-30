import React from 'react';
import {useState} from "react";

function FeedbackItem(props) {
    const[rating, setRating] = useState(7);
    const[text, setText] = useState(' This is an example of a feedback item');
    const handleClick = () => {
        setRating((prevState)=>{
            return prevState+1;
        });
    }
    return (
        <div className="card">
            <div className="num-display">{rating}</div>
            <div className="text-display">{text}
            <button onClick={handleClick}>click</button>
            </div>
        </div>
    );
}

export default FeedbackItem;
