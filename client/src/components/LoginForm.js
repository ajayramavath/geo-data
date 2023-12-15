import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import api from '../api/api'

const Login = () => {
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {register,handleSubmit,formState: { errors },} = useForm();
    const onSubmit = async (data) => {
        setLoading(true);
        const body = {
            ...data,
        };
        const config = {
            withCredentials: true,
        }
            try {
                const response = await api.post('/login',{...body},config)
                setMessage(response?.data?.message);
                localStorage.setItem("user", JSON.stringify(response?.data?.user));

                navigate("/");
                navigate(0)
            } catch (err) {
                setLoading(false);
                
                if (err.response) {
                    setMessage(err?.response?.data?.message);
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                } else {
                    console.log(err)
                }
                
            }
    };
    return (
        <div className=" min-h-screen lg:min-h-screen bg-gray-950">
            <div className="flex justify-center py-10 ">
                <div className=" bg-gray-300 w-96 h-auto border border-black shadow-lg mt-24 shadow-gray-500 rounded-3xl">
                    <h1 className="text-center pt-8 text-[#0c2650] text-2xl font-bold">
                        Login
                    </h1>
                    {message && (
                        <div className="px-11 py-4">
                            <div className="font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-violet-200 p-4  text-center text-white ">
                                {message}
                            </div>
                        </div>
                    )}

                    <div className="pl-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="pt-4 text-sm font-medium">Email:</div>
                            <div className="relative text-gray-600 mt-1 focus-within:text-gray-400">
                                <input
                                    type="email"
                                    name="email"
                                    className="py-2 rounded-xl border-2 border-slate-400 text-sm pl-3 focus:outline-none w-10/12 focus:bg-white focus:text-gray-900"
                                    placeholder="Email"
                                    autoComplete="on"
                                    {...register("email", {
                                        required: true,
                                    })}
                                />
                                <div>
                                    {errors.email && errors.email.type === "required" && (
                                        <span
                                            role="alert"
                                            className="text-red-600 text-[10px] italic"
                                        >
                                            Email is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="pt-4 font-medium text-sm">Password:</div>
                            <div className="relative text-gray-600 mt-1 focus-within:text-gray-400">
                                <input
                                    type="password"
                                    name="password"
                                    className="py-2 border-2 border-slate-400 text-sm rounded-xl pl-3 focus:outline-none w-10/12 focus:bg-white focus:text-gray-900"
                                    placeholder="Password"
                                    autoComplete="on"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <div>
                                    {errors.password && errors.password.type === "required" && (
                                        <span
                                            role="alert"
                                            className="text-red-600 text-[10px] italic"
                                        >
                                            Password is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="py-10 px-6 mr-12">
                                <button
                                    className={`w-full ${loading ? "bg-gray-500" : "bg-[#00df9a] hover:bg-gray-400 "} text-black font-bold py-2 px-4 rounded-2xl`}
                                    disabled={loading ? true : false}
                                >
                                    {loading ? "Loading..." : "Login"}
                                </button>
                                <div className="text-center text-sm pt-1">
                                    Create an account? <Link class="text-red" to="/register">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;