import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState({});
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedQuestionText, setEditedQuestionText] = useState("");
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [editedAnswerText, setEditedAnswerText] = useState("");

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [
      { id: 1, text: "What is React?" },
      { id: 2, text: "What is JSX?" },
    ];
    const storedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
    setQuestions(storedQuestions);
    setAnswers(storedAnswers);
  }, []);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [questions, answers]);

  const login = (role) => setUser(role);
  const logout = () => setUser(null);

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { id: Date.now(), text: newQuestion }]);
      setNewQuestion("");
    }
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    const updatedAnswers = { ...answers };
    delete updatedAnswers[id];
    setAnswers(updatedAnswers);
  };

  const editQuestion = (id, text) => {
    setEditingQuestion(id);
    setEditedQuestionText(text);
  };

  const saveEditedQuestion = (id) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text: editedQuestionText } : q))
    );
    setEditingQuestion(null);
  };

  const submitAnswer = (qid) => {
    if (newAnswer[qid]?.trim()) {
      const prevAnswers = answers[qid] || [];
      setAnswers({ ...answers, [qid]: [...prevAnswers, newAnswer[qid]] });
      setNewAnswer({ ...newAnswer, [qid]: "" });
    }
  };

  const editAnswer = (qid, index, text) => {
    setEditingAnswer({ qid, index });
    setEditedAnswerText(text);
  };

  const saveEditedAnswer = (qid, index) => {
    const updatedAnswers = [...answers[qid]];
    updatedAnswers[index] = editedAnswerText;
    setAnswers({ ...answers, [qid]: updatedAnswers });
    setEditingAnswer(null);
  };

  return (
    <div className="container mt-5">
      {!user ? (
        <div className="text-center">
          <h2>Login</h2>
          <button className="btn btn-primary m-2" onClick={() => login("admin")}>
            Login as Admin
          </button>
          <button className="btn btn-secondary m-2" onClick={() => login("user")}>
            Login as User
          </button>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between">
            <h2>Welcome, {user === "admin" ? "Admin" : "User"}</h2>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          </div>

          {user === "admin" && (
            <div className="mt-4">
              <h4>Manage Questions</h4>
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Enter question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <button className="btn btn-success" onClick={addQuestion}>
                Add Question
              </button>
              <ul className="list-group mt-3">
                {questions.map((q) => (
                  <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {editingQuestion === q.id ? (
                      <input
                        className="form-control"
                        type="text"
                        value={editedQuestionText}
                        onChange={(e) => setEditedQuestionText(e.target.value)}
                      />
                    ) : (
                      <span>{q.text}</span>
                    )}
                    <div>
                      {editingQuestion === q.id ? (
                        <button className="btn btn-success btn-sm me-2" onClick={() => saveEditedQuestion(q.id)}>
                          Save
                        </button>
                      ) : (
                        <button className="btn btn-warning btn-sm me-2" onClick={() => editQuestion(q.id, q.text)}>
                          Edit
                        </button>
                      )}
                      <button className="btn btn-danger btn-sm" onClick={() => deleteQuestion(q.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {user === "user" && (
            <div className="mt-4">
              <h4>Answer Questions</h4>
              {questions.map((q) => (
                <div key={q.id} className="mb-3">
                  <h5>{q.text}</h5>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your answer"
                    value={newAnswer[q.id] || ""}
                    onChange={(e) => setNewAnswer({ ...newAnswer, [q.id]: e.target.value })}
                  />
                  <button className="btn btn-primary mt-2" onClick={() => submitAnswer(q.id)}>
                    Submit Answer
                  </button>
                  <ul className="list-group mt-2">
                    {(answers[q.id] || []).map((ans, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between">
                        {editingAnswer?.qid === q.id && editingAnswer.index === index ? (
                          <input
                            className="form-control"
                            type="text"
                            value={editedAnswerText}
                            onChange={(e) => setEditedAnswerText(e.target.value)}
                          />
                        ) : (
                          <span>{ans}</span>
                        )}
                        <div>
                          {editingAnswer?.qid === q.id && editingAnswer.index === index ? (
                            <button className="btn btn-success btn-sm me-2" onClick={() => saveEditedAnswer(q.id, index)}>
                              Save
                            </button>
                          ) : (
                            <button className="btn btn-warning btn-sm" onClick={() => editAnswer(q.id, index, ans)}>
                              Edit
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
