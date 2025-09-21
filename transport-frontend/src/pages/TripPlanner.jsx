import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaExchangeAlt,
  FaClock,
  FaBus,
  FaStar,
  FaWalking,
} from "react-icons/fa";

const TripPlanner = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedTime, setSelectedTime] = useState("now");
  const [showResults, setShowResults] = useState(false);

  const sampleResults = [
    {
      id: "1",
      duration: "35 min",
      cost: "₹15",
      walks: "8 min",
      transfers: 0,
      preference: "fastest",
      steps: [
        { type: "walk", description: "Walk to Esplanade Bus Stand", duration: "3 min", distance: "250m" },
        { type: "bus", route: "AC-38", description: "Take AC-38 to Salt Lake Sector V", duration: "28 min", stops: 12, nextBus: "2 min" },
        { type: "walk", description: "Walk to destination", duration: "4 min", distance: "300m" },
      ],
    },
  ];

  const quickDestinations = [
    "Howrah Station",
    "Salt Lake Sector V",
    "Park Street",
    "Esplanade",
    "Garia Station",
    "Dakshineswar",
  ];

  const handlePlanTrip = () => {
    if (fromLocation && toLocation) {
      setShowResults(true);
    }
  };

  const swapLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white py-3">
        <Container>
          <h1 className="fw-bold">Trip Planner</h1>
          <p>Plan your journey across India with the best bus routes</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          {/* Form Section */}
          <Col lg={4}>
            <Card className="shadow-sm p-4 sticky-top">
              <h4 className="mb-4 fw-bold">Plan Your Trip</h4>

              <Form>
                {/* From Field */}
                <Form.Group className="mb-3 d-flex align-items-center">
                  <div className="flex-grow-1 position-relative">
                    <FaMapMarkerAlt
                      className="position-absolute text-success"
                      style={{
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <Form.Control
                      type="text"
                      placeholder="From"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="ps-5"
                    />
                  </div>
                  {/* Swap Button */}
                  <Button
                    variant="light"
                    className="ms-2 border rounded-circle"
                    onClick={swapLocations}
                  >
                    <FaExchangeAlt />
                  </Button>
                </Form.Group>

                {/* To Field */}
                <Form.Group className="mb-3 position-relative">
                  <FaMapMarkerAlt
                    className="position-absolute text-danger"
                    style={{
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="To"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="ps-5"
                  />
                </Form.Group>

                {/* Time Selector */}
                <Form.Group className="mb-4">
                  <Form.Label>When</Form.Label>
                  <Form.Select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="now">Leave now</option>
                    <option value="depart">Depart at specific time</option>
                    <option value="arrive">Arrive by specific time</option>
                  </Form.Select>
                </Form.Group>

                {/* Plan Trip Button */}
                <Button
                  onClick={handlePlanTrip}
                  className="w-100 fw-bold"
                  disabled={!fromLocation || !toLocation}
                >
                  <FaBus className="me-2" /> Plan Trip
                </Button>
              </Form>

              {/* Quick Destinations */}
              <div className="mt-4">
                <h6 className="fw-bold mb-2">Quick Destinations</h6>
                <div className="d-flex flex-wrap gap-2">
                  {quickDestinations.map((dest, i) => (
                    <Button
                      key={i}
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setToLocation(dest)}
                    >
                      {dest}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </Col>

          {/* Results Section */}
          <Col lg={8}>
            {!showResults ? (
              <div className="text-center text-muted py-5">
                <h4 className="fw-bold">Plan your perfect journey!</h4>
                <p>Enter your starting point and destination to explore routes</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-4">
                {sampleResults.map((result) => (
                  <Card key={result.id} className="shadow-sm p-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h5 className="mb-1 text-primary">{result.duration}</h5>
                        <small className="text-muted">
                          Cost: {result.cost} • Walk: {result.walks} •
                          Transfers: {result.transfers}
                        </small>
                      </div>
                      <Badge
                        bg={
                          result.preference === "fastest" ? "success" : "primary"
                        }
                      >
                        {result.preference === "fastest" ? (
                          <>
                            <FaClock className="me-1" /> Fastest
                          </>
                        ) : (
                          <>
                            <FaStar className="me-1" /> Cheapest
                          </>
                        )}
                      </Badge>
                    </div>

                    {/* Steps */}
                    <div className="d-flex flex-column gap-3">
                      {result.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="d-flex gap-3 align-items-start"
                        >
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white"
                            style={{
                              width: "36px",
                              height: "36px",
                              background:
                                step.type === "walk" ? "#6c757d" : "#0d6efd",
                            }}
                          >
                            {step.type === "walk" ? <FaWalking /> : <FaBus />}
                          </div>
                          <div>
                            <p className="fw-semibold mb-1">
                              {step.description}
                            </p>
                            <small className="text-muted">
                              {step.duration}
                              {step.distance && ` • ${step.distance}`}
                              {step.stops && ` • ${step.stops} stops`}
                              {step.nextBus && ` • Next bus: ${step.nextBus}`}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TripPlanner;
