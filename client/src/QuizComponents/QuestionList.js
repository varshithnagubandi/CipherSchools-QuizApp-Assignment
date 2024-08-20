import React from "react";
import "./Quiz.css";

const QuestionList = ({ question, options, handleClick, currentAnswer }) => {
  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => {
          return (
            <div>
              <li 
                key={index}
                onClick={() => handleClick(option)}
                className={currentAnswer === option ? "selected" : ""}
              >
                {option}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionList;
