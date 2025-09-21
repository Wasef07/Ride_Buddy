import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In:", { email, password });
    // 🔹 Replace with backend login logic
  };

  return (
    <>
      {/* Header */}
      <div className="bg-primary text-white py-3">
        <Container>
          <h1 className="fw-bold">Sign In</h1>
          <p>Access your account to track buses and plan trips</p>
        </Container>
      </div>

      {/* Form Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow-sm">
              <h3 className="mb-4 text-center fw-bold">Welcome Back</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small>
                  Don’t have an account?{" "}
                  <a href="/signup" className="text-primary fw-bold">
                    Sign Up
                  </a>
                </small>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignIn;
