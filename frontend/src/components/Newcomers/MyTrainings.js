import React, { useState, useEffect } from 'react';

const MyTrainings = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    // Simulez une requête API pour récupérer les formations de l'utilisateur connecté
    const fetchTrainings = async () => {
      const myTrainings = [
        { id: 1, title: 'Ma Formation 1' },
        { id: 2, title: 'Ma Formation 2' },
      ];
      setTrainings(myTrainings);
    };
    fetchTrainings();
  }, []);

  return (
    <div>
      <h2>Mes formations</h2>
      <ul>
        {trainings.map((training) => (
          <li key={training.id}>{training.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyTrainings;
