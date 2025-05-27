"use client"
import Image from "next/image";
import TODO from "./_components/TODO";
import { todo } from "node:test";
import { useState } from "react";

export interface todoListType {
  id:string,
  todo:string,
  isComplete:boolean,
} 

const todoList:todoListType[] = [
  
  {
    id:"1",
    todo:"Complete Todo app",
    isComplete:true,
  },
  {
    id:"2",
    todo:"See Harkirat lecture",
    isComplete:true,
  },
  {
    id:"3",
    todo:"See striver dsa ",
    isComplete:true,
  },
  {
    id:"4",
    todo:"Solve Dsa",
    isComplete:true,
  }
]

export default function Home() {
 const [todo,setTodo] = useState<todoListType[]>(todoList);
    return <div>
      <div>
        {
          todo.map((todo:todoListType)=>{
            if(todo.isComplete){
              return <TODO todo={todo} setTodo={setTodo} />
            
              
            }
          })
        }
      </div>
      <div>
        {

          todo.map((todo:todoListType)=>{
            if(!todo.isComplete){
              return <div><del className="text-amber-400"><TODO todo={todo} setTodo={setTodo} /></del></div>
            }
          })
        }
      </div>
      <div className="text-center text-gray-50 absolute-bottom left-1/2 rounded-xl bg-amber-400  ">
      Add Text 

      </div>
    </div>
}