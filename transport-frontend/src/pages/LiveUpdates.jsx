import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup, Spinner, Form, Button } from "react-bootstrap";
import { FaBroadcastTower, FaExclamationTriangle, FaRoute, FaClock, FaMapPin, FaUsers, FaPen, FaWater, FaCarCrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import './LiveUpdates.css'; 

// Realistic base data
const initialRealisticUpdates = [
  { id: 2, title: "Severe Delays on Salt Lake Routes", message: "Heavy rain and waterlogging are causing major traffic congestion in the Salt Lake area. Expect delays of over 45 minutes on all routes.", update_type: 'warning', priority: 3, city: { name: 'Kolkata' }, route: null, created_at: new Date(Date.now() - 25 * 60000).toISOString() },
  { id: 3, title: "Community Report: Route 102 Missing", message: "'Route 102 bus has not arrived for over 40 minutes at the Park Street stop.' - multiple users reporting.", update_type: 'info', priority: 2, city: { name: 'Kolkata' }, route: { route_number: '102' }, created_at: new Date(Date.now() - 55 * 60000).toISOString() },
  { id: 4, title: "Community Report: Waterlogging near Howrah Station", message: "Multiple users have reported deep water near Howrah Station approach roads. Authorities have been notified.", update_type: 'info', priority: 2, city: { name: 'Kolkata' }, route: null, created_at: new Date(Date.now() - 75 * 60000).toISOString() },
];

const newLiveUpdate = { 
  id: 1, 
  title: "CRITICAL ALERT: Heavy Traffic at Park Circus due to Waterlogging", 
  message: "Severe waterlogging has led to a major traffic jam at the Park Circus 7-point crossing. All bus services through this area are experiencing critical delays.", 
  update_type: 'alert', 
  priority: 4, 
  city: { name: 'Kolkata' }, 
  route: null, 
  created_at: new Date().toISOString()
};

export default function LiveUpdates() {
  const [liveUpdates, setLiveUpdates] = useState(initialRealisticUpdates);
  const [loading, setLoading] = useState(false);
  const [reportText, setReportText] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date()); // ADDED THIS MISSING STATE

  // This effect runs ONLY ONCE to simulate the live alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setLiveUpdates(prevUpdates => [newLiveUpdate, ...prevUpdates]);
    }, 10000); // 10-second delay

    const updateTimeInterval = setInterval(() => setLastUpdated(new Date()), 60000); // Updates the time every minute

    return () => {
        clearTimeout(timer);
        clearInterval(updateTimeInterval);
    }; 
  }, []);

  const handleReportSubmit = (e) => {
    e.preventDefault(); 
    if (!reportText.trim()) {
      toast.error("Please enter a report before submitting.");
      return;
    }
    setReportText(""); 
    toast.success("Thank you! Your report has been submitted."); 
  };

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  };

  const getUpdateIcon = (updateType) => {
    switch (updateType.toLowerCase()) {
      case 'alert': return <FaCarCrash className="text-danger" />;
      case 'warning': return <FaWater className="text-warning" />;
      case 'info': return <FaRoute className="text-info" />;
      default: return <FaClock className="text-success" />;
    }
  };
  
  const getPriorityBadge = (priority) => {
    if (priority >= 4) return <Badge bg="danger">Critical</Badge>;
    if (priority >= 3) return <Badge bg="warning" text="dark">Important</Badge>;
    return <Badge bg="info">Info</Badge>;
  };

  return (
    <div className="live-updates-page">
      {/* Header */}
      <div className="bg-primary text-white py-3">
        <Container>
          {/* CORRECTED HEADER SECTION */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-1">Live Updates & Alerts</h1>
              <p className="mb-0">Real-time alerts and service updates from the city network</p>
            </div>
            <div className="text-end">
              <Badge bg="danger" className="live-badge">
                <span className="live-dot-alert me-1">●</span> Live Updates
              </Badge>
              <small className="d-block mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </small>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-4">
        <Row>
          {/* Main Feed */}
          <Col lg={8}>
            <Card className="shadow-sm h-100">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold"><FaBroadcastTower className="me-2 text-primary" />Live Feed</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush" className="update-list-container">
                  {loading ? (
                    <div className="text-center p-5"><Spinner animation="border" /></div>
                  ) : (
                    liveUpdates.map(update => (
                      <ListGroup.Item key={update.id} className="update-item">
                        <div className="update-icon">{getUpdateIcon(update.update_type)}</div>
                        <div className="update-content">
                          <div className="d-flex justify-content-between align-items-start">
                            <h6 className="fw-bold mb-1 pe-2">{update.title}</h6>
                            {getPriorityBadge(update.priority)}
                          </div>
                          <p className="text-muted mb-2">{update.message}</p>
                          <div className="d-flex justify-content-between text-muted small">
                            <span><FaMapPin className="me-1" />{update.city?.name}{update.route ? ` • Route ${update.route.route_number}` : ''}</span>
                            <span><FaClock className="me-1" />{formatTimestamp(update.created_at)}</span>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Community Panel */}
          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0 fw-bold"><FaUsers className="me-2 text-primary"/>Community Panel</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-3">See an issue? Report it here to help fellow commuters.</p>
                <Form onSubmit={handleReportSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Example: 'Route 102 not coming for a long time...'"
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        <FaPen className="me-2"/>Submit Report
                    </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}