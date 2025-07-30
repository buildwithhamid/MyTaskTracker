import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  userId: string | null;
  username: string | null;
  email: string | null;
  setUserId: (id: string) => void;
  setUsername: (name: string) => void;
  setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  username: null,
  email: null,
  setUserId: () => {},
  setUsername: () => {},
  setEmail: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserIdState] = useState<string | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);
  const [email, setEmailState] = useState<string | null>(null);

  // Read from localStorage on mount
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedId) setUserIdState(storedId);
    if (storedUsername) setUsernameState(storedUsername);
    if (storedEmail) setEmailState(storedEmail);
  }, []);

  // Setters + localStorage
  const setUserId = (id: string) => {
    setUserIdState(id);
    localStorage.setItem("userId", id);
  };

  const setUsername = (name: string) => {
    setUsernameState(name);
    localStorage.setItem("username", name);
  };

  const setEmail = (email: string) => {
    setEmailState(email);
    localStorage.setItem("email", email);
  };

  return (
    <AuthContext.Provider
      value={{ userId, username, email, setUserId, setUsername, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
