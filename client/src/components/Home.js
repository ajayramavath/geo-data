import React, { useEffect, useState,useRef } from "react";
import "./Home.css";
import animationData from "../animation/Animation - 1702325062062.json"
import Lottie from  'lottie-react'
import { useNavigate } from "react-router";
const Home = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate()



    useEffect(() => {
        const User = localStorage.getItem("user");
        const parseUser = JSON.parse(User);
        setUserData(parseUser);
    }, []);
    const earthRef = useRef()

    return (
        <>
            <div className="relative h-screen w-full flex items-center justify-center text-center bg-gray-950 bg-cover bg-center">
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-950 opacity-75"></div>

                <main className="px-4 sm:px-6 lg:px-8 z-10">
                    <div className="text-center">
                        <h2 className="text-4xl tracking-tight leading-10 font-bold sm:text-5xl text-white sm:leading-none md:text-6xl">
                            Create Your Map.
                        </h2>
                        <p className="mt-3 text-white sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5">
                            Create and Render your  <span className="text-[#00df9a]"> GEOJSON / KML </span> files
                        </p> 
                        <Lottie lottieRef={earthRef} style={{height:300}}  animationData={animationData} />
                        <div className="mt-5 sm:mt-8 flex justify-center">
                            <div className="mt-3 flex mb-3">
                               { !userData && ( <a
                                    href="/register"
                                    className=" flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-regular rounded-md text-gray-950 bg-[#00df9a] hover:bg-indigo-50 focus:outline-none shadow-2xl focus:shadow-outline-sky-300 focus:border-indigo-300 transition duration-150 ease-in-out md:py-2 md:px-15"
                                >
                                    Get Started
                                </a>
                                )}
                                {userData && ( 
                                 
                                        <a href="/map" className=" flex mr-5f items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-regular rounded-md text-gray-950 bg-white hover:bg-gray-300 focus:outline-none shadow-2xl focus:shadow-outline-sky-300 focus:border-indigo-300 transition duration-150 ease-in-out md:py-2 md:px-15">
                                        New Map
                                        </a>
                               
                                    
                                )}
                                {userData && (
                         
                                        <a href="/userpage" className=" flex ml-5 items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-regular rounded-md text-gray-950 bg-[#00df9a] hover:bg-indigo-50 focus:outline-none shadow-2xl focus:shadow-outline-sky-300 focus:border-indigo-300 transition duration-150 ease-in-out md:py-2 md:px-15">
                                            My Maps
                                        </a>

                                )}

                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* //<BlogPost />  Render map here*/}

            {/* <div className="pt-10 text-3xl font-medium text-center">
        {loading ? "The System is logging you out" : "Welcome Home"}{" "}
        <span className="font-bold">
          {userData?.first_name} {userData?.last_name}
        </span>
      </div> */}
        </>
    );
};

export default Home;
