import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import TrainingCard from "./TrainingCard";
import { Button } from "react-bootstrap";

const MyTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [nextTrainingStartTime, setNextTrainingStartTime] = useState(null);
  const [nextTrainingEndTime, setNextTrainingEndTime] = useState(null);

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
    const timer = timerRef.current;
    fetchTrainings();
  
    return () => {
      clearTimeout(timer);
    };
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
