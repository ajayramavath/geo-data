import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from '../api/api'

const CreateBlog = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState();
    const [userID , setUserId] = useState()
    const navigate = useNavigate();
    const {register,handleSubmit,formState: { errors },} = useForm();
    
    useEffect(() => {
        const User = localStorage.getItem("user");
        if (!User) {
            navigate("/login");
        }
        else{
            const parseUser = JSON.parse(User);
            
            (() => {
                setUserId(parseUser.ID)
                setUserData(User)
            })()
        }
    }, []);
        
        


    const onSubmit = async (data) => {
        setLoading(true);
        const config = {
            headers: { "content-type": "multipart/form-data" },
            withCredentials: true,
        };
        const config2 ={
            withCredentials: true,
        }
        data.file = data.files[0]
        console.log(data.file)
        const fileName = data.file.name
        data.files = null
        try{
            const response = await api.post('/upload-file', data, config)
            const postBody = {
                "filename": response.data.name,
                "userid": String(userID),
                "url": response.data.url,
                "title": data.title
            }
            try {
                const resp = await api.post('/post', postBody, config2)
                setLoading(false)
                navigate('/userpage')
               
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                } else {
                    console.log(err)
                }
            }
        }catch(err){
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(err)
            }
        }
        navigate('/userpage')

    }
    return (

            <div className=" mt-28 bg-gray-950 max-w-screen-md mx-auto p-5 rounded-3xl">
                <div className="text-center mb-16">
                    <h3 className="text-3xl mt-11 sm:text-4xl leading-normal font-extrabold tracking-tight text-white">
                    Upload your <span className="text-[#00df9a]">File</span>
                    </h3>
                </div>

                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-300 text-sm font-bold mb-2" for="grid-first-name"> Title </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="text"
                                placeholder="title"
                                name="title"
                                autoComplete="off"
                                {...register("title", {
                                    required: true,
                                })}
                            />
                            {errors.title && errors.title.type === "required" && (
                                <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 items-center lg:items-start mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-300 text-sm font-bold mb-2" for="grid-first-name"> Upload GeoJSON/KML file </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                accept="application/JSON"
                                type="file"
                                name="file"
                                //onChange={handleFile}
                                {...register("files", {
                                    required: {
                                        value: true,
                                        message: "File is required.",
                                    },
                                })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="flex justify-between w-full px-3">
                            <button
                            className="shadow bg-[#00df9a] hover:bg-white focus:shadow-outline focus:outline-none text-black font-bold py-2 px-6 rounded"
                                type="submit"
                                disabled={loading ? true : false}
                            >
                                {loading ? "Loading..." : "Create Post"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
    );
};

export default CreateBlog;