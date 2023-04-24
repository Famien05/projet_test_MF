import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import TrainingCard from "./TrainingCard";
import { Button } from "react-bootstrap";

const MyTrainings = () => {
  const [trainings, setTrainings] = useState([]);

  const fetchTrainings = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const USER_ID = user.id;
    try {
      const response = await axios.get(`http://localhost:8000/newcomers/trainings/${USER_ID}`);
      setTrainings(response.data);
    } catch (error) {
      console.error("Error while fetching trainings:", error);
    }
  }, []);

  const timerRef = useRef(null);

  useEffect(() => {
    // Récupérer les formations au montage du composant
    fetchTrainings();

    // Nettoyer le timer lors du démontage du composant
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [fetchTrainings]);

  useEffect(() => {
    if (trainings.length > 0) {
      // Trouver l'heure de début de la prochaine formation
      const nextTrainingStartTime = trainings.reduce((minStartTime, training) => {
        const combinedStartDateTime = new Date(`${training.date}T${training.time}`);
        return combinedStartDateTime > new Date() && combinedStartDateTime < minStartTime
          ? combinedStartDateTime
          : minStartTime;
      }, new Date(8640000000000000)); // Maximum possible date

      // Calculer le temps restant avant le début de la prochaine formation
      const timeUntilNextTrainingStart = nextTrainingStartTime - new Date();

      // Démarrer un timer pour mettre à jour les formations une fois que la prochaine formation commence
      timerRef.current = setTimeout(fetchTrainings, timeUntilNextTrainingStart);
    }
  }, [fetchTrainings, trainings]);

  const shouldDisplayJoinButton = (date, startTime, endTime) => {
    const currentDate = new Date();
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    return currentDate >= startDateTime && currentDate <= endDateTime;
  };
  return (
    <div>
      <h2>Mes formations</h2>
      {trainings ? (
        trainings.map((training) => (
          <div key={training.id}>
            <TrainingCard training={training} onWithdraw={fetchTrainings} />
            {shouldDisplayJoinButton(training.date, training.time, training.end_time) && (
              <Button href={training.meeting_link} target="_blank">
                Rejoindre la réunion
              </Button>
            )}
          </div>
        ))
      ) : (
        <p>Loading trainings...</p>
      )}
    </div>
  );
};

export default MyTrainings;
