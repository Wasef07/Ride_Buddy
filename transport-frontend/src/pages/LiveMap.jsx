import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup, Spinner, Badge } from "react-bootstrap";
import { FaSearch, FaSyncAlt, FaBusAlt, FaMapMarkerAlt } from "react-icons/fa";
import MapView from "../components/MapView";
import stopsData from "../data/stops"; 

export default function LiveMap() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [etas, setEtas] = useState({});
  const [stops, setStops] = useState([]);
  const [selectedStartStop, setSelectedStartStop] = useState(null);
  const [selectedEndStop, setSelectedEndStop] = useState(null);
  const [searchStartTerm, setSearchStartTerm] = useState("");
  const [searchEndTerm, setSearchEndTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [followBus, setFollowBus] = useState(true);

  // Load stops from local dataset
  useEffect(() => {
    setStops(stopsData);
    setLastUpdated(new Date());
  }, []);

  // Filter stops
  const filteredStartStops = stops.filter((stop) =>
    stop.name.toLowerCase().includes(searchStartTerm.toLowerCase())
  );
  const filteredEndStops = stops.filter((stop) =>
    stop.name.toLowerCase().includes(searchEndTerm.toLowerCase())
  );

  // Filter buses based on start & end
  const filteredBuses = buses.filter((bus) => {
    if (!selectedStartStop || !selectedEndStop) return true;
    const hasStart = bus.route.some(
      (point) =>
        point[0] === selectedStartStop.lat && point[1] === selectedStartStop.lon
    );
    const hasEnd = bus.route.some(
      (point) =>
        point[0] === selectedEndStop.lat && point[1] === selectedEndStop.lon
    );
    return hasStart && hasEnd;
  });

  // Helper function to render ETA properly
  const renderETA = (busId) => {
    const etaData = etas[busId];
    if (!selectedEndStop) {
      return "Select destination";
    }
    if (!etaData) {
      return "Calculating...";
    }
    
    // Handle the ETA data properly
    const { eta, status } = etaData;
    if (typeof eta === 'number') {
      return `${eta} min (${status})`;
    } else if (eta === "Error") {
      return "ETA unavailable";
    } else {
      return `${eta} min (${status})`;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-primary text-white py-3">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-1">Live Bus Tracking</h2>
              <p>Track buses in real-time across India</p>
            </div>
            <div className="text-end">
              <Badge bg="success" className="me-2">
                <span className="me-1">●</span> Live Updates
              </Badge>
              <small className="d-block">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </small>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Layout */}
      <Container fluid className="p-3" style={{ height: "calc(100vh - 110px)" }}>
        <Row className="h-100">
          {/* Sidebar */}
          <Col md={3} className="h-100 overflow-auto pe-3">
            {/* Search Card */}
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <h5 className="fw-semibold mb-3">
                  <FaSearch className="me-2 text-primary" />
                  Find Stops
                </h5>
                <Form.Group className="mb-3">
                  <Form.Label>Start Stop</Form.Label>
                  <Form.Control
                    type="text"
                    value={searchStartTerm}
                    onChange={(e) => setSearchStartTerm(e.target.value)}
                    placeholder="Enter start stop..."
                  />
                  {searchStartTerm && (
                    <ListGroup className="mt-2">
                      {filteredStartStops.map((stop) => (
                        <ListGroup.Item
                          key={stop.id}
                          action
                          onClick={() => {
                            setSelectedStartStop(stop);
                            setSearchStartTerm(stop.name); 
                          }}
                        >
                          🟢 {stop.name}
                        </ListGroup.Item>
                      ))}
                      {filteredStartStops.length === 0 && (
                        <ListGroup.Item>No stops found</ListGroup.Item>
                      )}
                    </ListGroup>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Destination Stop</Form.Label>
                  <Form.Control
                    type="text"
                    value={searchEndTerm}
                    onChange={(e) => setSearchEndTerm(e.target.value)}
                    placeholder="Enter destination stop..."
                  />
                  {searchEndTerm && (
                    <ListGroup className="mt-2">
                      {filteredEndStops.map((stop) => (
                        <ListGroup.Item
                          key={stop.id}
                          action
                          onClick={() => {
                            setSelectedEndStop(stop);
                            setSearchEndTerm(stop.name); 
                          }}
                        >
                          🔴 {stop.name}
                        </ListGroup.Item>
                      ))}
                      {filteredEndStops.length === 0 && (
                        <ListGroup.Item>No stops found</ListGroup.Item>
                      )}
                    </ListGroup>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Active Buses */}
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="fw-semibold mb-3">
                  <FaBusAlt className="me-2 text-primary" />
                  Active Buses
                </h5>
                {loading ? (
                  <div className="text-center">
                    <Spinner animation="border" size="sm" className="me-2" />
                    Loading...
                  </div>
                ) : filteredBuses.length === 0 ? (
                  <p className="text-muted">No buses available for this route.</p>
                ) : (
                  <ListGroup>
                    {filteredBuses.map((bus) => (
                      <ListGroup.Item
                        key={bus.id}
                        action
                        onClick={() => {
                          setSelectedBus(bus);
                          setFollowBus(true);
                        }}
                      >
                        <strong>{bus.name}</strong>
                        <br />
                        <FaMapMarkerAlt className="text-danger me-1" />
                        Lat: {bus.lat.toFixed(4)}, Lon: {bus.lon.toFixed(4)}
                        <br />
                        ETA: {renderETA(bus.id)}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}

                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => window.location.reload()}
                  >
                    <FaSyncAlt className="me-2" />
                    Refresh
                  </Button>
                  <Button
                    variant={followBus ? "success" : "outline-secondary"}
                    size="sm"
                    onClick={() => setFollowBus(!followBus)}
                  >
                    {followBus ? "Following Bus" : "Free Mode"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Map */}
          <Col md={9} className="h-100">
            <Card className="h-100 shadow-sm">
              <Card.Body className="p-0">
                <MapView
                  onBusUpdate={setBuses}
                  selectedBus={selectedBus}
                  selectedStartStop={selectedStartStop}
                  selectedEndStop={selectedEndStop}
                  etas={etas}
                  setEtas={setEtas}
                  buses={filteredBuses}
                  followBus={followBus}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}