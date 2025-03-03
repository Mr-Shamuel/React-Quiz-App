import React from "react";

function Auth({ login }) {
  return (
    <div className="text-center">
      <h2>Login</h2>
      <button className="btn btn-primary m-2" onClick={() => login("admin")}>
        Login as Admin
      </button>
      <button className="btn btn-secondary m-2" onClick={() => login("user")}>
        Login as User
      </button>
    </div>
  );
}

export default Auth;
