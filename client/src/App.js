import "./App.css";
import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Home from "./Home";
import Quiz from "./QuizComponents/Quiz";

export const store = createContext();

function App() {
  const [token, setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token, setToken]}>
        {!token && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/start-quiz" element={<Quiz />}></Route>
        </Routes>
      </store.Provider>
    </div>
  );
}

export default App;
