
interface UserProps {
    fName: string
    lName: string
    email: string
    program: string
    campus: string
    studentNo: string
    address: string
    contactNo: string
}


export default function UserProfile({ fName, lName, email, program, campus, studentNo, address, contactNo } : UserProps) {
    const user = [{ fName, lName, email, program, campus, address, contactNo }]
    const fullName = `${fName} ${lName}`
    
    console.log(user)

    return (
        <>
            <div className="grid ml-[2rem] mb-[1rem]">
                <h2 className="text-[#515A70] text-[2rem] font-bold row-start-1 end-1 h-[3rem] mt-[1rem]">User Profile</h2>
                {/* Input Fields */}
                <div className="flex grid grid-cols-2 place-items-center">
                    {/* Name Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Full Name</h3>
                        <input type="text"
                            placeholder="e.g. Juan Dela Cruz"
                            value={`${fullName}`}
                            className="bg-[#44506D] rounded-md p-1 w-[85%] text-white" 
                            disabled
                            />
                    </div>
                    {/* Phone Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Phone Number</h3>
                        <div className="dropdown flex items-center">
                            <div tabIndex={0} className="absolute bg-transparent rounded-md
                                                            p-1 z-2 cursor-pointer w-[2.5rem] translate-y-2 text-white">
                                +63
                            </div>
                            {/* <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#44506D]
                                                            rounded-none w-52 mt-[2.5rem] w-[2.5rem] translate-y-2 text-white">
                                <li>+63</li>
                            </ul> */}
                        </div>
                        <input 
                            type="text"
                            value={`${contactNo}`}
                            placeholder="9123456789"
                            className="bg-[#44506D] rounded-md p-1 z-1 text-center w-[85%] text-white" 
                            disabled/>
                    </div>
                    {/* Email Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Email</h3>
                        <input 
                            type="text"
                            value={email}
                            placeholder="e.g. juandelacruz@gmail.com"
                            className="bg-[#44506D] rounded-md p-1 w-[85%] text-white" 
                            disabled
                            />
                    </div>
                    {/* Program Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Program</h3>
                        <input 
                            type="text"
                            value={program}
                            placeholder="e.g. Bachelor of Science in Information Technology"
                            className="bg-[#44506D] rounded-md p-1 w-[85%] text-white" 
                            disabled/>
                    </div>
                    {/* Student Number Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Student Number</h3>
                        <input 
                            type="text"
                            value={studentNo}
                            placeholder="e.g. AU123456789"
                            className="bg-[#44506D] rounded-md p-1 w-[85%] text-white" 
                            disabled/>
                    </div>
                    {/* Campus Section */}
                    <div className="col-1 align-center col-span-1 mb-[1rem] w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Campus</h3>
                        <input 
                            type="text"
                            value={campus}
                            placeholder="e.g. Cainta, Antipolo, Sumulong... "
                            className="bg-[#44506D] rounded-md p-1 w-[25dvw] text-white" 
                            disabled/>
                    </div>
                    {/* Address Section */}
                    <div className="col-1 align-center col-span-1 w-full">
                        <h3 className="text-[#515A70] text-[1rem] font-medium">Shipping Address</h3>
                        <textarea
                            value={address}
                            placeholder="e.g. 256 Real Road, Barangay South Real, Real City, Antipolo, Philippines 1870"
                            className="bg-[#44506D] rounded-md p-1 w-[38dvw] h-[5rem] resize-none text-white" 
                            readOnly/>
                    </div>
                </div>
            </div>
        </>
    )
}