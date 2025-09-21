import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import heroImage from "../assets/hero-transit.jpg"; // 👈 background image

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white position-relative"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          padding: "4rem 2rem",
        }}
      >
        {/* Blue Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0, 51, 153, 0.75)",
          }}
        ></div>

        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <h1 className="display-4 fw-bold mb-3">RideBuddy 🚍</h1>
              <p className="lead mb-4">
                Never miss your bus again. Track real-time locations, get
                accurate arrival times, and plan your journey across India
                with confidence.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button
                  as={Link}
                  to="/livemap"
                  size="lg"
                  variant="light"
                  className="fw-semibold"
                >
                  Track Buses Now
                </Button>
                <Button
                  as={Link}
                  to="/routes"
                  size="lg"
                  variant="outline-light"
                  className="fw-semibold"
                >
                  Find My Stop
                </Button>
              </div>
            </Col>
          </Row>

          {/* Stats Section */}
          
        </Container>
      </section>

      {/* Features Section */}
      <section style={{ background: "#f8f9fa", padding: "6rem 2rem" }}> {/* ⬅️ increased padding */}
  <Container>
    <div className="text-center mb-5">
      <h2 className="fw-bold mb-3">Why Choose RideBuddy?</h2>
      <p className="text-muted">
        Experience the future of public transportation with our
        cutting-edge tracking technology.
      </p>
    </div>

    <Row className="g-5"> {/* ⬅️ increased spacing between columns */}
      <Col md={4}>
        <Card className="h-100 shadow-sm border-0 feature-card">
          <Card.Body className="text-center">
            <h3 className="mb-3">📍 Real-Time Tracking</h3>
            <p>
              Track buses live on an interactive map with precise GPS
              locations.
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 shadow-sm border-0 feature-card">
          <Card.Body className="text-center">
            <h3 className="mb-3">⏱️ Arrival Predictions</h3>
            <p>
              Get accurate arrival time estimates based on real traffic
              conditions.
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 shadow-sm border-0 feature-card">
          <Card.Body className="text-center">
            <h3 className="mb-3">🔎 Smart Search</h3>
            <p>
              Find bus stops, routes, and plan your journey effortlessly.
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>

      {/* CTA Section */}
      <section
        style={{
          background: "rgba(0, 51, 153,0.90)",
          padding: "5rem 2rem",
        }}
      >
        <Container className="text-center text-white">
          <h2 className="fw-bold mb-3">Ready to Transform Your Commute?</h2>
          <p className="lead mb-4">
            Join thousands of India commuters who never miss their bus anymore
          </p>
          <Button
            as={Link}
            to="/livemap"
            size="lg"
            variant="light"
            className="fw-semibold"
          >
            Start Tracking Now
          </Button>
        </Container>
      </section>
    </div>
  );
}
