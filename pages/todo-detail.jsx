"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const TodoDetail = () => {
  const router = useRouter();
  const { title, desc, due, tomatoes, _id, status } = router.query;
  const [btnState, setBtnState] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [key, setKey] = useState(0);

  const { setData } = useContext(TodoContext);
  const handleDelete = async () => {
    let data = await axios.delete(`https://pomodoro-server.onrender.com/todo/delete/${_id}`);
    if (data.status === 200) {
      setData();
    }
  };
  const handleCompleted = async () => {
    let data = await axios.put(`https://pomodoro-server.onrender.com/todo/update/${_id}`);
    if (data.status === 200) {
      setData();
    }
  };
  const handleBtn = async() => {
    if (btnState === false) {
      setBtnState(true);
    } else {
      setKey(prev => prev+1);
      setBtnState(false);
      let data = await axios.put(`https://pomodoro-server.onrender.com/todo/add-tomatoes/${_id}/${cnt}`);
      if (data.status === 200) {
        setData();
      }
      setCnt(0);
      console.log(cnt);
    }
  }
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div>{cnt % 4 ? "Short Break" : "Long Break"}</div>
    }
    return (
      <div className="timer">
        <div className="text-center">Remaining</div>
        <div className="text-center text-3xl">{remainingTime}</div>
        <div className="text-center">seconds</div>
      </div>
    );
  };
  return (
    <div className="bg-blue-950 h-screen w-full flex justify-center items-center">
      <div className="bg-blue-300 rounded-md flex gap-24 p-5 flex-col md:flex-row">
        <div className="flex flex-col">
          <h1 className="text-4xl text-white font-semibold font-mono text-center mb-5">
            {title}
          </h1>
          <p className="text-right text-blue-950 font-medium text-lg">
            Due: {due}
          </p>
          <p className="text-blue-950 font-medium text-lg mb-5">{desc}</p>
          <button
            disabled={status === "completed"}
            onClick={handleCompleted}
            className="bg-green-500 text-white rounded-lg mb-1 font-semibold disabled:cursor-not-allowed"
          >
            <DoneAllIcon /> Mark as completed{" "}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white rounded-lg font-semibold"
          >
            <DeleteIcon /> Delete{" "}
          </button>
          <div className="mt-5 flex gap-1">
            <img className="w-7 h-7" src="/tomato.png"/>
            <p className="text-lg font-semibold">{tomatoes}</p>
          </div>
        </div>
        <div>
          <CountdownCircleTimer
            key={key}
            isPlaying={btnState}
            duration={1500}
            colors="#A30000"
            onComplete={() => {
              // do your stuff here
              setCnt(prev => prev+1);
              return { shouldRepeat: true, delay: (cnt+1) % 4 ? 300 : 900 }; // repeat animation in 1.5 seconds
            }}
          >
            {renderTime}
          </CountdownCircleTimer>
          <button onClick={handleBtn} className=" bg-blue-950 text-white mx-auto w-full p-1 rounded-md mt-5 font-semibold text-lg">Start | Stop</button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
