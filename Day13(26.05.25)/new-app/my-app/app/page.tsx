"use client"
import Image from "next/image";
import TODO from "./_components/TODO";
import { useState } from "react";

export interface TodoListType {
  id:string,
  task:string,
  time:string,
  isComplete:boolean
}

const todoList : TodoListType[]=[
  {
    id:'01',
    task:'Code at 6:00',
    time:"6:00 to 9:00",
    isComplete :true,
  },
  {
    id:"02",
    task:"code again at 9:00",
    time:"9:00 to 12:30",
    isComplete :false,
  },
  {
    id:"03",
    task:"Code again :)",
    time:"12:00 to 5:30",
    isComplete :true,
  }
]
export default function Home() {
  const [todo,setTodo] = useState<TodoListType[]>(todoList);
  return (
    <div className="bg-white p-10">
      <h1 className="text-2xl text-black font-bold p-2.5">MY Todo App</h1>
      <hr className="border-[0.7px]"/>
    <div className=""> 
      <div className="flex flex-col gap-2">
      {todo.map((todo: TodoListType)=>{
        if(todo.isComplete){
          return <TODO todo={todo} setTodos = {setTodo}/>
        }
      })}
      </div>
      <hr className="bg-blue-600 my-2" />
      <div className="flex flex-col gap-2 ">
         {todo.map((todo: TodoListType)=>{
        if(!todo.isComplete){
          return <TODO todo={todo} setTodos = {setTodo}/>
        }
      })}
    </div>

    </div>
    </div>

  );
}
