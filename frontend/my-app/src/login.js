import React, { useState } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const fadeIn = useSpring({
    opacity: showForm ? 1 : 0,
    transform: showForm ? 'translateY(0)' : 'translateY(-20px)',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const loginUser = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.response.data);
      throw error;
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const responseData = await loginUser(formData);
        console.log('API Response Data:', responseData);
  
        // Check the response for success
        if (responseData && responseData.success) {
            // Save the token to localStorage or a global state management solution
            localStorage.setItem('token', responseData.token);

            // Redirect based on user role
            if (responseData.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } else {
            console.error('Login failed:', responseData.message);
        }
    } catch (error) {
        console.error('Login failed:', error.message);
        // Handle errors...
    }
};

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Our Awesome App!</h1>
      <animated.div style={fadeIn}>
        <form style={styles.form} onSubmit={handleLogin}>
          <label style={styles.label}>Username:</label>
          <input type="text" name="email" placeholder='Enter your email' style={styles.input} onChange={handleInputChange} />
          <label style={styles.label}>Password:</label>
          <input type="password" name="password" placeholder='Password' style={styles.input} onChange={handleInputChange} />
          <button type="submit" style={styles.submitButton}>
            Log In
          </button>
        </form>
      </animated.div>
      <button onClick={handleButtonClick} style={styles.toggleButton}>
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: '18px',
    margin: '10px 0',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0 15px 0',
    fontSize: '16px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  toggleButton: {
    backgroundColor: '#008CBA',
    color: 'white',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
};

export default LoginPage;
