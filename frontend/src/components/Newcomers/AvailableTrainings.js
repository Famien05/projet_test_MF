import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableTrainings = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      const response = await axios.get('http://localhost:8000/newcomers/available');

      setTrainings(response.data);
    };
    fetchTrainings();
  }, []);

  const enrollTraining = async (trainingId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const USER_ID = user.id;
      await axios.post(`http://localhost:8000/newcomers/enroll/${trainingId}?user_id=${USER_ID}`);
      alert('Inscription réussie !');
    } catch (error) {
      alert('Erreur lors de l\'inscription à la formation');
      console.error(error);
    }
};


  return (
    <div>
      <h2>Formations disponibles</h2>
      <ul>
        {trainings.map((training) => (
          <li key={training.id}>
              <p>{training.title}</p>
              <p>{training.description}</p>
              <p>Date : {training.date}</p>
              <p>Heure : {training.time}</p>
            <button onClick={() => enrollTraining(training.id)}>S'inscrire</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableTrainings;
