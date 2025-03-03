import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      
      <div className="row justify-content-center">
        {/* Create Quiz Card */}
        <div className="col-md-4">
          <div 
            className="card text-center shadow p-3 admin-card" 
            onClick={() => navigate("/create-quiz")}
          >
            <div className="card-body">
              <h4 className="card-title">Create Quiz</h4>
              <p className="card-text">Start creating quizzes for users.</p>
            </div>
          </div>
        </div>

        {/* Submitted Results Card */}
        <div className="col-md-4">
          <div 
            className="card text-center shadow p-3 admin-card" 
            onClick={() => navigate("/submitted-results")}
          >
            <div className="card-body">
              <h4 className="card-title">Submitted Results</h4>
              <p className="card-text">View quiz submissions from users.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .admin-card {
            cursor: pointer;
            transition: transform 0.3s ease, background-color 0.3s ease;
          }

          .admin-card:hover {
            transform: scale(1.05);
            background-color: #f8f9fa; /* Light gray */
          }
        `}
      </style>
    </div>
  );
};

export default AdminHome;
