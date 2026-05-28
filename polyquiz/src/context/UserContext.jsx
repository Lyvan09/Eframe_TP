import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [pseudo, setPseudo]           = useState(null);
  const [meilleurScore, setMeilleurScore] = useState(0);

  const login = (nom) => setPseudo(nom);

  const sauvegarderScore = (score) => {
    if (score > meilleurScore) setMeilleurScore(score);
  };

  return (
    <UserContext.Provider value={{ pseudo, meilleurScore, login, sauvegarderScore }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}