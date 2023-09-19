import React from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  //Function to submit data with method post
  function handleSignup(e) {
    //when sign up send prevent from reloading page
    e.preventDefault();
    signup({ name, email, password });
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={6} className="signup__form--container">
            <Form style={{ width: "100%" }} onSubmit={handleSignup}>
              <h1>Sign up your account</h1>
              {isError && <Alert variant="danger">{error.data}</Alert>}
              {/* Name */}
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* Email */}
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* Password */}
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Button
                  type="submit"
                  style={{ marginTop: "16px" }}
                  disabled={isLoading}
                >
                  Create account
                </Button>
              </Form.Group>

              <p>
                Don't have an account? <Link to="/login">Login</Link>{" "}
              </p>
            </Form>
          </Col>
          <Col md="6" className="signup__image--container"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
