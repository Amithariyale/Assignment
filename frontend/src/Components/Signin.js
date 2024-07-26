import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/thunk";
import "../Styles/auth.css"; // Import custom styles
import { ApiStatus } from "../network/constants";
import { Spin } from "antd";

const SignIn = ({ setPage }) => {
  const apiStatus = useSelector((state) => state.data.apiStatus);
  // State hooks to manage input values and other state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({}); // State to track form validation errors

  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // Function to validate input fields
  const validateInputs = () => {
    const errors = {};
    if (!name) errors.name = "Name is required"; // Check if name is provided
    if (!email)
      errors.email = "Email is required"; // Check if email is provided
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid"; // Check if email is in valid format
    if (!dob) errors.dob = "Date of Birth is required"; // Check if date of birth is provided
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
      name: name,
      email: email,
      dob: new Date(dob).getTime(),
      password: password,
    };

    const { success } = await dispatch(signin(userData)); // Dispatch signin action and get success status
    if (success) {
      setPage("login"); // If signin is successful, navigate to login page
      setDob(""); // Reset date of birth input
      setName(""); // Reset name input
      setEmail(""); // Reset email input
      setPassword(""); // Reset password input
    }
    setErrors({}); //Reset Errords
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
          {errors.name && <p className="error-text">{errors.name}</p>}{" "}
          {/* Display name error if exists */}
          <Form.Group className="group mt-4" controlId="formEmail">
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
          <Form.Group controlId="formDob" className="group mt-4">
            <span className="material-icons">calendar_month</span>
            <span className="vertical-line"></span>
            <input
              type="date"
              className="date"
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>
          {errors.dob && <p className="error-text">{errors.dob}</p>}{" "}
          {/* Display date of birth error if exists */}
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
          <Button
            variant="primary"
            type="submit"
            className="mt-4"
            disabled={apiStatus === ApiStatus.pending}
            style={{
              width: "100%",
              backgroundColor: "#00F5E1",
              borderColor: "#1ABC9C",
              color: "#000000",
            }}
          >
            SIGN IN
            {apiStatus === ApiStatus.pending && <Spin className="mx-2" />}
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
