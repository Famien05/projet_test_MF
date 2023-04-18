import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Common/Header';
import LoginForm from './components/Common/LoginForm';
import SignupForm from './components/Common/SignupForm';
import MyTrainings from './components/Newcomers/MyTrainings';
import AvailableTrainings from './components/Newcomers/AvailableTrainings';
import MyOfferedTrainings from './components/Veterans/MyOfferedTrainings';
import TrainingForm from './components/Veterans/TrainingForm';
import UserContext from './UserContext';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, userType, setUserType }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/newcomer/trainings" element={<MyTrainings />} />
          <Route path="/newcomer/available" element={<AvailableTrainings />} />
          <Route path="/veteran/trainings" element={<MyOfferedTrainings />} />
          <Route path="/veteran/add" element={<TrainingForm />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
