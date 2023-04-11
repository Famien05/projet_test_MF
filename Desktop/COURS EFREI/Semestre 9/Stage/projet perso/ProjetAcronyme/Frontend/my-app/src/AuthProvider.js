import React, { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState({});

  const login = async (email, password) => {
    // Vérifie si l'email et le mot de passe sont corrects
    if (users[email] && users[email] === password) {
      setIsAuthenticated(true);
    } else {
      throw new Error("Email or password is incorrect");
    }
  };

  const signUp = async (email, password) => {
    if (users[email]) {
      throw new Error("Email is already registered");
    }

    // Ajouter l'utilisateur au faux backend (cet objet en mémoire)
    setUsers((prevUsers) => {
      return { ...prevUsers, [email]: password };
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
