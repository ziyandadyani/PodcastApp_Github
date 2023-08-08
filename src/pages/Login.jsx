// import React from "react";

// const Login = () => {
//     return <div>Login</div>;
// };

// export default Login;

import React from "react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform authentication logic here (e.g., using an API)
    try {
      // Replace this with actual authentication logic
      if (email === "user@example.com" && password === "password") {
        // Successful login logic
        console.log("Logged in successfully");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className= "login-flexbox">
      <div className="login-page">
      <div className="login-flex"><h2 className = "login-label">Login</h2></div>
      <form onSubmit={handleLogin}>
        <div>
          <label className="email-label">Email:</label>
          <input className="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="password-label">Password:</label>
          <input
            className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button  className="login-btn" type="submit">Login</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
      </div>
    </div>
  );
};

export default Login;

