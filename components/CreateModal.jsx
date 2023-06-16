"use client";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";

const CreateModal = ({ setShowModal }) => {
  const { setData} = useContext(TodoContext);
    const { user, error, isLoading } = useUser();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState();

  const handleClick = async() => {
    let res = await axios.post('https://pomodoro-server.onrender.com/todo/add', {
        title:title,
        desc:desc,
        due:due,
        userId:user?.sid,
        priority:priority
    })
    if (res.status === 200) {
        setData();
        setShowModal(false);
    }
  }

  return (
    <div className="w-[100%] h-[100%] absolute top-0 left-0 bg-[#000000a7] flex justify-center items-center">
      <div className="sm:w-[500px] w-full h-[500px] bg-blue-300 p-5 flex flex-col  relative rounded-md gap-5">
        <span
          className="absolute top-2 right-2 cursor-pointer text-blue-950"
          onClick={() => setShowModal(false)}
        >
          <CloseIcon />
        </span>
        <h1 className="text-3xl font-serif">Create Task</h1>
        <div className="flex flex-col gap-1">
          <label className="text-lg text-blue-950 font-medium">Title:</label>
          <input
            className="rounded-md focus:outline-none p-1"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-lg text-blue-950 font-medium">
            Description:
          </label>
          <input
            className="rounded-md focus:outline-none p-1"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-lg text-blue-950 font-medium">Due Date:</label>
          <input
            className="rounded-md focus:outline-none p-1"
            type="text"
            placeholder="DD/MM/YYYY"
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-lg text-blue-950 font-medium">
            On Priority:{" "}
          </label>
          <input
            type="checkbox"
            className="h-5 w-5"
            onChange={(e) => setPriority(e.target.checked)}
          />
        </div>
        <button className="bg-blue-950 text-white rounded-md p-1 font-semibold text-lg" onClick={handleClick}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateModal;