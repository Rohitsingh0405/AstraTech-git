"use client"
import Image from "next/image";
import TODO from "./_components/TODO";
import { todo } from "node:test";

export interface todoListType {
  id:string,
  todo:string,
  isComplete:boolean,
} 

const todoList = [
  
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
let b ;
  return (
    todoList.map((todos,index)=>
    todos.isComplete === true ? <TODO todo={ todoList[index].todo}/> : ""
    
)

)
}