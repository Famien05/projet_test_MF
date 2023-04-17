import React, { useState } from 'react';

const TrainingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && date && time) {
      // Simulez une requête API pour ajouter une nouvelle formation
      console.log('Ajout de la formation :', { title, description, date, time });
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
    }
  };

  return (
    <div>
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
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default TrainingForm;
