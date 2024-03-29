import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './styles/App.css';
import LoginPage from './second';
import SignupForm  from './third';
import './styles/nav.css';
import AdminDashboard from './components/admin-dashboard';
import UserDashboard from './components/user-dashboard';
import MovingDot from './components/mouse';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm  />} />
          <Route path="/admin-dashboard" element={<AdminDashboard  />} />
          <Route path="/user-dashboard" element={<UserDashboard  />} />
          <Route path="/MovingDot" element={<MovingDot />} />
          {/* <Route path="/login" element={<LoginPage  />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">SignUp</Link>
      </li>
    </ul>
  </nav>
);

const Home = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  return (
    <animated.div style={fadeIn} className="home-container">
      <div>
        <h2 className="heading">Welcome to the Stylish Home Page</h2>
        <p className="subHeading">
          Explore the amazing features of our app.
        </p>
      </div>
    </animated.div>
  );
};


export default App;
