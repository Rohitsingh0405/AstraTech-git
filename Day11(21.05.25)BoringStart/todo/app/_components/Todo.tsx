import React from 'react'
import { text } from 'stream/consumers';
interface todoProps {
    todo:string ,
    type?:"Completed"|"Current";
}
function Todo({todo,type}:todoProps){
    return(
        <div className={`${type == "Current" && "text-white"}`}>{todo}</div>
    )
}
export default Todo
