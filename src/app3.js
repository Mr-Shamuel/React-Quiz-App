// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Auth from "./Auth";
// import QuestionManagement from "./QuestionManagement";
// import AnswerManagement from "./AnswerManagement";

// function App() {
//   const [user, setUser] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
//     const storedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
//     setQuestions(storedQuestions);
//     setAnswers(storedAnswers);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("questions", JSON.stringify(questions));
//     localStorage.setItem("answers", JSON.stringify(answers));
//   }, [questions, answers]);

//   return (
//     <div className="container mt-5">
//       {!user ? (
//         <Auth login={setUser} />
//       ) : (
//         <div>
//           <div className="d-flex justify-content-between">
//             <h2>Welcome, {user === "admin" ? "Admin" : "User"}</h2>
//             <button className="btn btn-danger" onClick={() => setUser(null)}>
//               Logout
//             </button>
//           </div>

//           {user === "admin" && (
//             <QuestionManagement questions={questions} setQuestions={setQuestions} setAnswers={setAnswers} />
//           )}

//           {user === "user" && <AnswerManagement questions={questions} answers={answers} setAnswers={setAnswers} />}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;