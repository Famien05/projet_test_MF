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
    <div>
      <h1>Sign Up</h1>
      <form      onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="service">Service:</label>
        <input
          type="text"
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <label htmlFor="position">Position:</label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <label htmlFor="isVeteran">Ancien:</label>
        <input
          type="checkbox"
          id="isVeteran"
          checked={isVeteran}
          onChange={(e) => setIsVeteran(e.target.checked)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
