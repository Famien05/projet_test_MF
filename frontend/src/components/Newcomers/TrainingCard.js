import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainingCard = ({ training, onWithdraw }) => {
  const [creatorName, setCreatorName] = useState('');

  useEffect(() => {
    const fetchCreatorName = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/newcomers/creators/${training.creator_id}`);
        setCreatorName(response.data.name);
      } catch (error) {
        console.error('Erreur lors de la récupération du nom du créateur', error);
      }
    };

    fetchCreatorName();
  }, [training.creator_id]);

  const handleWithdraw = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const USER_ID = user.id;
    try {
      const response = await axios.post(`http://localhost:8000/newcomers/withdraw/${training.id}?user_id=${USER_ID}`);
      console.log("Withdraw successful:", response);
      onWithdraw();  // Informe le composant parent que la liste des formations doit être mise à jour
    } catch (error) {
      console.error("Error while withdrawing:", error);
    }
  };

  return (
    <div>
      <h3>{training.title}</h3>
      <p>{training.description}</p>
      <p>Date : {training.date}</p>
      <p>Heure : {training.time}</p>
      <p>Présenté par : {creatorName}</p>
      <button className="withdraw-btn" onClick={handleWithdraw}>Se désinscrire</button>
    </div>
  );
};

export default TrainingCard;
