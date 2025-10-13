export default function UserProfile() {
    return (
        <>
            <div className="grid ml-[1rem] ml-[2rem]">
                <h2 className="text-[#515A70] text-[2rem] font-bold row-start-1 end-1 h-[3rem] translate-y-[-0.5rem]">User Profile</h2>
                {/* Input Fields */}
                <div className="flex grid grid-cols-2 place-items-center">
                    {/* Name Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Full Name</h3>
                        <input type="text"
                            placeholder="e.g. Juan Dela Cruz"
                            className="bg-[#44506D] rounded-md p-1 w-[85%]" />
                    </div>
                    {/* Phone Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Phone Number</h3>
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
                            className="bg-[#44506D] rounded-md p-1 z-1 text-center w-[65%]" />
                    </div>
                    {/* Email Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Email</h3>
                        <input type="text"
                            placeholder="e.g. juandelacruz@gmail.com"
                            className="bg-[#44506D] rounded-md p-1 w-[85%]" />
                    </div>
                    {/* Program Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Program</h3>
                        <input type="text"
                            placeholder="e.g. Bachelor of Science in Information Technology"
                            className="bg-[#44506D] rounded-md p-1 w-[85%]" />
                    </div>
                    {/* Student Number Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Student Number</h3>
                        <input type="text"
                            placeholder="e.g. AU123456789"
                            className="bg-[#44506D] rounded-md p-1 w-[85%]" />
                    </div>
                    {/* Campus Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Campus</h3>
                        <input type="text"
                            placeholder="e.g. Cainta, Antipolo, Sumulong... "
                            className="bg-[#44506D] rounded-md p-1 w-[25dvw]" />
                    </div>
                    {/* Address Section */}
                    <div className="col-1 align-center col-span-1 w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Shipping Address</h3>
                        <textarea
                            placeholder="e.g. 256 Real Road, Barangay South Real, Real City, Antipolo, Philippines 1870"
                            className="bg-[#44506D] rounded-md p-1 w-[38dvw] h-[5rem] resize-none" />
                    </div>
                </div>
            </div>
        </>
    )
}