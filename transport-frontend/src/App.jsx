import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/NavBar";
import Home from "./pages/Home";
import RoutesPage from "./pages/Routes";
import LiveMap from "./pages/LiveMap"; 
import About from "./pages/About"; 
import TripPlanner from "./pages/TripPlanner"; 
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <AppNavbar />
      <main>
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/livemap" element={<LiveMap />} />
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
    </>
  );
}

export default App;
