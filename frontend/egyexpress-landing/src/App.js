import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import AboutPage from "./AboutPage"; // Import the AboutPage component

const HomePage = () => (
  <div style={styles.container}>
    <h1>Welcome to the Home Page!</h1>
    <Link to="/about" style={styles.link}>About Us</Link> {/* Add link to the About page */}
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} /> {/* Route for the About page */}
      </Routes>
    </Router>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
  link: {
    padding: "10px 20px",
    backgroundColor: "#FBC02D", // Golden yellow background
    color: "#3E2723", // Dark brown text
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }
};

export default App;
