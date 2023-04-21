import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainingCard from './TrainingCard';

const MyTrainings = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const USER_ID = user.id;
      try {
        const response = await axios.get(`http://localhost:8000/newcomers/trainings/${USER_ID}`);
        console.log("Response received:", response); // Ajoutez ce log
        setTrainings(response.data);
      } catch (error) {
        console.error("Error while fetching trainings:", error); // Ajoutez ce log
      }
    };
    fetchTrainings();
  }, []);

  const refreshTrainings = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const USER_ID = user.id;
    try {
      const response = await axios.get(`http://localhost:8000/newcomers/trainings/${USER_ID}`);
      console.log("Response received:", response);
      setTrainings(response.data);
    } catch (error) {
      console.error("Error while fetching trainings:", error);
    }
  };
  return (
    <div>
      <h2>Mes formations</h2>
        {trainings ? (
        trainings.map((training) => (
          <TrainingCard key={training.id} training={training} onWithdraw={refreshTrainings} />
        ))
      ) : (
        <p>Loading trainings...</p>
      )}
    </div>
  );
};

export default MyTrainings;
