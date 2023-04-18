import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import UserContext from '../../UserContext';

const Header = () => {
  const { user, setUser, userType, setUserType } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setUserType(storedUserType);
  }, [setUser, setUserType]);

  const handleLoginLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    setUser(null);
    setUserType(null);
  };

  const loggedInLinks = (
    <>
      {userType === 'newcomer' && (
        <>
          <Link to="/newcomer/trainings" style={linkStyle}>
            Mes formations
          </Link>{' '}
          |{' '}
          <Link to="/newcomer/available" style={linkStyle}>
            Formations disponibles
          </Link>{' '}
          |{' '}
        </>
      )}
      {userType === 'veteran' && (
        <>
          <Link to="/veteran/trainings" style={linkStyle}>
            Formations proposées
          </Link>{' '}
          |{' '}
          <Link to="/veteran/add" style={linkStyle}>
            Ajouter une formation
          </Link>{' '}
          |{' '}
        </>
      )}
      <Link to="/" style={linkStyle} onClick={handleLoginLogout}>
        Se déconnecter
      </Link>
    </>
  );

  const loggedOutLinks = (
    <>
      <Link to="/login" style={linkStyle}>
        Se connecter
      </Link>{' '}
      |{' '}
      <Link to="/signup" style={linkStyle}>
        S'inscrire
      </Link>
    </>
  );

  return (
      <header style={headerStyle}>
        <div className="container">
          <img src={logo} alt="Logo" style={logoStyle} />
          {user ? (
            <>
              <nav>{loggedInLinks}</nav>
              <span style={userNameStyle}>{user.firstName}</span>
            </>
          ) : (
            <div style={loggedOutContainerStyle}>
              <nav>{loggedOutLinks}</nav>
            </div>
          )}
          <span style={appNameStyle}>LearnIt</span> {/* Ajoutez cette ligne */}
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
const appNameStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '24px',
};

const logoStyle = {
  width: '80px',
  height: 'auto',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

const loggedOutContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const userNameStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#fff',
};

export default Header;
