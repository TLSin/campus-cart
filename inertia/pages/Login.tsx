import React, { useState } from "react"
import { Head, Link, router, usePage } from "@inertiajs/react"
import Footer from "./components/footer"

export default function Login() {

    const [show, setShow] = useState<boolean>(false)
    const [studentNo, SetStudentNo] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    // const [remeber, setRemember] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (studentNo && password) {
            router.post('/login', {
                studentNo: studentNo.toUpperCase().trim(),
                password: password.trim(),
            })
        }
    }

    return (
        <>
            <Head title="Login" />

            {/*Login whole screen*/}
            <div 
                className="relative h-[100dvh] w-screen overflow-hidden">
                <div className="grid grid-cols-2 justify-items-right">
                    <img 
                        src="/style1.png"
                        className="absolute h-auto w-[49rem] z-0 bottom-0 right-55 translate-y-[9.3rem]"
                        />
                    <div className="col-span-1">

                    </div>
                    {/*Login-card*/}
                    <div className="
                                w-[45dvw] h-[50dvw] rounded-xl inset-y-[3rem] right-[10rem]
                                shadow-lg shadow-black/30 bg-black/10 overflow-hidden
                                backdrop-blur-sm col-span-1 border-2 border-white/30 my-[7rem]
                                ">
                        <h1 className="text-5xl font-semibold text-[#FFFFFF] font-Poppins text-center mt-[4rem]">Login</h1>
                        {/*Log-input*/}
                        <form onSubmit={handleSubmit}>
                            <div>
                                {/* Student Number */}
                                <div className="mt-[2rem] w-full h-[5rem] ml-[2rem]">
                                    <h1 className="text-[#FFFFFF] text-lg font-poppins ">Student Number</h1>
                                    <input
                                        type="text"
                                        value={studentNo}
                                        onChange={e => SetStudentNo(e.target.value)}
                                        placeholder="Enter your Studen Number"
                                        className="
                                                    border border-2 h-[3rem] w-[90%] focus:outline-none rounded-md 
                                                    text-white text-lg placeholder:text-gray-500 px-2"
                                    />
                                </div>

                                {/* password */}
                                <div className="mt-[1rem] w-full h-[5rem]  ml-[2rem]">
                                    <h1 className="text-[#FFFFFF] text-lg font-poppins">Password</h1>
                                    <div className="flex">
                                        <input
                                            type={show ? "text" : "password"}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="
                                                        border border-2 h-[3rem] w-[90%] focus:outline-none rounded-md 
                                                        text-[#FFFFFF] text-lg placeholder:text-gray-500 px-2"
                                        />
                                        {/* Toggle Show/Hide Password */}
                                        <button
                                            type="button"
                                            onClick={() => setShow(!show)}
                                            className="-translate-x-5"
                                        >
                                            <img
                                                src={show ? "/eyeOpen.svg" : "/eyeClosed.svg"}
                                                width={30}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/*rememberMe & forgotPassword*/}
                                <div className="flex justify-between w-[100%] ml-[2rem]">
                                    {/*remember me*/}
                                    <div className="flex">
                                        <input
                                            type="checkbox"
                                            className="text-blue-600 rounded-sm " />
                                        <label className="text-[#FFFFFF] text-sm ml-[0.3rem]">Remember me</label>
                                    </div>

                                    {/*forgot password*/}
                                    <a className="text-[#FFFFFF] hover:underline text-sm mr-[3.5rem]">Forgot password?</a>
                                </div>

                                {/*Login button*/}
                                <div className=" h-[5rem] w-full mt-[3rem] justify-center items-center flex ">
                                    <button
                                        type="submit"
                                        className=" bg-[#92A8D1] h-[5rem] w-[18rem] rounded-xl text-[#FFFFFF] text-2xl font-bold font-poppins hover:bg-[#A7C7E7] mt-5 shadow-lg shadow-black/30">
                                        Login
                                    </button>
                                </div>
                                {/*sign up*/}
                                <div className="flex justify-center items-center mt-[2rem]">
                                    <h1 className="text-[#FFFFFF] text-sm">Don't have an account?</h1>
                                    <Link href="/signUp" className="ml-2 text-[#FFFFFF] text-sm font-bold hover:underline">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}