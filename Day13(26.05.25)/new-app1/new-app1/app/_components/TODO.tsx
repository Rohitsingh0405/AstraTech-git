import React from "react";
import { todoListType } from "../page";

function TODO(todo: any) {
  const {todoss } = todo;
  console.log(todoss)
  return (
    <div className="">
      <div className=" h-10 w-60 rounded-md bg-[#201f1f] flex flex-row items-center  ml-5">
        <div className="w-5 h-5 rounded-4xl border-2 border-white bg-tranparent ml-2 text-white">
          <div className="-mt-1 ">&#10003;</div>
        </div>

        <div className="text-white font-thin ml-2">
        
          <del>{todoss}</del>
        </div>
      </div>
    </div>
  );
}
export default TODO;
