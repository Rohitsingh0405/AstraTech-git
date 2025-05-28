"use client"
import Image from "next/image";
import TODO from "./_components/TODO";
import { todo } from "node:test";
import { useState } from "react";
import LikhnekaJagahmodel from "./_components/LikhnekaJagahmodel";
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
  const[showModel,setShowModel] = useState<boolean>(true)
const addTodo = ()=>{
    console.log("Add new todo")
}
return <div >
     {showModel &&<LikhnekaJagahmodel showModel={showModel} setShowModel={setShowModel}></LikhnekaJagahmodel>}
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
              return <div>
                <div className="flex flex-row ">
                  
                <del className="text-amber-500 ">
                  <TODO todo={todo} setTodo={setTodo} />
                  </del>
                </div>
                </div>
            }
          })
        }
      </div>
      <div className="text-center text-gray-50 absolute-bottom left-1/2 rounded-xl bg-amber-400 cursor-pointer " onClick={()=>{
      setShowModel(!showModel)
      
      }}>
      add todo 

      </div>
    </div>
}