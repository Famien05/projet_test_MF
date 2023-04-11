import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AcronymsPage from './AcronymsPage';
import LoginPage from './loginPage';
import SignUpPage from './SignUpPage';
import { AuthProvider } from './AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/acronyms" element={<AcronymsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
