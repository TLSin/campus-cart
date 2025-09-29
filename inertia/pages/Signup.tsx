import React, { useState } from "react"


export default function Signup() {
    // state for password show/hide
    const [show, setShow] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    // state for campus & program dropdown
    const [campus, setCampus] = useState<string>("")
    const campuses = ["Angono", "Antipolo", "Binangonan", "Cainta(Main)", "Cogeo", "San Mateo", "Sumulong", "Taytay"]

    // program
    const [program, setProgram] = useState<string>("")
    const programs = ["Computer Studies", "Arts & Sciences", "Accounting", "Education", "Engineering", "Tourism", "Health Sciences", "Criminology"]

    return (
        <>
            <head title="Signup" />

            {/*Whole screen*/}
            <div className="bg-[#DEC2CB] h-screen w-screen absolute justify-center items-center">
                {/*Signup-card*/}
                <div className="w-[45rem] h-[50rem] rounded-3xl shadow-xl shadow-black/50 bg-[#92A8D1] overflow-hidden left-[10rem] top-[3rem] absolute">
                    <h1 className="text-6xl font-semibold text-[#FFFFFF] font-Poppins text-center mb-6 mt-[4rem]">Sign Up</h1>

                    {/*firstName & lastName*/}

                    <div className="flex space-x-20 px-[2rem] mt-[3rem] w-full h-[5rem]">

                        {/*first name*/}
                        <div className="w-1/2">
                            <h1 className="text-[#FFFFFF] text-lg font-poppins ">First Name</h1>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                className="border border-2 h-[3rem] w-full focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 " />
                        </div>

                        {/*last name*/}
                        <div className="w-1/2">
                            <h1 className="text-[#FFFFFF] text-lg font-poppins ">Last Name</h1>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                className="border border-2 h-[3rem] w-full focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 " />
                        </div>
                    </div>


                    {/* email */}
                    <div className="px-[2rem] mt-[1.5rem] w-full h-[5rem]">
                        <h1 className="text-[#FFFFFF] text-lg font-poppins ">Email Address</h1>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="border border-2 h-[3rem] w-[41rem] focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 " />
                    </div>

                    {/* password */}
                    <div className=" mt-[1.5rem] w-full h-[5rem]">
                        <h1 className="text-[#FFFFFF] text-lg font-poppins ml-[2rem] ">Password</h1>
                        <div className="flex">
                            <input
                                type={show ? "text" : "password"}
                                value={value}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="border border-2 h-[3rem] w-[41rem] focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 ml-[2rem]" />
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

                    {/* Student's info */}
                    <div className="flex space-x-2 px-[2rem] mt-[1rem] w-full h-[5rem]">
                        {/* Student number */}
                        <div className="w-1/2">
                            <h1 className="text-[#FFFFFF] text-lg font-poppins ">Student Number</h1>
                            <input
                                type="text"
                                placeholder="Enter student number"
                                className="border border-2 h-[3rem] w-[15rem] focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 " />
                        </div>

                        {/* campus */}
                        <div className="w-1/2">
                            <h1 className="text-[#FFFFFF] text-lg font-poppins ">Campus</h1>
                            <div>
                                <select
                                    value={campus}
                                    onChange={(e) => setCampus(e.target.value)}
                                    className=" text-[#FFFFFF] text-lg font-poppins h-[3rem] w-full focus:outline-none rounded-xl px-3 border border-2 bg-[#92A8D1]"
                                >
                                    {/* Placeholder (disabled so user can’t re-select it after picking) */}
                                    <option value="" disabled >
                                        {campus ? "Select --" : "Select --"}
                                    </option>

                                    {campuses.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* program */}
                        <div className="w-1/2">
                            <h1 className="text-[#FFFFFF] text-lg font-poppins ">Program</h1>
                            <div>
                                <select
                                    value={program}
                                    onChange={(e) => setProgram(e.target.value)}
                                    className=" text-[#FFFFFF] text-lg font-poppins h-[3rem] w-full focus:outline-none rounded-xl px-3 border border-2 bg-[#92A8D1]"
                                >
                                    {/* Placeholder (disabled so user can’t re-select it after picking) */}
                                    <option value="" disabled >
                                        {program ? "Select --" : "Select --"}
                                    </option>

                                    {programs.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/*signup button*/}
                        <div className="w-full justify-center items-center flex mt-[2rem]">
                            <button className=" bg-[#92A8D1] h-[5rem] w-[18rem] rounded-xl text-[#FFFFFF] text-2xl font-bold font-poppins hover:bg-[#A7C7E7] mt-5 shadow-lg shadow-black/30">
                                <a href="#">Sign Up</a>
                            </button>
                        </div>
                    {/* already have an account */}
                    <div>
                        <div className="flex justify-center items-center mt-1">
                            <h1 className="text-[#FFFFFF] text-sm">Already have an account?</h1>
                            <a href="Login" className="ml-2 text-[#FFFFFF] text-sm font-bold hover:underline">Login</a>
                        </div>
                    </div>
                </div>









            </div>
        </>
    )
}