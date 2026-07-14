import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { User } from "../types/user";

interface AuthContextType {
  user: User | null;

  login: (
    email: string,
    password: string
  ) => boolean;

  signup: (
    name: string,
    email: string,
    password: string
  ) => boolean;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

const USERS_KEY = "satiety-users";
const CURRENT_USER_KEY = "satiety-current-user";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
  const saved = localStorage.getItem(CURRENT_USER_KEY);

  return saved ? JSON.parse(saved) : null;
});

  function signup(
    name: string,
    email: string,
    password: string
  ) {
    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_KEY) ??
        "[]"
    );

    if (
      users.find(
        (user) => user.email === email
      )
    ) {
      return false;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(newUser)
    );

    setUser(newUser);

    return true;
  }

  function login(
    email: string,
    password: string
  ) {
    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_KEY) ??
        "[]"
    );

    const found = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!found) return false;

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(found)
    );

    setUser(found);

    return true;
  }

  function logout() {
    localStorage.removeItem(
      CURRENT_USER_KEY
    );

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}