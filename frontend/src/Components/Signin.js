import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signin } from "../redux/thunk";
import "../Styles/signup.css";

const SignIn = ({ setPage }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      dob: new Date(dob).getTime(),
      password: password,
    };

    const { success } = await dispatch(signin(userData));
    if (success) setPage("login");
    setDob("0");
    setName("");
    setemail("");
    setPassword("");
  };

  return (
    <Card
      style={{
        width: "27rem",
        padding: "2rem",
        backgroundColor: "#1D2C4F",
        color: "#ECF0F1",
      }}
      className="card"
    >
      <Card.Body className="d-flex justify-content-center align-items-center flex-column">
        <Card.Title className="text-center mb-4 title">SIGN IN</Card.Title>
        <div className="user-icon">
          <span className="material-icons">account_circle</span>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="group" controlId="formName">
            <span className="material-icons">person</span>
            <span className="vertical-line"></span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="group mt-3" controlId="formemail">
            <span className="material-icons">person</span>
            <span className="vertical-line"></span>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDob" className="group mt-3">
            <span className="material-icons">calendar_month</span>
            <span className="vertical-line"></span>
            <input
              type="date"
              className="date"
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3 group">
            <span className="material-icons">lock</span>
            <span className="vertical-line"></span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="material-icons"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-4"
            style={{
              width: "100%",
              backgroundColor: "#00F5E1",
              borderColor: "#1ABC9C",
              color: "#000000",
            }}
          >
            SIGN IN
          </Button>
        </Form>
        <Button
          style={{
            border: "none",
            backgroundColor: "transparent",
            width: "100%",
          }}
          onClick={() => setPage("login")}
        >
          Login
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SignIn;
