import { Container, Row, Col, Card, Image } from "react-bootstrap";

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-3">
        <Container>
          <h1 className="fw-bold mb-1">About Us</h1>
          <p className="">
            Learn more about our journey, vision, mission, and the technology powering RideBuddy.
          </p>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="fw-bold mb-3">Our Story</h2>
           <p>
                Public transport in small cities and tier-2 towns often lacks 
                real-time tracking, making daily commuting stressful and unreliable. 
                Commuters face unpredictable bus schedules, overcrowding, and wasted time, 
                leading many to depend on private vehicles. This increases both 
                traffic congestion and pollution. 
        </p>
        <p>
                Our project was born out of the need to solve this problem. 
                By leveraging GPS and modern web technologies, we aim to 
                create a reliable, easy-to-use platform that bridges the 
                gap between commuters and real-time transport information. 
                With this, we want to make public transport in smaller 
                cities smarter, more efficient, and truly commuter-friendly.
        </p>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 shadow border-0 bg-primary text-white">
                <Card.Body>
                  <h3 className="fw-bold mb-3">Our Vision</h3>
                  <p>
                    Our vision is to make public transport in small and 
                    tier-2 cities as reliable and efficient as in metros, 
                    by providing real-time tracking, estimated arrival times, 
                    and accessible digital platforms optimized even for 
                    low-bandwidth environments. We aspire to encourage 
                    commuters to prefer public transport over private 
                    vehicles, thus reducing congestion and pollution 
                    while promoting sustainable mobility.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow border-0 bg-primary text-white">
                <Card.Body>
                  <h3 className="fw-bold mb-3">Our Mission</h3>
                  <ul>
                    <li>Provide GPS-based real-time tracking for buses.</li>
                    <li>Display accurate estimated arrival times and route info.</li>
                    <li>Ensure accessibility with platforms optimized for smaller towns.</li>
                    <li>Support local transport authorities in modernizing systems.</li>
                    <li>Promote sustainable public transport usage and reduce pollution.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      

      {/* Technologies Used */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="fw-bold mb-4 text-center">Technologies We Use</h2>
          <Row className="justify-content-center align-items-center g-4">
            <Col xs={6} md={2} className="text-center">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height={60} />
            </Col>
            <Col xs={6} md={2} className="text-center">
              <Image src="https://nodejs.org/static/images/logo.svg" height={60} />
            </Col>
            <Col xs={6} md={2} className="text-center">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" height={60} />
            </Col>
            <Col xs={6} md={2} className="text-center">
              <Image src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo-shadow.png" height={60} />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-5 text-center">
        <Container>
          <Card className="p-4 shadow-sm border-0 bg-light">
            <h2 className="fw-bold">Questions?</h2>
            <p className="lead">Get in touch with us</p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@ridebuddy.com">info@ridebuddy.com</a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+918765432100">+91 87654 32100</a>
            </p>
          </Card>
        </Container>
      </section>
    </div>
  );
}
