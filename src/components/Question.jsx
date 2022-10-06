import React, { useState } from 'react';
import '../styles/Question.css';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const Question = ({ title, answer }) => {
    const [showanswer, setShowAnswer] = useState(false);

    const handleClick = () => {
        setShowAnswer(!showanswer);
    }

  return (
    <div className="container-qs question">
        <div className="question-title">
            <h4 style={{color:'grey',}}>{title}</h4>
            <button className='question-icon' onClick={handleClick}>
                {
                    showanswer ? ( <AiOutlineMinus color="#e50914"/> ) : ( <AiOutlinePlus color="#1f93ff"/> )
                }
            </button>
        </div>
        <div className="question_answer">
            {
                showanswer && <p className="small-text" style={{color:'#fff',}}>{answer}</p>
            }
        </div>
    </div>
  )
}

export default Question