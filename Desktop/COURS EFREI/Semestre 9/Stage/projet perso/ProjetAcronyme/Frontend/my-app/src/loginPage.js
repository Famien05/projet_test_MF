import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LoginPage.css';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  }

  return (
    <div className="Login">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
      <div>
        <p>
            Vous n'avez pas de compte ? <Link to="/signup">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
