import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/NavBar";
import Home from "./pages/Home";
import RoutesPage from "./pages/Routes";
import LiveMap from "./pages/LiveMap"; 
import About from "./pages/About"; 
import TripPlanner from "./pages/TripPlanner"; 
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LiveUpdates from "./pages/LiveUpdates";
import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify'; // 1. IMPORT ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // 2. IMPORT the CSS for styling

function App() {
  const [buses, setBuses] = useState([]);

  // This hook will fetch the bus data and update it every 5 seconds
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch("https://ridebuddy-backend-ptno.onrender.com/api/buses");
        const data = await res.json();
        setBuses(data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };

    fetchBuses();
    const interval = setInterval(fetchBuses, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 3. ADD the ToastContainer here. It will handle all notifications. */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <AppNavbar activeBusCount={buses.length} />
      <main className="flex-grow-1">
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/livemap" element={<LiveMap buses={buses} />} />
            <Route path="/updates" element={<LiveUpdates />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/planner" element={<TripPlanner />} /> 
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Container>
      </main>
      <footer className="bg-dark text-white py-3 mt-auto">
        <Container className="text-center">
          <p className="mb-1">© {new Date().getFullYear()} RideBuddy</p>
          <p className="small mb-0">
            Made with ❤️ for smarter public transportation
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default App;