import React from 'react';
import {useState, createContext, useEffect} from "react";
import {v4 as uuidv4} from "uuid";

const FeedbackContext=createContext(undefined)

export const FeedbackProvider=({children})=>{
    const[isLoading, setIsLoading]=useState(true);
    const [feedback,setFeedback]=useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit: false
    })
    useEffect(()=>{
        fetchFeedback();
    },[])

    // fetcch data
    const fetchFeedback= async ()=>{
        const response= await fetch('/feedback?_sort=id&_order=desc');
        const data =await response.json();
        setFeedback(data);
        setIsLoading(false);
    }
    // edi item
    const editFeedback = (item)=>{
        setFeedbackEdit({item, edit:true});
    }
    // Update feedback item
    const updateFeedback=(id,updItem)=>{
        setFeedback(feedback.map((item)=>
             (item.id===+id? {...item, ...updItem}: item))
        )
    }
    const deleteFeedBack = (id) => {
        if(window.confirm("Are you sure you want to delete this feedback?")){
            setFeedback(feedback.filter((item) => item.id !== id))
        }

    }
    const addFeedback = (newFeedBack) => {
        newFeedBack.id=uuidv4();
        setFeedback([newFeedBack,...feedback]);
    }
    return <FeedbackContext.Provider  value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedBack,
        addFeedback,
        editFeedback,
        updateFeedback,

    }}> {children}</FeedbackContext.Provider>;
}

export default FeedbackContext;
