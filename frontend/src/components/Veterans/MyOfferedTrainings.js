import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyOfferedTrainings = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const creator_id = user.id; // Récupérez l'ID de l'utilisateur connecté
        const response = await axios.get(`http://localhost:8000/veterans/trainings?creator_id=${creator_id}`);
        setTrainings(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrainings();
  }, []);

  return (
    <div>
      <h2>Formations proposées</h2>
      <ul>
        {trainings.map((training) => (
          <li key={training.id}>
            <h3>{training.title}</h3>
            <p>{training.description}</p>
            <p>Date: {training.date}</p>
            <p>Heure: {training.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOfferedTrainings;
