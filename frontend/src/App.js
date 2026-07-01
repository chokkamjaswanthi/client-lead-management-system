import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import Leads from "./pages/Leads";
import Analytics from "./pages/Analytics";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route
          path="/login"
          element={<Login setToken={setToken} />}
        />

        <Route
          path="/"
          element={
            token ? (
              <Dashboard setToken={setToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/leads"
          element={
            token
              ? <Leads />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/analytics"
          element={
            token
              ? <Analytics />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;