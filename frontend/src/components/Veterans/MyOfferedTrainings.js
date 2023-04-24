import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const MyOfferedTrainings = ({ onTrainingUpdate }) => {
  const [trainings, setTrainings] = useState([]);
  const [editingTraining, setEditingTraining] = useState(null);
  const [nextTrainingStartTime, setNextTrainingStartTime] = useState(null);
  const fetchTrainings = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const creator_id = user.id;
    try {
      const response = await axios.get(
        `http://localhost:8000/veterans/trainings?creator_id=${creator_id}`
      );
      setTrainings(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  useEffect(() => {
    if (trainings.length > 0) {
      const newNextTrainingStartTime = trainings.reduce(
        (minStartTime, training) => {
          const combinedStartDateTime = new Date(
            `${training.date}T${training.time}`
          );
          return combinedStartDateTime > new Date() &&
            combinedStartDateTime < minStartTime
            ? combinedStartDateTime
            : minStartTime;
        },
        new Date(8640000000000000)
      ); // Maximum possible date
      setNextTrainingStartTime(newNextTrainingStartTime);
    }
  }, [trainings]);

  useEffect(() => {
    let timer;
    if (nextTrainingStartTime) {
      const timeUntilNextTrainingStart =
        nextTrainingStartTime - new Date().getTime();
      timer = startTimer(timeUntilNextTrainingStart, fetchTrainings);
    }
    return () => {
      clearTimer(timer);
    };
  }, [nextTrainingStartTime, fetchTrainings]);
  

  const updateTraining = async (trainingId) => {
    if (editingTraining && editingTraining.id === trainingId) {
      try {
        await axios.put(`http://localhost:8000/veterans/update/${trainingId}`, editingTraining);
        setTrainings(trainings.map((training) => (training.id === trainingId ? editingTraining : training)));
        setEditingTraining(null);

        if (onTrainingUpdate) {
          onTrainingUpdate();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const training = trainings.find((t) => t.id === trainingId);
      setEditingTraining(training);
    }
  };

  const deleteTraining = async (trainingId) => {
    try {
      await axios.delete(`http://localhost:8000/veterans/delete/${trainingId}`);
      setTrainings(trainings.filter((training) => training.id !== trainingId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event, trainingId) => {
    const { name, value } = event.target;
    setEditingTraining((prev) => ({ ...prev, [name]: value }));
  };

  const shouldDisplayJoinButton = (date, startTime, endTime) => {
    const currentDate = new Date();
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    return currentDate >= startDateTime && currentDate <= endDateTime;
  };
  
  const startTimer = (timeUntilStart, callback) => {
    const timer = setTimeout(() => {
      callback();
    }, timeUntilStart);
    return timer;
  };
  
  const clearTimer = (timer) => {
    clearTimeout(timer);
  };
  return (
    <div>
      <h2>Formations proposées</h2>
      <ul>
        {trainings.map((training) => (
          <li key={training.id}>
            {editingTraining && editingTraining.id === training.id ? (
              <form>
                <label htmlFor={`title-${training.id}`}>Titre:</label>
                <input
                  id={`title-${training.id}`}
                  name="title"
                  value={editingTraining.title}
                  onChange={(e) => handleInputChange(e, training.id)}
                />
                <label htmlFor={`description-${training.id}`}>Description:</label>
                <textarea
                  id={`description-${training.id}`}
                  name="description"
                  value={editingTraining.description}
                  onChange={(e) => handleInputChange(e, training.id)}
                />
                <label htmlFor={`date-${training.id}`}>Date:</label>
                <input
                  id={`date-${training.id}`}
                  type="date"
                  name="date"
                  value={editingTraining.date}
                  onChange={(e) => handleInputChange(e, training.id)}
                />
                <label htmlFor={`time-${training.id}`}>Heure:</label>
                <input
                  id={`time-${training.id}`}
                  type="time"
                  name="time"
                  value={editingTraining.time}
                  onChange={(e) => handleInputChange(e, training.id)}
                />
                <label htmlFor={`end_time-${training.id}`}>Heure de fin:</label>
                <input
                  id={`end_time-${training.id}`}
                  type="time"
                  name="end_time"
                  value={editingTraining.end_time || ""}
                  onChange={(e) => handleInputChange(e, training.id)}
                />
              </form>
            ) : (
              <>
                <h3>{training.title}</h3>
                <p>{training.description}</p>
                <p>Date: {training.date}</p>
                <p>Heure: {training.time}</p>
                <p>Heure de fin: {training.end_time}</p>
                {shouldDisplayJoinButton(training.date, training.time, training.end_time) && (
                  <Button href={training.meeting_link} target="_blank">
                    Rejoindre la réunion
                  </Button>
                )}
              </>
            )}
            <button onClick={() => updateTraining(training.id)}>
              {editingTraining && editingTraining.id === training.id ? "Sauvegarder" : "Modifier"}
            </button>
            <button onClick={() => deleteTraining(training.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOfferedTrainings;

