import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenue sur notre plateforme de formations</h1>
      <p className="home-text">
        Ici, vous pourrez trouver des formations intéressantes et vous inscrire pour les rejoindre.
      </p>
      <p className="home-text">
        Si vous êtes déjà inscrit, veuillez vous connecter pour accéder à votre espace personnel.
      </p>
      <p className="home-text">
        Pour les vétérans, notre plateforme vous permet également de proposer et créer des formations.
      </p>
    </div>
  );
};

export default Home;
