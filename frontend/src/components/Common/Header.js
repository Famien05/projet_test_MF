import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(user !== null);
  }, []);

  const handleLoginLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const loggedInLinks = (
    <>
      <Link to="/newcomer/trainings" style={linkStyle}>Mes formations</Link> |{' '}
      <Link to="/newcomer/available" style={linkStyle}>Formations disponibles</Link> |{' '}
      <Link to="/veteran/trainings" style={linkStyle}>Formations proposées</Link> |{' '}
      <Link to="/veteran/add" style={linkStyle}>Ajouter une formation</Link> |{' '}
      <Link to="/" style={linkStyle} onClick={handleLoginLogout}>Se déconnecter</Link>
    </>
  );

  const loggedOutLinks = (
    <>
      <Link to="/login" style={linkStyle}>Se connecter</Link> |{' '}
      <Link to="/signup" style={linkStyle}>S'inscrire</Link>
    </>
  );

  return (
    <header style={headerStyle}>
      <div className="container">
        <img src={logo} alt="Logo" style={logoStyle} />
        <nav>
          {isLoggedIn ? loggedInLinks : loggedOutLinks}
        </nav>
      </div>
    </header>
  );
};

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
};

const logoStyle = {
  width: '80px',
  height: 'auto',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

export default Header;
