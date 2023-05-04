import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState('');
  const [position, setPosition] = useState('');
  const [isVeteran, setIsVeteran] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        service,
        position,
        is_veteran: isVeteran,
      });

      if (response.data) {
        // Redirect to the login page
        navigate('/login');
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
  return (
    <div className="form-container">
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name:</label>
        <input
          type="text"
          id="firstName"
          className="form-control"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name:</label>
        <input
          type="text"
          id="lastName"
          className="form-control"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="service" className="form-label">Service:</label>
        <input
          type="text"
          id="service"
          className="form-control"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="position" className="form-label">Position:</label>
        <input
          type="text"
          id="position"
          className="form-control"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          id="isVeteran"
          className="form-check-input"
          checked={isVeteran}
          onChange={(e) => setIsVeteran(e.target.checked)}
        />
        <label htmlFor="isVeteran" className="form-check-label">Ancien:</label>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  </div>
);
};

export default SignupForm;