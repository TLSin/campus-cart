import React, { useState } from "react"
import { Head } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import Navigation from "./components/navBar"
import Footer from "./components/footer"

export default function Login() {

    const [show, setShow] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <>
            <Head title="Login" />

            {/*Login whole screen*/}
            <div className="bg-[#DEC2CB] h-full w-full">
                <Navigation />
                <div className="grid grid-cols-2 justify-items-right my-[2rem]">
                    <div className="col-span-1"></div>
                    {/*Login-card*/}
                    <div className="w-[45rem] h-[50rem] rounded-3xl inset-y-[3rem] right-[10rem]
                                shadow-xl shadow-black/50 bg-transparent overflow-hidden
                                backdrop-blur-md col-span-1 border-2 border-white/20">
                        <h1 className="text-6xl font-semibold text-[#FFFFFF] font-Poppins text-center mb-6 mt-[7rem]">Login</h1>
                        {/*Log-input*/}
                        <div className="absolute w-full h-full">
                            {/* email */}
                            <div className="px-[7rem] mt-[3rem] w-full h-[5rem]">
                                <h1 className="text-[#FFFFFF] text-lg font-poppins ">Email Address</h1>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="border border-2 h-[3rem] w-[31.8rem] focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 " />
                            </div>

                            {/* password */}
                            <div className=" px-[5rem] mt-[2rem] w-full h-[6rem]">
                                <h1 className="text-[#FFFFFF] text-lg font-poppins ml-[2rem] ">Password</h1>
                                <div className="flex">
                                    <input
                                        type={show ? "text" : "password"}
                                        value={value}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="border border-2 h-[3rem] w-[40rem] focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 ml-[2rem]" />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        className="-translate-x-10"
                                    >
                                        <img
                                            src={show ? "/eyeClosed.svg" : "/eyeOpen.svg"}
                                            alt={show ? "Hide" : "Show"}
                                            width={30}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/*rememberMe & forgotPassword*/}
                            <div className="flex px-[8rem] ">
                                {/*remember me*/}
                                <input
                                    type="checkbox"
                                    className="text-blue-600 rounded-sm " />
                                <label className="ml-1 text-[#FFFFFF] text-sm">Remember me</label>

                                {/*forgot password*/}
                                <a href="#" className="ml-[14.5rem] text-[#FFFFFF] hover:underline text-sm">Forgot password?</a>
                            </div>

                            {/*Login button*/}
                            <div className=" h-[5rem] w-full mt-[3rem] justify-center items-center flex ">
                                <button className=" bg-[#92A8D1] h-[5rem] w-[18rem] rounded-xl text-[#FFFFFF] text-2xl font-bold font-poppins hover:bg-[#A7C7E7] mt-5 shadow-lg shadow-black/30">
                                    <a href="#">Login</a>
                                </button>
                            </div>
                            {/*sign up*/}
                            <div className="flex justify-center items-center mt-[2rem]">
                                <h1 className="text-[#FFFFFF] text-sm">Don't have an account?</h1>
                                <Link href="/signUp" className="ml-2 text-[#FFFFFF] text-sm font-bold hover:underline">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>


        </>
    )
}