import React, { useState } from "react"
import { Head, Link, router } from "@inertiajs/react"
import Footer from "./components/footer"

export default function Signup() {
    // state for password show/hide
    const [show, setShow] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [stNum, setStNum] = useState<string>('')
    const [campus, setCampus] = useState<string>('')
    const campuses = [
        { id: 1, name: "Angono" },
        { id: 2, name: "Antipolo" },
        { id: 3, name: "Binangonan" },
        { id: 4, name: "Cainta" },
        { id: 5, name: "Cogeo" },
        { id: 6, name: "San Mateo" },
        { id: 7, name: "Sumulong" },
        { id: 8, name: "Taytay" },
    ]
    const [program, setProgram] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (firstName && lastName && email && password && stNum && campus && program) {
            router.post('/signUp', {
                firstName: firstName.toUpperCase().trim(),
                lastName: lastName.toUpperCase().trim(),
                email: email.toLowerCase().trim(),
                password: password,
                stNum: stNum.toUpperCase().trim(),
                campus: campus.toUpperCase(),
                program: program,
            })
        }
    }

    return (
        <>
            <Head title="Signup" />
            {/*Whole screen*/}
            <div className="relative h-[100dvh] w-screen overflow-hidden">

                <div className="grid grid-cols-2 justify-items-center h-[100%]">
                    {/*Signup-card*/}
                    <div className="w-[70%] h-[80%] rounded-2xl 
                                    shadow-lg shadow-black/30 bg-black/10 overflow-hidden
                                    backdrop-blur-sm col-span-1 border-2 border-white/30 my-[7rem]">
                        <h1 className="text-5xl font-semibold text-[#FFFFFF] font-Poppins text-center mt-[4rem]">Sign Up</h1>
                        <form action="" onSubmit={handleSubmit}>
                            {/*firstName & lastName*/}
                            <div className="flex space-x-20 px-[2rem] mt-[3rem] w-full h-[5rem]">
                                {/*first name*/}
                                <div className="w-1/2">
                                    <h1 className="text-[#FFFFFF] text-lg font-poppins ">First Name</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        onChange={e => setFirstName(e.target.value)}
                                        value={firstName}
                                        className="border border-2 h-[3rem] w-full focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 " />
                                </div>
                                {/*last name*/}
                                <div className="w-1/2">
                                    <h1 className="text-[#FFFFFF] text-lg font-poppins ">Last Name</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        onChange={e => setLastName(e.target.value)}
                                        value={lastName}
                                        className="border border-2 h-[3rem] w-full focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 " />
                                </div>
                            </div>
                            {/* email */}
                            <div className="px-[2rem] mt-[1.5rem] w-full h-[5rem]">
                                <h1 className="text-[#FFFFFF] text-lg font-poppins ">Email Address</h1>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    className="border border-2 h-[3rem] w-[100%] focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 " />
                            </div>
                            {/* password */}
                            <div className=" mt-[1.5rem] w-full h-[5rem]">
                                <h1 className="text-[#FFFFFF] text-lg font-poppins ml-[2rem] ">Password</h1>
                                <div className="flex">
                                    <input
                                        type={show ? "text" : "password"}
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        placeholder="Enter your password"
                                        className="border border-2 h-[3rem] w-[100%] focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 ml-[2rem]" />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        className="-translate-x-10"
                                    >
                                        <img
                                            src={show ? "/eyeOpen.svg" : "/eyeClosed.svg"}
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
                                        onChange={e => setStNum(e.target.value)}
                                        value={stNum}
                                        className="border border-2 h-[3rem] w-[15rem] focus:outline-none rounded-xl px-3 text-[#FFFFFF] text-lg placeholder:text-gray-500 " />
                                </div>
                                {/* campus */}
                                <div className="w-1/2">
                                    <h1 className="text-[#FFFFFF] text-lg font-poppins ">Campus</h1>
                                    <div>
                                        <select
                                            value={campus}
                                            onChange={e => setCampus(e.target.value)}
                                            className=" text-[#4A69A8] text-lg font-poppins h-[3rem] w-full focus:outline-none rounded-xl px-3 border border-2"
                                            required
                                        >
                                            {/* Placeholder (disabled so user can’t re-select it after picking) */}
                                            <option value="" disabled >
                                                {campus ? "--Select--" : "--Select--"}
                                            </option>

                                            {campuses.map((opt) => (
                                                <option key={opt.id} value={opt.name} className="rounded-lg">
                                                    {opt.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* program */}
                                <div className="w-1/2">
                                    <h1 className="text-[#FFFFFF] text-lg font-poppins ">Program</h1>
                                    <div>
                                        <input
                                            type="text"
                                            onChange={e => setProgram(e.target.value)}
                                            value={program}
                                            className=" text-[#FFFFFF] text-lg font-poppins h-[3rem] w-full focus:outline-none rounded-xl px-3 border border-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/*signup button*/}
                            <div className="w-full justify-center items-center flex mt-[2rem]">
                                <button
                                    type="submit"
                                    className=" bg-[#92A8D1] h-[5rem] w-[18rem] rounded-xl text-[#FFFFFF] text-2xl 
                                                font-bold font-poppins hover:bg-[#A7C7E7] mt-5 shadow-lg shadow-black/30"
                                >
                                    Sign Up
                                </button>
                            </div>
                            {/* already have an account */}
                            <div>
                                <div className="flex justify-center items-center mt-1">
                                    <h1 className="text-[#FFFFFF] text-sm">Already have an account?</h1>
                                    <Link href="/login" className="ml-2 text-[#FFFFFF] text-sm font-bold hover:underline">Login</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Rigth grid */}
                    <div className="col-span-1 flex overflow-hidden">
                        {/* Tagline */}
                        <div className="w-[100%] h-[15rem] mt-[25dvh] align-items-center z-3">
                            <img src="/tagline.png" />
                        </div>
                        {/* Decor */}
                        <div className="overflow-y-hidden absolute z-0 bottom-0 right-55 translate-y-[9.3rem]">
                            <img
                                src="/style1.png"
                                className="h-auto w-[49rem]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}