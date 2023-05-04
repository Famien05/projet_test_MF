import React, { useState } from 'react';
import axios from 'axios';

const TrainingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [meeting_link, setMeeting_link] = useState('');



  const isDateTimeValid = (selectedDate, startTime, endTime) => {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    const selectedStartDateTime = new Date(`${selectedDate}T${startTime}`);
    const selectedEndDateTime = new Date(`${selectedDate}T${endTime}`);
  
    // Si la date est supérieure à la date actuelle, n'importe quelle heure de début et de fin est valide
    // tant que l'heure de fin est supérieure à l'heure de début
    if (selectedDateObj > currentDate) {
      return selectedEndDateTime > selectedStartDateTime;
    }
  
    // Si la date est égale à la date actuelle, vérifiez que l'heure de début est supérieure
    // à l'heure actuelle et que l'heure de fin est supérieure à l'heure de début
    if (selectedDateObj.toDateString() === currentDate.toDateString()) {
      return (
        selectedStartDateTime > currentDate &&
        selectedEndDateTime > selectedStartDateTime
      );
    }

    // Si la date est inférieure à la date actuelle, la validation échoue
    return false;
  };


  

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (title && description && date && time && endTime && meeting_link) {
    if (!isDateTimeValid(date, time, endTime)) {
      alert(
        "Vérifiez que la date est supérieure ou égale à la date actuelle et que les heures de début et de fin sont valides."
      );
      return;
    }

    // Récupérer les informations de l'utilisateur connecté depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const creator_id = user.id;

    const training = { title, description, date, time, endTime, creator_id, meeting_link };
    await axios.post('http://localhost:8000/veterans/add', training);

    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setEndTime('');
    setMeeting_link('');
  }
};


  return (
    <div className="form-container">
      <h2>Ajouter une formation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titre de la formation :</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description :</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date :</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">Heure :</label>
          <input
            type="time"
            id="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="end_time" className="form-label">Heure de fin :</label>
          <input
            type="time"
            id="end_time"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="meeting_link" className="form-label">Lien de la réunion :</label>
          <input
            type="text"
            id="meeting_link"
            className="form-control"
            value={meeting_link}
            onChange={(e) => setMeeting_link(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
  );
};

export default TrainingForm;