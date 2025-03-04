import React, { useState } from "react";
import CommonToastFunctions from "../Common/CommonToastFunctions";

function AnswerItem({ qid, ans, index, answers, setAnswers }) {
  const [editingAnswer, setEditingAnswer] = useState(false);
  const [editedAnswerText, setEditedAnswerText] = useState(ans);

  const saveEditedAnswer = () => {
    const updatedAnswers = [...answers[qid]];
    updatedAnswers[index] = editedAnswerText;
    setAnswers({ ...answers, [qid]: updatedAnswers });
    setEditingAnswer(false);

    CommonToastFunctions("info", "Updated successfully!");
  };

  return (
    <li className="list-group-item d-flex justify-content-between">
      {editingAnswer ? (
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
        {editingAnswer ? (
          <button className="btn btn-success btn-sm me-2" onClick={saveEditedAnswer}>
            Save
          </button>
        ) : (
          <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingAnswer(true)}>
            Edit
          </button>
        )}
      </div>
    </li>
  );
}

export default AnswerItem;
