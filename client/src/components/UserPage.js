import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/api'
import Render from './Render'
import 'leaflet/dist/leaflet.css'
import Post from './Post'


const UserPage = () => {
    const [loading, setLoading] = useState()
    const [posts , setPosts] = useState([])
    const navigate = useNavigate();
    const [fileData , setFileData] = useState([]);

    useEffect(() => {
        const User = localStorage.getItem("user");
        if (!User) {
            navigate("/login");
        }
    }, []);
    useEffect(() => {
        setLoading(true)
        const fetchPosts = async () => {
            try{
                const response = await api.get('/uniquepost',{
                    withCredentials: true,
                });
                setPosts(response.data);
                setLoading(false)
            }catch (err){
                if(err.response){
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                }else{
                    console.log(err)
                }
            }
        }

        fetchPosts();
        //console.log(posts)
    },[]);

    const handlePost = async (props) => {
        //console.log(props)
        const config = {
            withCredentials: true,
        }
        try {
            const response = await api.get(props.url, config)
            //localStorage.setItem("file2" , JSON.stringify(response.data))
            setFileData(response.data)
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(err)
            }
        }
        //navigate(0)
        
    }
    const handleAdd = async () => {
        navigate('/create')
    }

    return (
       
       <main className="flex" >
            <div id='map' className="w-3/4">
                <Render data={fileData} />
            </div>
            <div className="w-1/4 border-l-2 border-b-2 h-[100vh] border-black overflow-auto">
                <div className="bg-gray-500 p-[1rem] text-center border-b-2 border-r-2 border-black">
                    <h2 className="font-bold text-xl">
                        My Files
                    </h2>
                </div>
                <div onClick={handleAdd} className=" bg-[#00df9a] hover:bg-gray-400 mx-4 my-2 rounded-2xl p-[1rem] text-center">
                    <h2 className="font-bold text-black">
                        Add File
                    </h2>
                </div>
                <div className="text-left">
                <ul>
                    {
                        posts.map(post => (
                            <li onClick={()=>handlePost(post)}> <Post  data={post} /></li>

                        ))
                    }
                </ul>
                </div>
            </div>     
            
        </main>
    );


    




};

export default UserPage;