import React, { useState } from "react";

export const DifficultyLevelContext = React.createContext(null);

export const DifficultyProvider = ({ children }) => {
  const [isEasy, setIsEasy] = useState(false);
  return <DifficultyLevelContext.Provider value={{ isEasy, setIsEasy }}>{children}</DifficultyLevelContext.Provider>;
};
