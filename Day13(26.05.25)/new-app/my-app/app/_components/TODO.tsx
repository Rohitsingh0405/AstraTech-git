import React, { Dispatch, SetStateAction } from "react";
import { TodoListType } from "../page";
 
function TODO(
    {
    todo:{task,id,isComplete,time},
    setTodos,   
}:{todo:TodoListType;
    setTodos:Dispatch<SetStateAction<TodoListType[]>>

}){
    const Toggletodo = () =>{
        if( isComplete){
            setTodos((prevTodo)=>
                prevTodo.map((todo)=>
                    todo.id === id ? {...todo, isComplete:false} :todo
        )
            )

        }else{
            setTodos((prevTodo)=>
                prevTodo.map((todo)=>
                    todo.id === id ? {...todo, isComplete:true} :todo
                )
            )
        }
    }

    return (<div className="w-full text-xs py-3 px-2 rounded-md border-[1px]  flex gap-2 items-center  hover:bg-amber-200 cursor-pointer transition-all" id="{Id}" onClick={Toggletodo}>
        <div className="h-4 w-4 rounded-sm border-[.5px] "></div> 
        <p className="text-black">{ task}</p>
    </div>);
}
export default TODO