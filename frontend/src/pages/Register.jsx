import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    username: "",

    email: "",

    password: ""

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(

        "/auth/register",

        form

      );

      alert("Registration Successful");

      navigate("/login");

    }

    catch (error) {

  console.log(error);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Registration Failed"
  );

}

  };

  return (

    <div className="login-page">

      <form

        className="login-card"

        onSubmit={handleSubmit}

      >

        <h1>Register</h1>

        <input

          type="text"

          name="username"

          placeholder="Username"

          onChange={handleChange}

        />

        <input

          type="email"

          name="email"

          placeholder="Email"

          onChange={handleChange}

        />

        <input

          type="password"

          name="password"

          placeholder="Password"

          onChange={handleChange}

        />

        <button type="submit">

          Register

        </button>

      </form>

    </div>

  );

}

export default Register;