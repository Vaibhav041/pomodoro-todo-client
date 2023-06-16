import React from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import Link from 'next/link';
import axios from 'axios';
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";

const TodoCard = ({todo}) => {
  const {setData} = useContext(TodoContext);
  const handleDelete = async() => {
    let data = await axios.delete(`https://pomodoro-server.onrender.com/todo/delete/${todo._id}`);
    if (data.status === 200) {
      setData();
    }
  }
  const handleCompleted = async() => {
    let data = await axios.put(`https://pomodoro-server.onrender.com/todo/update/${todo._id}`);
    if (data.status === 200) {
      setData();
    }
  }
  return (
    <div className='bg-blue-700  p-2 w-60 h-36 rounded-lg flex flex-col justify-between my-2 mx-1'>
        <Link href={`/todo-detail?title=${todo.title}&desc=${todo.desc}&due=${todo.due}&tomatoes=${todo.tomatoes}&_id=${todo._id}&status=${todo.status}`}><h1 className='text-gray-200 text-3xl'>{todo.title}</h1></Link>
        <div className='flex justify-between'>
            <div>
                <span className='text-white'><AlarmIcon/></span>
                <span className='text-white'>{todo.due}</span>
            </div>
            <div className='flex gap-2'>
                <div className='text-red-400' onClick={handleDelete}><DeleteIcon/></div>
                <div className='text-green-400' onClick={handleCompleted}><DoneAllIcon/></div>
            </div>
        </div>
    </div>
  )
}

export default TodoCard