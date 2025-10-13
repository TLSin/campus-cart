import Navigation from "./components/navBar"
import Footer from "./components/footer"
import UserProfile from "./components/userProfile"
import OrderHistory from "./components/orderHistory"
import AccountSettings from "./components/accountSettings"
import { useState } from "react"
import { Head } from "@inertiajs/react"

export default function userPage() {
    const [activeSection, setActiveSection] = useState<"Profile" | "Order" | "Settings">("Profile");

    const handleClick = (section: "Profile" | "Order" | "Settings") => {
        setActiveSection(section)
    }
    return (
        <>
            <Head title="User Profile" />
            <Navigation />
            <div className="grid place-items-center bg-white">
                <div className="flex w-[70dvw] h-[70dvh] bg-[#949EC0] my-[2dvh] rounded-xl shadow-lg grid grid-cols-2 grid-rows-6 justify-items-center">
                    {/* Header */}
                    <div className="p-2 border-b-2 border-white h-[6.5rem] w-[94%] col-span-2">
                        <h1 className="text-[#515A70] text-[3rem] font-bold h-[4rem]">My Account</h1>
                        <p className="text-white">Manage your profile and view orders.</p>
                    </div>
                    {/* Options Container */}
                    <div className="flex border-b-2 border-white h-[6.5dvh] col-span-2 text-center w-[94%] mx-[2rem]">
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
                    <div className="place-items-start col-span-2">
                        {/* User Info */}
                        {activeSection === "Profile" && <UserProfile />}

                        {/* Order History */}
                        {activeSection === "Order" && <OrderHistory />}

                        {activeSection === "Settings" && <AccountSettings />}

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}