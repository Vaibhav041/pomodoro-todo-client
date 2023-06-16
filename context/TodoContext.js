"use client";
import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { user, error, isLoading } = useUser();
  const [todos, setTodos] = useState([]);

  const setData = async() => {
    let data =await axios.get('https://pomodoro-server.onrender.com/todo/get');
    setTodos(data.data);
  };

  return (
    <TodoContext.Provider value={{ todos, setData }}>
      {children}
    </TodoContext.Provider>
  );
};
