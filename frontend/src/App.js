import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/login" element={<Login />}></Route>

            <Route path="/register" element={<Register />}></Route>

            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />}></Route>
            </Route>

            <Route path="/tickets" element={<PrivateRoute />}>
              <Route path="/tickets" element={<Tickets />}></Route>
            </Route>

            <Route path="/ticket/:id" element={<PrivateRoute />}>
              <Route path="/ticket/:id" element={<Ticket />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
