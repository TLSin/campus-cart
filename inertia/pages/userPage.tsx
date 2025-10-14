import Navigation from "./components/navBar"
import Footer from "./components/footer"
import UserProfile from "./components/userProfile"
import OrderHistory from "./components/orderHistory"
import AccountSettings from "./components/accountSettings"
import { useState } from "react"
import { Head, usePage } from "@inertiajs/react"

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

interface UserPageProps {
    user: UserProps[]
    [key: string]: any
}
export default function userPage() {
    const [activeSection, setActiveSection] = useState<"Profile" | "Order" | "Settings">("Profile")
    const { user } = usePage<UserPageProps>().props
    const {
        fName = '',
        lName = '',
        email = '',
        program = '',
        campus = '',
        studentNo = '',
        address = '',
        contactNo = '',
        password = '',
    } = user || {}
    const handleClick = (section: "Profile" | "Order" | "Settings") => {
        setActiveSection(section)
    }

    console.log(user)
    return (
        <>
            <Head title="User Profile" />
            <Navigation />
            <div className="grid place-items-center bg-white">
                <div className="flex w-[70dvw] h-auto bg-[#949EC0] my-[2dvh] rounded-xl shadow-lg grid grid-cols-2 grid-rows-7 justify-items-center">
                    {/* Header */}
                    <div className="p-2 border-b-2 border-white h-[6.5rem] w-[94%] col-span-2">
                        <h1 className="text-[#515A70] text-[3rem] font-bold h-[4rem]">My Account</h1>
                        <p className="text-white">Manage your profile and view orders.</p>
                    </div>
                    {/* Options Container */}
                    <div className="flex border-b-2 border-white h-[3.2rem] col-span-2 text-center w-[94%] mx-[2rem] row-span-1">
                        <h4 className="text-[#515A70] text-[1rem] font-bold px-[3rem] py-[0.8rem]
                                    cursor-pointer hover:bg-white rouded-lg"

                            onClick={() => handleClick("Profile")}>
                            Profile
                        </h4>
                        <h4 className="text-[#515A70] text-[1rem] font-bold px-[3rem] py-[1rem]
                                    cursor-pointer hover:bg-white rouded-lg"
                            onClick={() => handleClick("Order")}>
                            Orders
                        </h4>
                        <h4 className="text-[#515A70] text-[1rem] font-bold px-[3rem] py-[1rem]
                                    cursor-pointer hover:bg-white rouded-lg"
                            onClick={() => handleClick("Settings")}>
                            Settings
                        </h4>

                    </div>
                    <div className="place-items-start col-span-2 row-span-7">
                        {/* User Info */}
                        {activeSection === "Profile" &&
                            <UserProfile
                                fName={fName}
                                lName={lName}
                                email={email}
                                program={program}
                                campus={campus}
                                studentNo={studentNo}
                                address={address}
                                contactNo={contactNo}
                            />}

                        {/* Order History */}
                        {activeSection === "Order" && <OrderHistory />}

                        {activeSection === "Settings" &&
                            <AccountSettings
                                fName={fName}
                                lName={lName}
                                email={email}
                                password={password}
                                program={program}
                                campus={campus}
                                studentNo={studentNo}
                                address={address}
                                contactNo={contactNo}
                            />}

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}