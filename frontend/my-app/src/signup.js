import React, { useState } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "normal",
  });

  const navigate = useNavigate();

  const fadeIn = useSpring({
    opacity: showForm ? 1 : 0,
    transform: showForm ? "translateY(0)" : "translateY(-20px)",
  });

  const handleInputChange = (e) => {
    // console.log("Event:", e); // Add this line to check if the event is triggered
    // console.log("Form Data Before:", formData); // Add this line to check the form data before the update
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [e.target.name]: e.target.value };
      //console.log("Form Data After:", updatedFormData); // Add this line to check the form data after the update
      return updatedFormData;
    });
  };
  
  

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
  
      // Assuming you have a state variable for the user's role
      const userRole = "normal"; // Set a default role or get it from state
  
      // Update the form data with the user's role
      const updatedFormData = { ...formData, role: userRole };
  
      // Make the API request with the updated form data
      const response = await axios.post(
        "http://localhost:5000/signup",
        updatedFormData
      );
  
      if (response && response.data) {
        console.log("API Response Data:", response.data);
        // Redirect to the login page after a successful signup
        navigate("/login");
      } else {
        console.error("API Response or Data is undefined");
      }
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
      // Handle errors...
      // For example, update state to display an error message to the user.
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heading}>Join Our Community</h1>
        <p style={styles.subHeading}>Unlock a world of possibilities!</p>
      </div>
      <animated.div style={{ ...fadeIn, ...styles.formContainer }}>
        <form style={styles.form} onSubmit={handleSignup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            style={styles.input}
            onChange={handleInputChange}
          />
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            style={styles.input}
            onChange={handleInputChange}
          />
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            style={styles.input}
            onChange={handleInputChange}
          />
          <label style={styles.label}>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            style={styles.input}
          >
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" style={styles.submitButton}>
            Sign Up
          </button>
        </form>
      </animated.div>
      <button onClick={handleButtonClick} style={styles.toggleButton}>
        {showForm ? "Go Back" : "Join Now"}
      </button>
    </div>
  );
};

// The rest of your styles...

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "black",
  },
  hero: {
    padding: "50px 0",
    backgroundColor: "rgb(36, 115, 90)",
    color: "white",
  },
  heading: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "18px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  formContainer: {
    marginTop: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "18px",
    margin: "10px 0",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "5px 0 15px 0",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  submitButton: {
    backgroundColor: "#008CBA",
    color: "white",
    padding: "15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  toggleButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    marginTop: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default SignupForm;
