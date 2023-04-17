import React, { useState, useEffect } from 'react';

const MyOfferedTrainings = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    // Simulez une requête API pour récupérer les formations proposées par l'utilisateur connecté
    const fetchTrainings = async () => {
      const offeredTrainings = [
        { id: 1, title: 'Formation proposée 1', description: 'Description 1', date: '2023-04-18', time: '14:00' },
        { id: 2, title: 'Formation proposée 2', description: 'Description 2', date: '2023-04-20', time: '10:00' },
      ];
      setTrainings(offeredTrainings);
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
