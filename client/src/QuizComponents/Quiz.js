import React, { useState, useContext, useEffect, useRef } from "react";
import QuestionList from "./QuestionList";
import "./Quiz.css";
import { store } from "../App";
import { useNavigate } from "react-router-dom";
//import emailjs from "@emailjs/browser";
import emailjs from "emailjs-com";

const Quiz = () => {
  const [, setToken] = useContext(store);
  const navigate = useNavigate();

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vll9yxp",
        "template_thtl44t",
        form.current,
        "l33MEiokOwLR9cwsy"
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const questions = [
    {
      question:
        "1. What of the following is used in React.js to increase performance?",
      options: [
        "Original DOM",
        "Virtual DOM",
        "Both A and B",
        "None of the above",
      ],
      answer: "Virtual DOM",
    },
    {
      question: "2. What are the two ways to handle data in React?",
      options: [
        "State and props",
        "State and context",
        "Props and refs",
        "State and hooks",
      ],
      answer: "State and props",
    },
    {
      question: "3. What is the purpose of the useEffect hook in React?",
      options: [
        "To handle component events",
        "To perform side effects in function components",
        "To update the DOM",
        "To create new components",
      ],
      answer: "To perform side effects in function components",
    },
    {
      question:
        "4. Which method is used to update the state in a React class component?",
      options: [
        "setState()",
        "updateState()",
        "changeState()",
        "modifyState()",
      ],
      answer: "setState()",
    },
    {
      question: "5. What does JSX stand for in React?",
      options: [
        "JavaScript XML",
        "JavaScript XHTML",
        "JavaScript Extension",
        "JavaScript Extra",
      ],
      answer: "JavaScript XML",
    },
    {
      question:
        "6. How can you pass data from a parent component to a child component in React?",
      options: [
        "By using state",
        "By using props",
        "By using refs",
        "By using hooks",
      ],
      answer: "By using props",
    },
    {
      question: "7. What is the purpose of the key prop in React lists?",
      options: [
        "To identify elements uniquely for performance optimization",
        "To style elements individually",
        "To handle events",
        "To bind data to elements",
      ],
      answer: "To identify elements uniquely for performance optimization",
    },
    {
      question:
        "8. Which lifecycle method is called once after the component mounts for the first time in a class component?",
      options: [
        "componentDidUpdate",
        "componentWillUnmount",
        "componentDidMount",
        "componentWillMount",
      ],
      answer: "componentDidMount",
    },
    {
      question: "9. In React, what is the purpose of React.memo?",
      options: [
        "To memoize component output for performance optimization",
        "To manage component state",
        "To handle routing",
        "To trigger component updates",
      ],
      answer: "To memoize component output for performance optimization",
    },
    {
      question: "10. What is the use of the useReducer hook in React?",
      options: [
        "To manage local state with complex logic",
        "To perform side effects",
        "To manage context data",
        "To handle component lifecycle",
      ],
      answer: "To manage local state with complex logic",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    // Display webcam feed
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log("Error accessing webcam: ", err);
      });

    return () => {
      if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClick = (option) => {
    setSelectedAnswers((prev) => {
      const newSelectedAnswers = { ...prev, [currentQuestionIndex]: option };

      
      let newScore = score;
      if (
        prev[currentQuestionIndex] === questions[currentQuestionIndex].answer
      ) {
        newScore -= 1; 
      }
      if (option === questions[currentQuestionIndex].answer) {
        newScore += 1; 
      }

      setScore(newScore);

      return newSelectedAnswers;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <div>
      {currentQuestionIndex < questions.length ? (
        <center>
          <video ref={videoRef} autoPlay className="webcam-feed"></video>
          <QuestionList
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            handleClick={handleClick}
            currentAnswer={selectedAnswers[currentQuestionIndex] || null}
          />
          <div className="quiz-buttons">
            <button
              disabled={currentQuestionIndex === 0}
              className={
                currentQuestionIndex === 0 ? "button-disable" : "button"
              }
              onClick={handlePreviousQuestion}
            >
              PREVIOUS QUESTION
            </button>
            <button
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className={
                selectedAnswers[currentQuestionIndex] === undefined
                  ? "button-disable"
                  : "button"
              }
              onClick={handleNextQuestion}
            >
              NEXT QUESTION
            </button>
          </div>
        </center>
      ) : (
        <div>
          <h1 className="quiz-score">
            <center>
              YOUR SCORE IS : <span className="quiz-result">{score}</span>
            </center>
          </h1>
          <center>
            <form ref={form} onSubmit={sendEmail}>
              <h3 className="warning">
                PLEASE ENTER REGISTER EMAIL-ID AND CORRECT MARKS AS SHOWN ABOVE
                TO QULIFY NEXT ROUND{" "}
              </h3>
              <label>Email</label>
              <br />
              <input type="email" name="user_email" />
              <br />
              <label>Marks</label>
              <br />
              <input type="number" name="message" />
              <br />
              <br />
              <input type="submit" value="Send" />
            </form>
          </center>
          <center>
            <button className="logout-button" onClick={handleLogout}>
              LOGOUT
            </button>
          </center>
        </div>
      )}
    </div>
  );
};

export default Quiz;
