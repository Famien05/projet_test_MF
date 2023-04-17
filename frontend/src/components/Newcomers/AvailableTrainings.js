import React, { useState, useEffect } from 'react';

const AvailableTrainings = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    // Simulez une requête API pour récupérer les formations disponibles
    const fetchTrainings = async () => {
      const availableTrainings = [
        { id: 1, title: 'Formation 1' },
        { id: 2, title: 'Formation 2' },
        { id: 3, title: 'Formation 3' },
      ];
      setTrainings(availableTrainings);
    };
    fetchTrainings();
  }, []);

  return (
    <div>
      <h2>Formations disponibles</h2>
      <ul>
        {trainings.map((training) => (
          <li key={training.id}>{training.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableTrainings;
