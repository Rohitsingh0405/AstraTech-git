import Image from "next/image";
import Todo from "./_components/Todo";

interface Todo {
  id:number,
  todo:string,
  type:"Completed"|"Current"
}

export default function Home() {
  const todos : Todo[]= [
    {
      id:1,
    todo:"Dance at 7:30",
    type:"Current"
    },
    {
      id:2,
    todo:"Go to Class",
    type:"Current"
    },{
      id:3,
    todo:"Dance at 7:30",
    type:"Completed"
    }
  ]
  return (
    <div className="flex flex-col items-center">
        {/* heading */}
        <h1 className="text-[40px]">MY TODO APP</h1>
       <div className="bg-black rounded-lg p-4 mb-4 w-full h-[500px] overflow-auto">
          <h2>
            Current Todo
          </h2>
          {
          todos.map((todo,i)=>{
            if(todo.type == "Current"){

              return(
                <>
                <Todo todo={todo.todo} type="Current"/>
                </>
              )
            }
          })
        }
        </div>
    <div>
      {
          todos.map((todo,i)=>{
            if(todo.type == "Completed"){

              return(
                <>
                <Todo todo={todo.todo} type={todo.type}/>
                </>
              )
            }
          })
        }
      </div>
        
        
      </div>
    );
}
