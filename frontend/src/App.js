import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Common/Header';
import LoginForm from './components/Common/LoginForm';
import SignupForm from './components/Common/SignupForm';
import MyTrainings from './components/Newcomers/MyTrainings';
import AvailableTrainings from './components/Newcomers/AvailableTrainings';
import MyOfferedTrainings from './components/Veterans/MyOfferedTrainings';
import TrainingForm from './components/Veterans/TrainingForm';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/newcomer/trainings" element={<MyTrainings />} />
        <Route path="/newcomer/available" element={<AvailableTrainings />} />
        <Route path="/veteran/trainings" element={<MyOfferedTrainings />} />
        <Route path="/veteran/add" element={<TrainingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
