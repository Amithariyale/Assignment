import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "../Styles/signup.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/thunk";
import { useNavigate } from "react-router-dom";

const Login = ({ setPage }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    const { success } = dispatch(login(userData));
    if (success) navigate("/");
    setPassword("");
    setemail("");
    setRememberMe(false);
  };

  return (
    <Card
      style={{
        width: "27rem",
        padding: "2rem",
        backgroundColor: "#1D2C4F",
        color: "#ECF0F1",
      }}
    >
      <Card.Body className="d-flex justify-content-center align-items-center flex-column">
        <Card.Title className="text-center mb-4 title">LOGIN</Card.Title>
        <div className="user-icon">
          <span className="material-icons">account_circle</span>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="group" controlId="formemail">
            <span className="material-icons">person</span>
            <span className="vertical-line"></span>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
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

          <Form.Group controlId="formBasicCheckbox" className="mt-3 group2">
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <a href="#">Forgot your password?</a>
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
            LOGIN
          </Button>
        </Form>
        <Button
          style={{
            border: "none",
            backgroundColor: "transparent",
            width: "100%",
          }}
          onClick={() => setPage("signin")}
        >
          SignIn
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Login;
