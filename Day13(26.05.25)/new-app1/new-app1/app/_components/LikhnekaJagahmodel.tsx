import React from "react";
export default function LikhnekaJagahmodel(props){
    return <div className="h-screen w-screen fixed top-0 left-0 z-20 bg-black/50 flex flex-col items-center justify-center">
        <div className="w-70 h-30 bg-white flex flex-col items-center justify-around">
            {/* <div className="underline text-black">Add Todo</div> */}
            <input type="text" placeholder="Enter your todo" className="w-full text-center border-2"/>
            <div className="cursor-pointer" >add</div>
            <div className=" cursor-pointer w-15 h-6 bg-blue-400 rounded-2xl flex justify-center " onClick={()=>{
                const b = props.showModel
                props.setShowModel(!b)
            }}>close</div>
        </div>
    
    </div>
}
