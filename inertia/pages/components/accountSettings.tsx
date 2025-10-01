export default function AccountSettings() {
    return (
        <>
            <div className="w-[83dvw]">
                <div className="flex translate-y-[-0.5rem] px-4">
                    <h2 className="text-[#515A70] text-[2rem] font-bold h-[3rem] left-0 mr-2">Account Settings</h2>

                    <button className="w-[5rem] h-[3rem] bg-[#616B85] text-[#D3CCCC] rounded-lg text-[1.2rem] hover:bg-[#6C7B9F]"> Edit </button>
                </div>

                {/* Full Name */}
                <div>
                    <form action="" className="grid grid-cols-4 grid-rows-4">
                        <div className="col-span-2 row-span-1">
                            <h1 className="ml-[1rem] text-[1.2rem] text-[#515A70] font-bold ">Full Name</h1>
                            <input type="text" className="ml-[1rem] border border-white/50 px-2 py-1 rounded-md bg-[#6C7B9F] w-[80%] focus:outline-white/50 outline " />
                        </div>
                        <div className="col-span-1 row-span-1">
                            {/* Phone Section */}
                            <h3 className="text-[#515A70] text-[1.2rem] font-bold">Phone Number</h3>
                            <div className="dropdown flex items-center">
                                <div tabIndex={0} className="absolute bg-transparent rounded-md
                                                            p-1 z-2 cursor-pointer w-[2.5rem] translate-y-2">
                                    +63
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#44506D]
                                                            rounded-none w-52 mt-[2.5rem] w-[2.5rem] translate-y-2">
                                    <li>+63</li>
                                </ul>
                            </div>
                            <input type="text"
                                placeholder="9123456789"
                                className="bg-[#6C7B9F] rounded-md z-1 text-center w-[90%] focus:outline-white/50 outline-[1px] px-2 py-1 h-[2.3rem]" />
                        </div>
                         {/* Current Password */}
                        <div className="col-span-1 mb-4">
                            <h3 className="text-[#515A70] text-[1.2rem] font-bold ml-[1rem]"> Current Password</h3>
                            <input
                                type="password"
                                placeholder="Current Password"
                                className="ml-[1rem] border border-white/50 px-2 py-1 rounded-md bg-[#6C7B9F] w-[80%] focus:outline-white/50 outline" />
                        </div>

                        {/* Email */}
                        <div className="col-span-2 row-span-1">
                            <h1 className="ml-[1rem] text-[1.2rem] text-[#515A70] font-bold"> Email</h1>
                            <input type="text" className="ml-[1rem] border border-white/50 px-2 py-1 rounded-md bg-[#6C7B9F] w-[80%] focus:outline-white/50 outline " />
                        </div>

                        {/* Program */}
                        <div className="col-span-1 row-span-1">
                            <h1 className="text-[1.2rem] text-[#515A70] font-bold"> Program</h1>
                            <input
                                placeholder="BSIT"
                                type="text"
                                className="border border-white/50 px-2 py-1 rounded-md bg-[#44506D] w-[90%] text-center" />
                        </div>

                        {/* New Password */}
                        <div className="col-span-1 mb-4">
                            <h3 className="text-[#515A70] text-[1.2rem] font-bold ml-[1rem]"> New Password</h3>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="ml-[1rem] border border-white/50 px-2 py-1 rounded-md bg-[#6C7B9F] w-[80%] focus:outline-white/50 outline" />
                        </div>

                        {/* Student Number */}
                        <div className="col-span-2 row-span-1">
                            <h1 className="ml-[1rem] text-[1.2rem] text-[#515A70] font-bold"> Student Number</h1>
                            <input 
                                type="text"
                                placeholder="AU7842365232"
                                className="ml-[1rem] border border-white/50 px-2 py-1 rounded-md bg-[#44506D] w-[80%] text-center"/>
                        </div>

                        {/* Campus */}
                        <div className="col-span-1 row-span-1">
                            <h1 className="text-[1.2rem] text-[#515A70] font-bold"> Campus</h1>
                            <input
                                placeholder="Antipolo"
                                type="text"
                                className="border border-white/50 px-2 py-1 rounded-md bg-[#44506D] w-[90%] text-center" />
                        </div>

                        {/* Confirm New Password */}
                        <div className="col-span-1 mb-4">
                            <h3 className="text-[#515A70] text-[1.2rem] font-bold ml-[1rem]"> Confirm New Password</h3>
                            <input
                                type="password"
                                placeholder=" Confirm New Password"
                                className="ml-[1rem] border border-white/50 px-2 py-1 rounded-md bg-[#6C7B9F] w-[80%] focus:outline-white/50 outline" />
                        </div>

                        {/* Shipping Address */}
                        <div className="col-span-2 row-span-1">
                            <h1 className="ml-[1rem] text-[1.2rem] text-[#515A70] font-bold">Shipping Address</h1>
                            <input 
                            type="text"
                            placeholder="Prk 8 Manga St Zone 1 Brgy. Narra Antipolo City, Rizal Narra, Antipolo City, Rizal, South Luzon, 1870"
                            className="ml-[1rem] border border-white/50 px-2 py-3 rounded-md bg-[#6C7B9F] w-[80%] focus:outline-white/50 outline" />
                        </div>

                        {/* Save Changes Button */}
                        <div className="col-span-2 justify-items-end mr-16 translate-y-4">
                            <div>
                            <button type="submit" className="w-[10rem] h-[3rem] bg-[#616B85] text-[#D3CCCC] rounded-lg text-[1.2rem] hover:bg-[#44506D] ">Save Changes</button>
                            </div>
                            
                        </div>

                    </form>
                </div>
            </div>






        </>
    )
}