import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, ListGroup, Spinner, Badge } from "react-bootstrap";
import { FaSearch, FaBusAlt, FaMapMarkerAlt, FaClock, FaRoute } from "react-icons/fa";
import MapView from "../components/MapView";
import stopsData from "../data/stops";
import './LiveMap.css';

export default function LiveMap() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [etas, setEtas] = useState({});
  const [stops, setStops] = useState([]);
  const [selectedStartStop, setSelectedStartStop] = useState(null);
  const [selectedEndStop, setSelectedEndStop] = useState(null);
  const [searchStartTerm, setSearchStartTerm] = useState("");
  const [searchEndTerm, setSearchEndTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [followBus, setFollowBus] = useState(true);

  useEffect(() => {
    setStops(stopsData);
    setTimeout(() => setLoading(false), 1500);
    const timer = setInterval(() => setLastUpdated(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredStartStops = searchStartTerm ? stops.filter(s => s.name.toLowerCase().includes(searchStartTerm.toLowerCase())) : [];
  const filteredEndStops = searchEndTerm ? stops.filter(s => s.name.toLowerCase().includes(searchEndTerm.toLowerCase())) : [];

  const filteredBuses = buses.filter(bus => {
    if (!selectedStartStop || !selectedEndStop) return true;
    const hasStart = bus.route.some(p => p[0] === selectedStartStop.lat && p[1] === selectedStartStop.lon);
    const hasEnd = bus.route.some(p => p[0] === selectedEndStop.lat && p[1] === selectedEndStop.lon);
    return hasStart && hasEnd;
  });

  const renderETA = (busId) => {
    const etaData = etas[busId];
    if (!selectedEndStop) return <span className="text-muted">Select destination</span>;
    if (!etaData) return <Spinner animation="border" size="sm" />;
    
    const { eta, status } = etaData;
    if (typeof eta === 'number') {
      return (
        <Badge pill bg={status === 'delayed' ? 'danger' : 'success'} className="eta-badge">
          <FaClock className="me-1" /> {eta} min
        </Badge>
      );
    }
    return <span className="text-warning">Unavailable</span>;
  };

  return (
    <div className="live-map-page">
      {/* New Header - matching your screenshot */}
      <div className="bg-primary text-white py-3">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-1">Live Bus Tracking</h1>
              <p className="mb-0 opacity-90">Track buses in real-time across India</p>
            </div>
            <div className="text-end">
              <Badge bg="success">
                <span className="me-1">●</span> Live Updates
              </Badge>
              <small className="d-block mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </small>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Layout */}
      <Container fluid className="p-lg-4 p-3 h-100">
        <Row className="h-100">
          {/* Sidebar */}
          <Col lg={4} xl={3} className="sidebar-col">
            <div className="sidebar-content">
              {/* Search Card */}
              <Card className="shadow-sm mb-3 border-0">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">
                    <FaRoute className="me-2 text-primary"/>
                    Find Stops
                  </h5>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Start Stop</Form.Label>
                    <div className="position-relative">
                      <FaMapMarkerAlt className="input-icon text-success" />
                      <Form.Control
                        type="text"
                        value={searchStartTerm}
                        onChange={(e) => setSearchStartTerm(e.target.value)}
                        placeholder="Enter start stop..."
                        className="ps-5"
                      />
                    </div>
                    {searchStartTerm && (
                      <ListGroup className="mt-2 search-results">
                        {filteredStartStops.map((stop) => (
                          <ListGroup.Item key={stop.id} action onClick={() => { setSelectedStartStop(stop); setSearchStartTerm(stop.name); }}>
                            {stop.name}
                          </ListGroup.Item>
                        ))}
                        {filteredStartStops.length === 0 && <ListGroup.Item disabled>No stops found</ListGroup.Item>}
                      </ListGroup>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Destination Stop</Form.Label>
                     <div className="position-relative">
                       <FaMapMarkerAlt className="input-icon text-danger" />
                      <Form.Control
                        type="text"
                        value={searchEndTerm}
                        onChange={(e) => setSearchEndTerm(e.target.value)}
                        placeholder="Enter destination stop..."
                        className="ps-5"
                      />
                    </div>
                    {searchEndTerm && (
                      <ListGroup className="mt-2 search-results">
                        {filteredEndStops.map((stop) => (
                          <ListGroup.Item key={stop.id} action onClick={() => { setSelectedEndStop(stop); setSearchEndTerm(stop.name); }}>
                            {stop.name}
                          </ListGroup.Item>
                        ))}
                        {filteredEndStops.length === 0 && <ListGroup.Item disabled>No stops found</ListGroup.Item>}
                      </ListGroup>
                    )}
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Active Buses */}
              <Card className="shadow-sm flex-grow-1 border-0">
                <Card.Body className="d-flex flex-column">
                  <h5 className="fw-semibold mb-3">
                    <FaBusAlt className="me-2 text-primary" />
                    Active Buses
                  </h5>
                  <div className="bus-list-container flex-grow-1">
                    {loading ? (
                      <div className="text-center p-5"><Spinner animation="border" /></div>
                    ) : filteredBuses.length === 0 ? (
                      <p className="text-muted text-center p-5">No buses found for this route.</p>
                    ) : (
                      <ListGroup variant="flush">
                        {filteredBuses.map((bus) => (
                          <ListGroup.Item key={bus.id} action onClick={() => { setSelectedBus(bus); setFollowBus(true); }} className="bus-list-item">
                            <div className="bus-info">
                              <strong className="bus-name">{bus.name}</strong>
                              <span className="bus-location">
                                Lat: {bus.lat.toFixed(4)}, Lon: {bus.lon.toFixed(4)}
                              </span>
                            </div>
                            <div className="bus-eta">
                              {renderETA(bus.id)}
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Map */}
          <Col lg={8} xl={9} className="map-col">
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}