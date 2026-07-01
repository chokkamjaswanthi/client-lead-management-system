import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      
      setToken(res.data.token);
      
      navigate("/");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-page">

      <form
        className="login-card"
        onSubmit={handleLogin}
      >

        <h1>Mini CRM</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>
          setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
          setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

        <p>

Don't have an account?

<a href="/register">

 Register

</a>

</p>

      </form>

    </div>
  );
}

export default Login;