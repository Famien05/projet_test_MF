import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../../global.css";

const MyOfferedTrainings = ({ onTrainingUpdate }) => {
  const [trainings, setTrainings] = useState([]);
  const [editingTraining, setEditingTraining] = useState(null);
  const [nextTrainingStartTime, setNextTrainingStartTime] = useState(null);
  const [nextTrainingEndTime, setNextTrainingEndTime] = useState(null);
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
      const nextTraining = trainings.reduce(
        (next, training) => {
          const combinedStartDateTime = new Date(`${training.date}T${training.time}`);
          const combinedEndDateTime = new Date(`${training.date}T${training.end_time}`);
          const now = new Date();
          
          if (combinedStartDateTime > now && (!next.start || combinedStartDateTime < next.start)) {
            return { ...training, start: combinedStartDateTime, end: combinedEndDateTime };
          } else {
            return next;
          }
        },
        { start: null, end: null }
      );
      
      setNextTrainingStartTime(nextTraining.start);
      setNextTrainingEndTime(nextTraining.end);
    }
  }, [trainings]);

  useEffect(() => {
    let startTimerId;
    let endTimerId;
  
    if (nextTrainingStartTime) {
      const timeUntilNextTrainingStart =
        nextTrainingStartTime.getTime() - new Date().getTime();
      startTimerId = startTimer(timeUntilNextTrainingStart, fetchTrainings);
    }
  
    if (nextTrainingEndTime) {
      const timeUntilNextTrainingEnd =
        nextTrainingEndTime.getTime() - new Date().getTime();
      endTimerId = startTimer(timeUntilNextTrainingEnd, () => {
        fetchTrainings();
        setNextTrainingEndTime(null);
      });
    }
  
    return () => {
      clearTimer(startTimerId);
      clearTimer(endTimerId);
    };
  }, [nextTrainingStartTime, nextTrainingEndTime, fetchTrainings]);
  

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
      <div className="training-grid">
        {trainings.map((training) => (
          <div key={training.id} className="training-card">
            {editingTraining && editingTraining.id === training.id ? (
              <form onSubmit={(e) => handleInputChange(e, training.id)}>
                <label>
                  Titre:
                  <input
                    type="text"
                    value={editingTraining.title}
                    onChange={(e) =>
                      setEditingTraining({
                        ...editingTraining,
                        title: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    value={editingTraining.description}
                    onChange={(e) =>
                      setEditingTraining({
                        ...editingTraining,
                        description: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    value={editingTraining.date}
                    onChange={(e) =>
                      setEditingTraining({
                        ...editingTraining,
                        date: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Heure:
                  <input
                    type="time"
                    value={editingTraining.time}
                    onChange={(e) =>
                      setEditingTraining({
                        ...editingTraining,
                        time: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Heure de fin:
                  <input
                    type="time"
                    value={editingTraining.end_time}
                    onChange={(e) =>
                      setEditingTraining({
                        ...editingTraining,
                        end_time: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Lien de la réunion:
                  <input
                    type="url"
                    value={editingTraining.meeting_link}
                    onChange={(e) =>
                      setEditingTraining({
                        ...editingTraining,
                        meeting_link: e.target.value,
                      })
                    }
                  />
                </label>
                <button type="button" className="cancel-btn" onClick={() => setEditingTraining(null)}>
                  Annuler
                </button>
              </form>
            ) : (
              <>
                <h3>{training.title}</h3>
                <p>{training.description}</p>
                <p>Date: {training.date}</p>
                <p>Heure: {training.time}</p>
                <p>Heure de fin: {training.end_time}</p>
                {shouldDisplayJoinButton(training.date, training.time, training.end_time) && (
                  <Button className="join-btn" href={training.meeting_link} target="_blank">
                    Rejoindre la réunion
                  </Button>
                )}
              </>
            )}
            <div className={`button-container ${editingTraining && editingTraining.id === training.id ? "editing" : ""}`}>

            <button className="edit-btn" onClick={() => updateTraining(training.id)}>
              {editingTraining && editingTraining.id === training.id ? "Sauvegarder" : "Modifier"}
            </button>
            <button className="delete-btn" onClick={() => deleteTraining(training.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default MyOfferedTrainings;