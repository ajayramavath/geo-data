import React, { useState, useEffect } from "react";
import axios from "axios";
import api from '../api/api'
import { useNavigate,Link } from "react-router-dom";
import del from '../icons/delete.png';

 const Post = (props) => {

    //console.log(props)


   const handleDelete = async () => {
     const config = {
       withCredentials: true,
     }
      try {
        const response = await api.delete('/deletepost/'+String(props.data.Id),config)
      } catch (err) {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(err)
        }
      }
   }

  return (
    <article className="p-2 pl-5 text-left border-t-2 border-b-2 hover:bg-gray-400">
      {/* <Link to={`/map/${props.data.Id}`}> */}
      <h3 className="font-bold">
        {props.data.title}
      </h3>
      <p>
        {props.data.filename}
      </p>
      <div className="w-4">
      <a href="" onClick={handleDelete} ><img className="h-[18px] mt-3 " onClick={handleDelete} src={del} alt="/delete"></img></a>
      
      </div>
      {/* </Link> */}
    </article>
  )
}

export default Post
