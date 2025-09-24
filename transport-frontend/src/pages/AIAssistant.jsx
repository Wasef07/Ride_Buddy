import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge, Spinner, ListGroup } from "react-bootstrap";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import buses from '../data/buses';
import './AIAssistant.css';

// Initial message from the bot
const initialMessages = [
  { type: "bot", content: "Hi! I'm your AI bus assistant. Ask me about any route, like 'Tell me about route 101'." },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [ "Details for route 102", "Tell me about route 301", "Info on bus 402" ];

  const handleSendMessage = () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { type: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const routeNumberMatch = userMessage.match(/\d+/);
      let botResponse = "I'm sorry, I couldn't find that route. Please ask for a route by its number, like 'route 101'.";

      if (routeNumberMatch) {
        const routeNumber = routeNumberMatch[0];
        const bus = buses.find(b => b.name.includes(routeNumber));
        
        if (bus) {
          botResponse = `Of course! ${bus.name} runs from ${bus.from} to ${bus.to}. Would you like to see its live location on the map?`;
        }
      }
      
      setMessages(prev => [...prev, { type: "bot", content: botResponse }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="ai-assistant-page">
      <div className="bg-primary text-white py-3">
        <Container>
          <h1 className="fw-bold">AI Journey Assistant</h1>
          <p>Get personalized route recommendations and real-time updates powered by AI</p>
        </Container>
      </div>

      <Container className="py-4">
        <Row>
          {/* Chat Interface */}
          <Col lg={8}>
            <Card className="shadow-sm h-100">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold"><FaRobot className="me-2 text-primary" />Smart Journey Planner</h5>
                <Badge bg="success">● Online</Badge>
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <div className="chat-messages-container">
                  {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.type}`}>
                      <div className="chat-bubble">{msg.content}</div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="chat-message bot">
                      <div className="chat-bubble typing-indicator">
                        <Spinner animation="grow" size="sm" />
                        <Spinner animation="grow" size="sm" style={{ animationDelay: '0.1s' }} />
                        <Spinner animation="grow" size="sm" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-auto">
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      placeholder="Ask me about routes, timings, fares..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button variant="primary" onClick={handleSendMessage}>
                      <FaPaperPlane />
                    </Button>
                  </div>
                  <div className="mt-3">
                    <small className="text-muted">Quick suggestions:</small>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {suggestions.map((suggestion, index) => (
                        <Button key={index} variant="outline-secondary" size="sm" onClick={() => setInput(suggestion)}>
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Features */}
          <Col lg={4}>
            <Card className="shadow-sm">
                <Card.Header>
                    <h5 className="mb-0 fw-bold">Features</h5>
                </Card.Header>
              {/* 2. FIX: This ListGroup will now work correctly */}
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Smart Route Planning:</strong> Get optimized routes based on real-time traffic.</ListGroup.Item>
                <ListGroup.Item><strong>Real-time Updates:</strong> Stay informed about delays and route changes.</ListGroup.Item>
                <ListGroup.Item><strong>Instant Responses:</strong> Get answers to your queries in natural language.</ListGroup.Item>
                <ListGroup.Item><strong>Location Aware:</strong> Contextual suggestions based on your location.</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};