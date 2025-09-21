import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  Tabs,
  Tab,
  Modal,
} from "react-bootstrap";
import { BiSearch, BiMap, BiTimeFive } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showStops, setShowStops] = useState(false);
  const [currentStops, setCurrentStops] = useState([]);
  const navigate = useNavigate();

  const routes = [
  // --- India City ---
  {
    id: "101",
    name: "Route 101",
    type: "AC",
    from: "Esplanade",
    to: "Salt Lake",
    distance: "11.5 km",
    duration: "35 min",
    frequency: "10-15 min",
    fare: "₹20-30",
    activeBuses: 6,
    stops: ["Esplanade", "Shyambazar", "Sealdah", "Salt Lake"],
    rating: 4.3,
    isPopular: true,
  },
  {
    id: "102",
    name: "Route 102",
    type: "Non-AC",
    from: "Park Street",
    to: "Jadavpur",
    distance: "13.0 km",
    duration: "40 min",
    frequency: "6-10 min",
    fare: "₹10-15",
    activeBuses: 9,
    stops: ["Park Street", "Gariahat", "Tollygunge", "Jadavpur"],
    rating: 3.9,
    isPopular: true,
  },
  {
    id: "103",
    name: "Route 103",
    type: "Non-AC",
    from: "Howrah",
    to: "Dharmatala",
    distance: "5.5 km",
    duration: "20 min",
    frequency: "4-8 min",
    fare: "₹8-12",
    activeBuses: 14,
    stops: ["Howrah Station", "Burrabazar", "Esplanade"],
    rating: 3.7,
    isPopular: true,
  },
  {
    id: "104",
    name: "Route 104",
    type: "AC",
    from: "Kalighat",
    to: "Shyambazar",
    distance: "10.0 km",
    duration: "30 min",
    frequency: "12-18 min",
    fare: "₹18-25",
    activeBuses: 5,
    stops: ["Kalighat", "Rashbehari", "Shyambazar"],
    rating: 4.0,
    isPopular: false,
  },
  {
    id: "105",
    name: "Route 105",
    type: "Non-AC",
    from: "Dum Dum",
    to: "Salt Lake",
    distance: "9.8 km",
    duration: "28 min",
    frequency: "8-12 min",
    fare: "₹10-15",
    activeBuses: 7,
    stops: ["Dum Dum", "Salt Lake"],
    rating: 3.8,
    isPopular: false,
  },

  // --- Siliguri ---
  {
    id: "201",
    name: "Route 201",
    type: "AC",
    from: "NJP",
    to: "Siliguri Junction",
    distance: "12.0 km",
    duration: "30 min",
    frequency: "15-20 min",
    fare: "₹25-35",
    activeBuses: 4,
    stops: ["NJP", "Siliguri Junction"],
    rating: 4.4,
    isPopular: true,
  },
  {
    id: "202",
    name: "Route 202",
    type: "Non-AC",
    from: "Siliguri",
    to: "Bagdogra",
    distance: "10.5 km",
    duration: "25 min",
    frequency: "7-12 min",
    fare: "₹12-18",
    activeBuses: 6,
    stops: ["Siliguri", "Bagdogra"],
    rating: 3.9,
    isPopular: false,
  },

  // --- Durgapur ---
  {
    id: "301",
    name: "Route 301",
    type: "Non-AC",
    from: "City Center",
    to: "Benachity",
    distance: "8.0 km",
    duration: "22 min",
    frequency: "6-10 min",
    fare: "₹10-15",
    activeBuses: 10,
    stops: ["City Center", "Benachity"],
    rating: 3.6,
    isPopular: false,
  },
  {
    id: "302",
    name: "Route 302",
    type: "AC",
    from: "Durgapur",
    to: "Andal",
    distance: "18.0 km",
    duration: "45 min",
    frequency: "15-20 min",
    fare: "₹20-30",
    activeBuses: 5,
    stops: ["Durgapur", "Andal"],
    rating: 4.2,
    isPopular: true,
  },

  // --- Asansol ---
  {
    id: "401",
    name: "Route 401",
    type: "Non-AC",
    from: "Asansol",
    to: "Raniganj",
    distance: "14.0 km",
    duration: "35 min",
    frequency: "10-15 min",
    fare: "₹12-18",
    activeBuses: 8,
    stops: ["Asansol", "Raniganj"],
    rating: 3.7,
    isPopular: false,
  },
  {
    id: "402",
    name: "Route 402",
    type: "AC",
    from: "Asansol",
    to: "Durgapur",
    distance: "32.0 km",
    duration: "60 min",
    frequency: "20-25 min",
    fare: "₹25-40",
    activeBuses: 3,
    stops: ["Asansol", "Durgapur"],
    rating: 4.1,
    isPopular: true,
  },

  // --- Malda ---
  {
    id: "501",
    name: "Route 501",
    type: "Non-AC",
    from: "Malda Town",
    to: "English Bazar",
    distance: "3.5 km",
    duration: "10 min",
    frequency: "5-8 min",
    fare: "₹5-10",
    activeBuses: 12,
    stops: ["Malda Town", "English Bazar"],
    rating: 3.5,
    isPopular: false,
  },

  // --- Kharagpur ---
  {
    id: "601",
    name: "Route 601",
    type: "AC",
    from: "Kharagpur Station",
    to: "IIT KGP",
    distance: "4.0 km",
    duration: "12 min",
    frequency: "8-12 min",
    fare: "₹10-15",
    activeBuses: 5,
    stops: ["Kharagpur Station", "IIT Kharagpur"],
    rating: 4.5,
    isPopular: true,
  },
  {
    id: "602",
    name: "Route 602",
    type: "Non-AC",
    from: "Kharagpur",
    to: "Midnapore",
    distance: "15.0 km",
    duration: "35 min",
    frequency: "10-15 min",
    fare: "₹12-20",
    activeBuses: 6,
    stops: ["Kharagpur", "Midnapore"],
    rating: 3.8,
    isPopular: false,
  },

  // --- Bardhaman ---
  {
    id: "701",
    name: "Route 701",
    type: "Non-AC",
    from: "Bardhaman",
    to: "Kalna",
    distance: "28.0 km",
    duration: "55 min",
    frequency: "15-20 min",
    fare: "₹15-25",
    activeBuses: 4,
    stops: ["Bardhaman", "Kalna"],
    rating: 3.9,
    isPopular: true,
  },

  // --- Haldia ---
  {
    id: "801",
    name: "Route 801",
    type: "AC",
    from: "Haldia",
    to: "Nandakumar",
    distance: "20.0 km",
    duration: "45 min",
    frequency: "18-25 min",
    fare: "₹20-30",
    activeBuses: 3,
    stops: ["Haldia", "Nandakumar"],
    rating: 4.0,
    isPopular: false,
  },
];
  const categories = [
    { id: "all", name: "All Routes", count: routes.length },
    { id: "ac", name: "AC Buses", count: routes.filter((r) => r.type === "AC").length },
    { id: "non-ac", name: "Non-AC", count: routes.filter((r) => r.type === "Non-AC").length },
    { id: "popular", name: "Popular", count: routes.filter((r) => r.isPopular).length },
  ];

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "ac" && route.type === "AC") ||
      (selectedCategory === "non-ac" && route.type === "Non-AC") ||
      (selectedCategory === "popular" && route.isPopular);

    return matchesSearch && matchesCategory;
  });

  const handleViewStops = (stops) => {
    setCurrentStops(stops);
    setShowStops(true);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white py-3">
        <Container>
          <h1 className="fw-bold">Bus Routes</h1>
          <p>Explore all bus routes across India with schedules and stops</p>
        </Container>
      </div>

      <Container className="py-5">
        {/* Search */}
        <Form className="mb-4">
          <div className="d-flex align-items-center position-relative">
            <BiSearch className="position-absolute ms-3 text-muted" size={20} />
            <Form.Control
              type="text"
              placeholder="Search routes, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-5 py-2 shadow-sm"
              style={{ maxWidth: "400px" }}
            />
          </div>
        </Form>

        {/* Category Tabs */}
        <Tabs
          activeKey={selectedCategory}
          onSelect={(k) => setSelectedCategory(k)}
          className="mb-4"
        >
          {categories.map((category) => (
            <Tab
              eventKey={category.id}
              title={`${category.name} (${category.count})`}
              key={category.id}
            />
          ))}
        </Tabs>

        {/* Routes */}
        <Row className="g-4">
          {filteredRoutes.map((route) => (
            <Col md={6} lg={4} key={route.id}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">
                        {route.name}{" "}
                        <Badge bg={route.type === "AC" ? "primary" : "secondary"}>
                          {route.type}
                        </Badge>
                        {route.isPopular && (
                          <Badge bg="warning" text="dark" className="ms-2">
                            <FaRegStar className="me-1" />
                            Popular
                          </Badge>
                        )}
                      </h5>
                      <div className="d-flex align-items-center text-muted small">
                        <FaRegStar className="me-1" /> {route.rating}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-primary">{route.fare}</div>
                      <small className="text-muted">Fare range</small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <BiMap className="me-2" />
                      <span className="fw-semibold">{route.from}</span>
                      <span className="mx-2 text-muted">→</span>
                      <span className="fw-semibold">{route.to}</span>
                    </div>
                    <div className="d-flex justify-content-between text-muted small">
                      <div className="d-flex align-items-center">
                        <BiTimeFive className="me-2" /> {route.duration}
                      </div>
                      <div className="d-flex align-items-center">
                        <HiUsers className="me-2" /> {route.frequency}
                      </div>
                    </div>
                  </div>

                  <Row className="text-center border-top pt-3 mb-3 small">
                    <Col>
                      <div className="fw-bold text-primary">{route.activeBuses}</div>
                      Active Buses
                    </Col>
                    <Col>
                      <div className="fw-bold text-primary">{route.stops.length}</div>
                      Stops
                    </Col>
                    <Col>
                      <div className="fw-bold text-primary">{route.distance}</div>
                      Distance
                    </Col>
                  </Row>

                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-grow-1"
                      onClick={() => navigate("/livemap")}
                    >
                      Track Live
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="flex-grow-1"
                      onClick={() => handleViewStops(route.stops)}
                    >
                      View Stops
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-5">
            <h4>No routes found</h4>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </Container>

      {/* Modal for Stops */}
      <Modal show={showStops} onHide={() => setShowStops(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bus Stops</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {currentStops.map((stop, i) => (
              <li key={i} className="list-group-item">
                {stop}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}
