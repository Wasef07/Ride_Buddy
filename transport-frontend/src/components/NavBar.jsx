import React from "react";
import { Navbar as BSNavbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function AppNavbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/livemap", label: "Live Map" },
    { path: "/routes", label: "Routes" },
    { path: "/planner", label: "Trip Planner" },

  ];

  return (
    <BSNavbar
      expand="lg"
      bg="white"
      className="shadow-sm sticky-top border-bottom"
    >
      <Container>
        {/* Brand */}
        <BSNavbar.Brand as={Link} to="/" className="fw-bold text-primary">
          🚍 RideBuddy
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-navbar" />
        <BSNavbar.Collapse id="main-navbar">
          {/* Links */}
          <Nav className="mx-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                active={location.pathname === item.path}
                className="px-3 fw-semibold"
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <Button as={Link} to="/signin" variant="outline-primary" size="sm">
              Sign In
            </Button>
            <Button as={Link} to="/signup" variant="primary" size="sm">
              Sign Up
            </Button>
          </div>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
