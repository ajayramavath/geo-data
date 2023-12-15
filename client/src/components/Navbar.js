import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const logOut = () => {
        axios
            .post(
                `http://localhost:3000/api/logout`,
                {},
                {
                    withCredentials: true,
                }
            )
            .then(function (response) {
                // handle success
                setLoading(false);
                //   setMessage(response?.data?.message);
                localStorage.removeItem("user");
                localStorage.clear()
                navigate("/login");
            })
            .catch(function (error) {
                // handle error
                setLoading(false);
                //   setMessage(error?.response?.data?.message);
                //console.log(error?.response?.data?.message);
            })
            .then(function () {
                // always executed
            });
    };
    useEffect(() => {
        const User = localStorage.getItem("user");
        const parseUser = JSON.parse(User);
        setUserData(User);
    }, [userData]);
    return (
        <div className="bg-gray-950">
        <nav className="flex items-center justify-between flex-wrap max-w-[1240px] mx-auto px-4 bg-gray-950 p-6">
            <div className="flex items-center text-white mr-6">
                <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
                <a href="/" className="font-semibold text-xl text-[#00df9a]">
                    ELEMNT.
                </a>
            </div>
                <label className=" md:hidden cursor-pointer flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" for="menu-toggle" >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </label>
                <input className="hidden" type="checkbox" id="menu-toggle" />
            
            <div className=" hidden md:flex md:items-center md:w-auto" id="menu" >
                <div className="text-sm md:flex">
                    {userData && (
                    <a href="/" className=" mt-4 text-base md:mt-0 lg:inline-block text-teal-200 hover:text-white mr-4" >
                        Home
                    </a>
                    )}
                        {userData && (
                            <a href="/map" className=" mt-4 text-base lg:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
                                New Map
                            </a>
                        )}

                    {userData && (
                    <a href="/create" className=" mt-4 text-base lg:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
                        Import Map
                    </a>
                    )}

                    {userData && (
                    <a href="/userpage" className=" mt-4 text-base lg:inline-block md:mt-0 text-teal-200 hover:text-white mr-4" >
                            My Maps
                    </a>
                    )}
                    {userData && (
                        <a href="/locate" className=" mt-4 text-base lg:inline-block md:mt-0 text-teal-200 hover:text-white mr-4" >
                            Locate Me
                        </a>
                    )}
                    <div onClick={logOut} className=" mt-4 text-base lg:inline-block md:mt-0 text-teal-200 hover:text-white cursor-pointer" >
                        <a href="/login" className=" mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" >
                                {userData ? " Log Out" : "Login"}
                        </a>
                    </div>
                    {!userData && (
                        <a href="/register" className=" mt-4 text-base lg:inline-block md:mt-0 text-teal-200 hover:text-white mr-4" >
                                Register
                        </a>
                    )}
                </div>
            </div>
            
        </nav>
        </div>
    );
};
export default Navbar;