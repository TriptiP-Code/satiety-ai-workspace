import type { User } from "../types/user";

const USERS_KEY = "satiety-users";

const CURRENT_USER_KEY = "satiety-current-user";

export function getUsers(): User[] {
  const saved = localStorage.getItem(USERS_KEY);

  return saved ? JSON.parse(saved) : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

export function getCurrentUser(): User | null {
  const saved = localStorage.getItem(
    CURRENT_USER_KEY
  );

  return saved ? JSON.parse(saved) : null;
}

export function setCurrentUser(user: User) {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );
}

export function logout() {
  localStorage.removeItem(
    CURRENT_USER_KEY
  );
}