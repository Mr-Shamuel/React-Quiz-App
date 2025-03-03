import React, { useEffect, useState } from 'react';

const SubmittedResult = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load data from localStorage
    const storedQuizData = JSON.parse(localStorage.getItem("fullquiz"));

    if (storedQuizData) {
      setData(storedQuizData);
    }
  }, []);

  return (
    <div className="container mt-5">
      {data ? (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h4>Quiz Results</h4>
              </div>
              <div className="card-body">
                <h5 className="mb-4">Questions and Answers</h5>
                <ul className="list-group">
                  {data.questionsList.map((question, index) => (
                    <li key={question.id} className="list-group-item mb-3">
                      <h6 className="text-muted">{index + 1}. {question.text}</h6>
                      <ul className="list-group">
                        {(data.answersList[question.id] || []).map((answer, ansIndex) => (
                          <li key={ansIndex} className="list-group-item">
                            {answer}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div  className="text-danger text-center">
          <h4>No quiz data available.</h4>
        </div>
      )}
    </div>
  );
};

export default SubmittedResult;
