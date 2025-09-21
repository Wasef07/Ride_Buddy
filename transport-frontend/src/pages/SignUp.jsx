import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up:", { name, email, password });
    // 🔹 Replace with backend signup logic
  };

  return (
    <>
      {/* Header */}
      <div className="bg-primary text-white py-3">
        <Container>
          <h1 className="fw-bold">Sign Up</h1>
          <p>Create your account and start your journey</p>
        </Container>
      </div>

      {/* Form Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow-sm">
              <h3 className="mb-4 text-center fw-bold">Create Account</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small>
                  Already have an account?{" "}
                  <a href="/signin" className="text-primary fw-bold">
                    Sign In
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

export default SignUp;
