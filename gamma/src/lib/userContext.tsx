import type React from "react";
import { createContext, useContext, useState } from "react";

export interface Order {
  items: Array<{ name: string; price: string; img: string; qty: number }>;
  total: number;
  date: string;
}

interface User {
  email: string;
  orders: Order[];
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => string | void;
  signup: (email: string, password: string) => string | void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

const LS_KEY = "gamma_users";
const SESSION_KEY = "gamma_session_user";

export function getUsersLS(): Record<string, { password: string; orders: Order[] }> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}") as Record<string, { password: string; orders: Order[] }>;
  } catch (e) {
    return {};
  }
}
function setUsersLS(users: Record<string, { password: string; orders: Order[] }>) {
  localStorage.setItem(LS_KEY, JSON.stringify(users));
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const sessionEmail = localStorage.getItem(SESSION_KEY);
    if (sessionEmail) {
      const users = getUsersLS();
      if (users[sessionEmail]) {
        return { email: sessionEmail, orders: users[sessionEmail].orders };
      }
    }
    return null;
  });

  function login(email: string, password: string) {
    const users = getUsersLS();
    const rec = users[email];
    if (!rec) return "Email not found. Please sign up first.";
    if (rec.password !== password) return "Incorrect password.";
    setUser({ email, orders: rec.orders });
    localStorage.setItem(SESSION_KEY, email);
  }
  function signup(email: string, password: string) {
    const users = getUsersLS();
    if (users[email]) return "Email already exists. Please sign in.";
    users[email] = { password, orders: [] };
    setUsersLS(users);
    setUser({ email, orders: [] });
    localStorage.setItem(SESSION_KEY, email);
  }
  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }
  function addOrder(order: Order) {
    setUser((prev) => {
      if (!prev) return prev;
      const email = prev.email;
      const users = getUsersLS();
      if (users[email]) {
        users[email].orders = [order, ...users[email].orders];
        setUsersLS(users);
        return { ...prev, orders: [order, ...prev.orders] };
      }
      return prev;
    });
  }

  return (
    <UserContext.Provider value={{ user, login, signup, logout, addOrder }}>
      {children}
    </UserContext.Provider>
  );
}
