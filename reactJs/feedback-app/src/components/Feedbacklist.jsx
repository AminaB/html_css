import React from 'react';
import FeedbackItem from "./FeedbackItem";
import PropTypes from "prop-types";
function FeadbackList({feedback}) {
    if(!feedback || feedback.length === 0){
        return <p>No feedback</p>
    }
    return (
        <div className='feedback-list'>
            {feedback.map((item) => (
                <FeedbackItem key={item.id} item={item}  />
            ))}

        </div>
    );
}

FeadbackList.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
        })
    ),
}
export default FeadbackList;
