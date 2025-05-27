import Image from "next/image";
import TODO from "./_components/TODO";

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
    isComplete:false,
  },
  {
    id:"3",
    todo:"See striver dsa ",
    isComplete:false,
  },
  {
    id:"4",
    todo:"Solve Dsa",
    isComplete:true,
  }
]

export default function Home() {
  return (
    todoList.map((todo)=>
    todo.isComplete === true ? <TODO/> : ""
      )
    )
}
