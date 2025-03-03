import React from 'react';
import QuestionManagement from './QuestionManagement';
import AnswerManagement from './AnswerManagement';

const Home = (user,setUser,questions,setQuestions,setAnswers,answers) => {
    return (
        <div>
                  <div className="d-flex justify-content-between">
                    <h2>Welcome, {user === "admin" ? "Admin" : "User"}</h2>
                    <button className="btn btn-danger" onClick={() => setUser(null)}>
                      Logout
                    </button>
                  </div>
        
                  {user === "admin" && (
                    <QuestionManagement questions={questions} setQuestions={setQuestions} setAnswers={setAnswers} />
                  )}
        
                  {user === "user" && <AnswerManagement questions={questions} answers={answers} setAnswers={setAnswers} />}
                </div>
    );
};

export default Home;