import { router } from "@inertiajs/react"
import { useState } from "react"

interface UserProps {
    fName: string
    lName: string
    email: string
    password: string
    program: string
    campus: string
    studentNo: string
    address: string
    contactNo: string
}

export default function AccountSettings({ fName, lName, email, password, program, campus, studentNo, address, contactNo }: UserProps) {
    const [firstName, setFirstName] = useState<string>(fName)
    const [lastName, setLastName] = useState<string>(lName)
    const [emailValue, setEmailValue] = useState<string>(email)
    const [currentPassword, setCurrentPassword] = useState<string>()
    const [newPasswordValue, setNewPasswordValue] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [addressValue, setAddressValue] = useState<string>(address)
    const [contactNumber, setContactNumber] = useState<string>(contactNo)

    const [isDisabled, setIsDisabled] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [edit, setEdit] = useState(false)
    const [save, setSave] = useState(false)

    const handleEdit = () => {
        setIsDisabled(!isDisabled)
        setIsVisible(!isVisible)
        setEdit(!edit)
        setSave(!save)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(firstName && lastName && emailValue && (currentPassword && newPasswordValue && confirmPassword) && addressValue && contactNumber){
            router.put('/userPage/update', {
                firstName,
                lastName,
                emailValue,
                currentPassword,
                newPassword: newPasswordValue,
                confirmPassword,
                addressValue,
                contactNumber,
            })
        }
        setCurrentPassword('')
        setNewPasswordValue('')
        setConfirmPassword('')
        setIsDisabled(!isDisabled)
        setIsVisible(!isVisible)
        setEdit(!edit)
        setSave(!save)
    }
    
    const handleCancel = () => {
        setIsVisible(isVisible)
        setEdit(edit)
        setSave(save)
    }

    return (
        <>
            <div className="ml-[2rem] w-[68dvw]">
                <div className="flex px-1 mt-[1rem]">
                    <h2 className="text-[#515A70] text-[2rem] font-bold h-[3rem] left-0 mr-2">Account Settings</h2>

                    <button
                        className={`w-[5rem] h-[3rem] bg-[#616B85] rounded-lg text-[1.2rem] text-white ${isVisible ? 'invisible' : 'visible'} hover:bg-[#6C7B9F]`}
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </div>

                {/* Full Name */}
                <div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-3 grid-rows-4 items-center w-[100%]">
                        <div className="col-span-1 row-span-1">
                            <h1 className="text-[1.2rem] text-[#515A70] font-bold ">First Name</h1>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`border border-white/50 px-2 py-1 rounded-md bg-[#6C7B9F] w-[85%] ${ edit ? 'text-white' : 'text-[#D3CCCC]' } focus:outline-white/50 outline `}
                                disabled={isDisabled ? true : false} />
                        </div>
                        <div className="col-span-1 row-span-1">
                            <h1 className="text-[1.2rem] text-[#515A70] font-bold ">Last Name</h1>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`border border-white/50 px-2 py-1 rounded-md bg-[#6C7B9F] ${ edit ? 'text-white' : 'text-[#D3CCCC]' } w-[85%] focus:outline-white/50 outline `}
                                disabled={isDisabled ? true : false} />
                        </div>
                        {/* Current Password */}
                        <div className="col-span-1 row-span-1">
                            <h3 className="text-[#515A70] text-[1.2rem] font-bold"> Current Password</h3>
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className={`border border-white/50 px-2 py-[0.38rem] rounded-md bg-[#6C7B9F] w-[85%] focus:outline-white/50 outline ${ edit ? 'text-white' : 'text-[#D3CCCC]' }`}
                                disabled={isDisabled ? true : false} />
                        </div>
                        {/* Phone Section */}
                        <div className="col-span-1 row-span-1">
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
                            <input
                                type="text"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                placeholder="9123456789"
                                className={`bg-[#6C7B9F] rounded-md z-1 text-center w-[85%] focus:outline-white/50 outline-[1px] p-[0.36rem] ${ edit ? 'text-white' : 'text-[#D3CCCC]' }`}
                                disabled={isDisabled ? true : false} />
                        </div>

                        {/* Email */}
                        <div className="col-span-1 row-span-1">
                            <h1 className="text-[1.2rem] text-[#515A70] font-bold"> Email</h1>
                            <input
                                type="text"
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                                className={`border border-white/50 px-2 py-1 rounded-md bg-[#6C7B9F] w-[85%] focus:outline-white/50 outline ${ edit ? 'text-white' : 'text-[#D3CCCC]' }`}
                                disabled={isDisabled ? true : false} />
                        </div>


                        {/* New Password */}
                        <div className="col-span-1">
                            <h3 className="text-[#515A70] text-[1.2rem] font-bold"> New Password</h3>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPasswordValue}
                                onChange={(e) => setNewPasswordValue(e.target.value)}
                                className={`border border-white/50 px-2 py-[0.36rem] rounded-md bg-[#6C7B9F] w-[85%] focus:outline-white/50 outline ${ edit ? 'text-white' : 'text-[#D3CCCC]' }`}
                                disabled={isDisabled ? true : false} />
                        </div>

                        {/* Program */}
                        <div className="col-span-1 row-span-1">
                            <h1 className="text-[1.2rem] text-[#515A70] font-bold"> Program</h1>
                            <input
                                placeholder="BSIT"
                                type="text"
                                value={program}
                                className="border border-white/50 px-2 py-[0.36rem] rounded-md bg-[#44506D] w-[85%] text-center"
                                disabled />
                        </div>

                        {/* Student Number */}
                        <div className="col-span-1 row-span-1">
                            <h1 className="text-[1.2rem] text-[#515A70] font-bold"> Student Number</h1>
                            <input
                                type="text"
                                placeholder="AU7842365232"
                                value={studentNo}
                                className="border border-white/50 px-2 py-[0.36rem] rounded-md bg-[#44506D] w-[85%] text-center"
                                disabled />
                        </div>


                        {/* Confirm New Password */}
                        <div className="col-start-3">
                            <h3 className="text-[#515A70] text-[1.2rem] font-bold"> Confirm New Password</h3>
                            <input
                                type="password"
                                placeholder=" Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`border border-white/50 px-2 py-[0.36rem] rounded-md bg-[#6C7B9F] w-[85%] focus:outline-white/50 outline ${ edit ? 'text-white' : 'text-[#D3CCCC]' }`}
                                disabled={isDisabled ? true : false} />
                        </div>

                        {/* Campus */}
                        <div className="col-span-3 col-start-1 row-span-1">
                            <h1 className="text-[1.2rem] text-[#515A70] font-bold"> Campus</h1>
                            <input
                                placeholder="Antipolo"
                                type="text"
                                value={campus}
                                className="border border-white/50 px-2 py-[0.36rem] rounded-md bg-[#44506D] w-[28.5%] text-center"
                                disabled />
                        </div>
                        {/* Shipping Address */}
                        <div className="col-span-2 row-span-1">
                            <h1 className="text-[1.2rem] text-[#515A70] font-bold">Shipping Address</h1>
                            <textarea
                                value={addressValue}
                                onChange={(e) => setAddressValue(e.target.value)}
                                placeholder="Prk 8 Manga St Zone 1 Brgy. Narra Antipolo City, Rizal Narra, Antipolo City, Rizal, South Luzon, 1870"
                                className={`border border-white/50 px-2 py-3 rounded-md bg-[#6C7B9F] w-[85%] h-[5rem] resize-none focus:outline-white/50 outline ${ edit ? 'text-white' : 'text-[#D3CCCC]' }`}
                                disabled={isDisabled ? true : false} />
                        </div>

                        {/* Save Changes Button */}
                        <div className="col-span-3 justify-items-end mb-4">
                            <div>
                                <button
                                    type="submit"
                                    className={`w-[10rem] h-[3rem] bg-[#616B85] text-[#FFFFFF] rounded-lg text-[1.2rem] mr-[2rem] ${isVisible ? 'visible'  : 'invisible' } hover:bg-[#44506D] `}
                                    onClick={handleSubmit}
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="submit"
                                    className={`w-[10rem] h-[3rem] bg-[#616B85] text-[#FFFFFF] rounded-lg text-[1.2rem] mr-[2rem] ${isVisible ? 'visible'  : 'invisible' } hover:bg-[#44506D] `}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}