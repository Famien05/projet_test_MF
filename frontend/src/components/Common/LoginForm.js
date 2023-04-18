import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser, setUserType } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      if (response.data) {
        // Store user data in the global state and localStorage
        setUser(response.data);
        setUserType(response.data.is_veteran ? 'veteran' : 'newcomer');
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('userType', response.data.is_veteran ? 'veteran' : 'newcomer');
        

        // Redirect user to their dashboard (Newcomer or Veteran)
        if (response.data.is_veteran) {
          navigate('/veteran/trainings');
        } else {
          navigate('/newcomer/trainings');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
