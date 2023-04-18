import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainingCard = ({ training }) => {
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

  return (
    <div>
      <h3>{training.title}</h3>
      <p>{training.description}</p>
      <p>Date : {training.date}</p>
      <p>Heure : {training.time}</p>
      <p>Présenté par : {creatorName}</p>
    </div>
  );
};

export default TrainingCard;
