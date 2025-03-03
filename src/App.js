import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionManagement from "./Components/QuestionManagement";
import AdminHome from './Components/AdminHome';
import AnswerManagement from './Components/AnswerManagement';
import SubmittedResult from './Components/SubmittedResult'; 
import Swal from 'sweetalert2';
import CommonToastFunctions from './Common/CommonToastFunctions';

function App() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [quizStatus,setQuizStatus]=useState({
    quizCreated:false,
    quizSubmitted:false,
  })

  // Load user from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const storedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
    const quizStatus =JSON.parse(localStorage.getItem("quizStatus")) || {};
    setQuestions(storedQuestions);
    setAnswers(storedAnswers);
    setQuizStatus(quizStatus);
  }, []);

  // Save data to local storage
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("quizStatus", JSON.stringify(quizStatus));
  }, [questions, answers,quizStatus]);

  // Handle logout
  const handleLogout = () => {
  
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        setUser(null);
        CommonToastFunctions("warning","Successfully logged out"); 
      }
    }).catch((err) => {
      console.log(err, "err");
    });
 
  
  };

  return (
    <Router>
      <div className="container">
        {user && (
          <div className="d-flex justify-content-between align-items-center">
            <h2>Welcome, {user.role === "admin" ? "Admin" : "User"}</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        )}

        <Routes>
          {/* Login Page */}
          <Route path="/" element={user ? <Navigate to={`/${user.role}`} /> : <LoginPage setUser={setUser} />} />

          {/* Admin Dashboard */}
      
          <Route path="/admin" element={user?.role === "admin" ? <AdminHome  questions={questions} setQuestions={setQuestions} setAnswers={setAnswers} /> : <Navigate to="/" />} />
          <Route path="/create-quiz" element={user?.role === "admin" ? <QuestionManagement questions={questions} setQuestions={setQuestions} setAnswers={setAnswers} setQuizStatus={setQuizStatus} quizStatus={quizStatus} /> : <Navigate to="/" />} />
          <Route path="/submitted-results" element={user?.role === "admin" ? <SubmittedResult questions={questions} setQuestions={setQuestions} setAnswers={setAnswers} setQuizStatus={setQuizStatus} quizStatus={quizStatus} /> : <Navigate to="/" />} />

          {/* User Dashboard */}
          <Route path="/user" element={user?.role === "user" ? <AnswerManagement questions={questions} answers={answers} setAnswers={setAnswers}  setQuizStatus={setQuizStatus} quizStatus={quizStatus}/> : <Navigate to="/" />} />

          {/* 404 Page */}
          <Route path="*" element={<div><h3>404 - Page Not Found</h3></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
