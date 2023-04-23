import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainingCard from './TrainingCard';
import { Button } from 'react-bootstrap';

const MyTrainings = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
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

  const shouldDisplayJoinButton = (meetingDate, meetingTimeStr, durationInHours = 1) => {
    const now = new Date();
  
    const combinedDateTime = `${meetingDate}T${meetingTimeStr}`;
    const meetingDateTime = new Date(combinedDateTime);
    const meetingEndTime = new Date(meetingDateTime);
    meetingEndTime.setHours(meetingEndTime.getHours() + durationInHours);
  
    //console.log("Now:", now);
    //console.log("Meeting Date and Time:", meetingDateTime);
    //console.log("Meeting End Time:", meetingEndTime);
  
    return now >= meetingDateTime && now <= meetingEndTime;
  };

    
  
  

  return (
    <div>
      <h2>Mes formations</h2>
      {trainings ? (
        trainings.map((training) => (
          <div key={training.id}>
            <TrainingCard training={training} onWithdraw={refreshTrainings} />
            {shouldDisplayJoinButton(training.date, training.time) && (
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
