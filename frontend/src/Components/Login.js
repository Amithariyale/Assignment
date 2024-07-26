import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../redux/thunk";
import { useNavigate } from "react-router-dom";
import "../Styles/auth.css";

const Login = ({ setPage }) => {
  // State hooks to manage input values and other state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({}); // State to track form validation errors

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to validate input fields
  const validateInputs = () => {
    const errors = {};
    if (!email)
      errors.email = "Email is required"; // Check if email is provided
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid"; // Check if email is in valid format
    if (!password)
      errors.password = "Password is required"; // Check if password is provided
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters long"; // Check if password is at least 6 characters long
    return errors;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const validationErrors = validateInputs(); // Validate inputs
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // If there are validation errors, set them in the state
      return;
    }

    // If inputs are valid, create user data object
    const userData = {
      email,
      password,
    };
    const { success } = await dispatch(login(userData)); // Dispatch login action and get success status
    if (success) {
      navigate("/"); // If login is successful, navigate to home page
      setPassword(""); // Reset password input
      setEmail(""); // Reset email input
      setRememberMe(false); // Reset remember me checkbox
    }
    setErrors({});
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
          <Form.Group className="group" controlId="formEmail">
            <span className="material-icons">person</span>
            <span className="vertical-line"></span>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          {errors.email && <p className="error-text">{errors.email}</p>}{" "}
          {/* Display email error if exists */}
          <Form.Group controlId="formPassword" className="mt-4 group">
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
          {errors.password && <p className="error-text">{errors.password}</p>}{" "}
          {/* Display password error if exists */}
          <Form.Group controlId="formBasicCheckbox" className="mt-4 group2">
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
