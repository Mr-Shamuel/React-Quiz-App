import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import CommonToastFunctions from '../Common/CommonToastFunctions';

const LoginPage = ({ setUser }) => {
  const mockUser = [
    // { id: 1, userName: "admin", password: "admin123", role: "admin" },
    { id: 1, userName: "admin", password: "admin123", role: "admin" },
    { id: 2, userName: "user", password: "user123", role: "user" }
  ];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = mockUser.find(
      (user) => user.userName === username && user.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Save to local storage
      setUser(user); // Set state
      navigate(`/${user.role}`); // Redirect
      setError("");
      CommonToastFunctions("success", "Successfully logged In");
    } else {
      setError("Invalid username or password");
      CommonToastFunctions("error", "Invalid username or password");
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: '400px' }}>
        <h4 className="text-center mb-4">Log In</h4>

        {error && <p className='text-danger text-center'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
