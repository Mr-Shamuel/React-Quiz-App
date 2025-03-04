import React, { useState } from "react";
import CommonToastFunctions from "../Common/CommonToastFunctions";
import Swal from "sweetalert2";

function QuestionItem({ question, questions, setQuestions, setAnswers }) {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedQuestionText, setEditedQuestionText] = useState("");

  const deleteQuestion = () => {




    Swal.fire({
      title: "Delete",
      text: "Are you sure you want to delete?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {

        setQuestions(questions.filter((q) => q.id !== question.id));
        const updatedAnswers = { ...setAnswers };
        delete updatedAnswers[question.id];
        setAnswers(updatedAnswers);
     
        CommonToastFunctions("error", "Successfully delete");
      }
    }).catch((err) => {
      console.log(err, "err");
    });
  };

  const editQuestion = () => {
    setEditingQuestion(question.id);
    setEditedQuestionText(question.text);
  };
  
  const saveEditedQuestion = () => {
    setQuestions(
      questions.map((q) => (q.id === question.id ? { ...q, text: editedQuestionText } : q))
    );
    setEditingQuestion(null);
    CommonToastFunctions("info", "Updated successfully!");
  };

  return (
    <li className="question-item list-group-item d-flex justify-content-between align-items-center shadow-sm">
      {editingQuestion === question.id ? (
        <input
          className="form-control edit-input"
          type="text"
          value={editedQuestionText}
          onChange={(e) => setEditedQuestionText(e.target.value)}
        />
      ) : (
        <span className="question-text">{question.text}</span>
      )}
      <div>
        {editingQuestion === question.id ? (
          <button className="btn btn-success btn-sm me-2" onClick={saveEditedQuestion}>
            ✅ Save
          </button>
        ) : (
          <button className="btn btn-warning btn-sm me-2" onClick={editQuestion}>
            ✏️ Edit
          </button>
        )}
        <button className="btn btn-danger btn-sm" onClick={deleteQuestion}>
          🗑️ Delete
        </button>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .question-item {
            border-radius: 8px;
            transition: all 0.3s ease-in-out;
            background: #ffffff;
          }
          .question-item:hover {
            background: #f8f9fa;
            transform: scale(1.02);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
          .question-text {
            font-weight: 500;
            color: #333;
          }
          .edit-input {
            border: 2px solid #007bff;
            transition: border-color 0.3s ease;
          }
          .edit-input:focus {
            border-color: #0056b3;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
          }
          .btn-warning:hover {
            background-color: #d39e00;
          }
          .btn-danger:hover {
            background-color: #c82333;
          }
        `}
      </style>
    </li>
  );
}

export default QuestionItem;
