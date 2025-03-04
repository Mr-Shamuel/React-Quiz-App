import React, { useState } from "react";
import AnswerItem from "./AnswerItem";
import CommonToastFunctions from "../Common/CommonToastFunctions";
import Swal from "sweetalert2";
import CommonConfetti from "../Common/CommonConfetti";

function AnswerManagement({
  questions,
  answers,
  setAnswers,
  quizStatus,
  setQuizStatus,
}) {
  const [newAnswer, setNewAnswer] = useState({});
  const [submitAns,setSubmitAns]=useState(false);

  const submitAnswer = (qid) => {
    if (newAnswer[qid]?.trim()) {
      const prevAnswers = answers[qid] || [];
      setAnswers({ ...answers, [qid]: [...prevAnswers, newAnswer[qid]] });
      setNewAnswer({ ...newAnswer, [qid]: "" });
      CommonToastFunctions("success", "Answer Added");
    }
  };

  const handleSubmitQuiz = () => { 
    setSubmitAns(false);
    Swal.fire({
      title: "Submit Quiz?",
      text: "Are you sure you want to Submit quiz?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setQuizStatus({ ...quizStatus, quizSubmitted: true });
        localStorage.setItem(
          "fullquiz",
          JSON.stringify({
            questionsList: questions,
            answersList: answers,
          })
        );
        CommonToastFunctions("success", "Quiz Submitted successfully!");
        setSubmitAns(true);
      }
    }).catch((err) => {
      console.log(err, "err");
    });
  };

  return (
    <div className="mt-4">
      {quizStatus?.quizCreated ? <>
        <h4 className="mb-4 text-center text-primary">
          Answer Questions
          <button className="btn btn-success ms-3" onClick={handleSubmitQuiz}>
            {submitAns ?"Submit Again" : "Submit Quiz"}
          </button>
        </h4>


        {questions.map((q) => (
          <div key={q.id} className="card shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title text-muted">{q.text}</h5>

              <div className="input-group mb-3">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your answer"
                  value={newAnswer[q.id] || ""}
                  onChange={(e) =>
                    setNewAnswer({ ...newAnswer, [q.id]: e.target.value })
                  }
                />
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => submitAnswer(q.id)}
                >
                  Submit Answer
                </button>
              </div>

              <ul className="list-group">
                {(answers[q.id] || []).map((ans, index) => (
                  <AnswerItem
                    key={index}
                    qid={q.id}
                    ans={ans}
                    index={index}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                ))}
              </ul>
            </div>
          </div>
        ))}

      </>

      : 

      <h4 className="text-danger text-center">No Quiz Created</h4>
      }
      
      {/* {quizStatus?.quizCreated === false && (
        <h4 className="text-danger text-center">No Quiz Created</h4>
      )} */}

      {
        submitAns  && <CommonConfetti/>
      }
    </div>
  );
}

export default AnswerManagement;
