import React, { useState } from "react";
import QuestionItem from "./QuestionItem";
import CommonToastFunctions from "../Common/CommonToastFunctions";
import Swal from "sweetalert2";

function QuestionManagement({ questions, setQuestions, setAnswers,quizStatus,setQuizStatus }) {
  const [newQuestion, setNewQuestion] = useState("");

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { id: Date.now(), text: newQuestion }]);
      setNewQuestion("");

      CommonToastFunctions("success", "Successfully added");
    }
  };


  const handleCreateQuiz=()=>{
   
    Swal.fire({
      title: "Create Quiz?",
      text: "Are you sure you want to create a quiz?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setQuizStatus({ ...quizStatus, quizCreated: true });
        CommonToastFunctions("success", "Quiz created successfully!");
      }
    }).catch((err) => {
      console.log(err, "err");
    });
    
  }

  return (
    <div className="mt-4 p-4 rounded shadow-sm bg-light">
      <h3 className="text-center text-primary mb-3">Manage Questions
        
      { questions?.length>0 &&
      <button className="btn btn-warning ms-3" onClick={handleCreateQuiz}>Create Quiz </button>
     }  
      </h3> 

     
      {/* Input Field & Add Button */}
      <div className="input-group mb-3">
        <input
          className="form-control border-primary"
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button className="btn btn-success" onClick={addQuestion}>
           Add Question
        </button>
      </div>

      {/* Question List */}
      <ul className="list-group">
        {questions.length > 0 ? (
          questions.map((q) => (
            <QuestionItem
              key={q.id}
              question={q}
              questions={questions}
              setQuestions={setQuestions}
              setAnswers={setAnswers}
            />
          ))
        ) : (
          <li className="list-group-item text-muted text-center">
            No questions added yet.
          </li>
        )}
      </ul>

      {/* Custom Styles */}
      <style>
        {`
          .bg-light {
            background: #f8f9fa;
          }
          .form-control:focus {
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
          }
          .btn-primary {
            transition: all 0.3s ease-in-out;
          }
          .btn-primary:hover {
            background-color: #0056b3;
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
}

export default QuestionManagement;
