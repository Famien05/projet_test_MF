// SignUpPage.js
import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [service, setService] = useState('');
  const [role, setRole] = useState('');
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      // Vous pouvez utiliser une alerte ou un message d'erreur personnalisé
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await signUp(email, password, firstName, lastName, service, role);
      navigate('/acronyms');
    } catch (error) {
      console.error('Failed to sign up:', error);
    }
  }

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Service</Form.Label>
          <Form.Control
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Fonction</Form.Label>
          <Form.Control
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
      <div>
        <p>
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage
