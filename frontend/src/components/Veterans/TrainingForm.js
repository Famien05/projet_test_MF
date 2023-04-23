import React, { useState } from 'react';
import axios from 'axios';
const TrainingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [meeting_link, setMeeting_link] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && date && time && meeting_link) {
      // Récupérer les informations de l'utilisateur connecté depuis le localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const creator_id = user.id;

      const training = { title, description, date, time, creator_id, meeting_link };
      //  await axios.post('http://localhost:8000/veterans/add', training);
      await axios.post('http://localhost:8000/veterans/add', training);
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setMeeting_link('');


    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter une formation</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre de la formation :</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="date">Date :</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor="time">Heure :</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <label htmlFor="meeting_link">Lien de la réunion :</label>
        <input
          type="text"
          id="meeting_link"
          value={meeting_link}
          onChange={(e) => setMeeting_link(e.target.value)}
          required
        />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default TrainingForm;
