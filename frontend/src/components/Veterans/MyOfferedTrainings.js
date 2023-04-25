import React, { useState, useEffect } from "react";
import axios from "axios";

const MyOfferedTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [editingTraining, setEditingTraining] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const creator_id = user.id;
        const response = await axios.get(`http://localhost:8000/veterans/trainings?creator_id=${creator_id}`);
        setTrainings(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrainings();
  }, []);

  const updateTraining = async (trainingId) => {
    if (editingTraining && editingTraining.id === trainingId) {
      try {
        await axios.put(`http://localhost:8000/veterans/update/${trainingId}`, editingTraining);
        setTrainings(trainings.map((training) => (training.id === trainingId ? editingTraining : training)));
        setEditingTraining(null);
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
              </form>
            ) : (
              <>
                <h3>{training.title}</h3>
                <p>{training.description}</p>
                <p>Date: {training.date}</p>
                <p>Heure: {training.time}</p>
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
