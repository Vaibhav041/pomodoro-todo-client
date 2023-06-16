"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SortIcon from "@mui/icons-material/Sort";
import { RadioGroup, Radio } from "react-radio-group";
import { useState } from "react";
import TodoCard from "@/components/TodoCard";
import EditIcon from '@mui/icons-material/Edit';
import CreateModal from "@/components/CreateModal";
import { useEffect } from "react";
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";
import Link from "next/link";

const HomePage = () => {
  const {todos, setData} = useContext(TodoContext);
  const { user, error, isLoading } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("incomplete");
  const handleChange = (val) => {
    setSelectedValue(val);
  };
  console.log(user, todos, "data");
  useEffect(() => {
    setData();
  }, [])
  return (
    <>
      <div className="flex bg-blue-950 h-screen">
        <div className="sidebar hidden flex-1 sm:flex justify-center items-center sm:px-5 lg:px-0">
          <div className="flex flex-col items-start gap-5">
            <img src={user?.picture} className="h-20 w-20 rounded-full" />
            <p className="text-white text-xl font-semibold">{user?.name}</p>
            <div className="text-blue-300 cursor-pointer hover:text-blue-500">
              <PersonIcon /> &nbsp; Profile
            </div>
            <Link href={'/analytics'} className="text-blue-300 cursor-pointer hover:text-blue-500">
              <AccessTimeIcon /> &nbsp; Analytics
            </Link>
          </div>
        </div>
        <div className="main flex-[4] bg-blue-300 rounded-xl sm:m-2 p-2 sm:p-10">
          <div className="flex justify-between">
            <h1 className="text-2xl text-blue-950 font-semibold mb-10">
              What's up, {user?.name.split(" ")[0]}!
            </h1>
            <div className="flex gap-2">
              <button onClick={() => setShowModal(true)} className="bg-blue-950 text-white h-10 px-3 rounded-full"><span className="hidden sm:inline"><EditIcon/></span> Create</button>
              <Link href={'/analytics'} className="bg-red-500 sm:hidden text-white h-10 px-3 rounded-full py-2">Analytics</Link>
              <Link href={'/api/auth/logout'} className="bg-red-500 text-white h-10 px-3 rounded-full py-2">Logout</Link>
            </div>
          </div>
          <div className="flex justify-between">
            <SortIcon />
            <RadioGroup
              name="fruit"
              selectedValue={selectedValue}
              onChange={handleChange}
              style={{ display: "flex", gap: "15px" }}
            >
              <div>
                <Radio value="incomplete" />
                Incomplete
              </div>
              <div>
                <Radio value="priority" />
                Priority
              </div>
              <div>
                <Radio value="due" />
                Due
              </div>
              <div>
                <Radio value="completed" />
                Completed
              </div>
            </RadioGroup>
          </div>
          <hr style={{ border: "1px solid black", marginBottom:"20px" }} />
          <div className="overflow-y-auto h-[70vh]">
          {selectedValue === "incomplete" && (
            <div className="flex justify-between flex-wrap">
              {todos?.map((todo, index) => {
                if (todo.status === 'incomplete') {
                    return <TodoCard todo={todo} key={index}/>;
                }
              })}
            </div>
          )}
          {selectedValue === "priority" && (
            <div className="flex justify-between flex-wrap">
              {todos?.map((todo, index) => {
                if (todo.priority === true) {
                    return <TodoCard todo={todo} key={index}/>;
                }
              })}
            </div>
          )}
          {selectedValue === "due" && (
            <div className="flex justify-between flex-wrap">
              {todos?.sort((a, b) => {
                return a.due.split('/').reverse().join('') > b.due.split('/').reverse().join('') ? 1 : a.due.split('/').reverse().join('') < b.due.split('/').reverse().join('') ? -1 : 0;
              }).map((todo, index) => {
                if (todo.status !== 'completed') {
                  return <TodoCard todo={todo} key={index}/>;
                }
              })}
            </div>
          )}
          {selectedValue === "completed" && (
            <div className="flex justify-between flex-wrap">
              {todos?.map((todo, index) => {
                if (todo.status === 'completed') {
                    return <TodoCard todo={todo} key={index}/>;
                }
              })}
            </div>
          )}
          </div>
        </div>
      </div>
      {showModal && <CreateModal setShowModal={setShowModal}/>}
    </>
  );
};

export default HomePage;
