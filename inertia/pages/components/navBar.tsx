import { useState } from "react";
import { Link, router } from "@inertiajs/react";

export default function Navigation() {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.visit(`/search?query=${encodeURIComponent(query)}`);
        }
    }
    return (
        <>
            <div className="navbar h-[6.5rem] bg-[#44506D] shadow-sm grid grid-flow-col grid-rows-3">
                {/* Logo Container */}
                <div className="flex-1 row-span-3">
                    <Link href="/" className="flex h-auto m-[2rem] "><img src="/CClogo.png" className="h-[6rem] cursor-pointer" /></Link>
                </div>
                {/* Links and User Container */}
                <div className="flex-1 col-span-2 flex justify-between items-center p-[1rem] mt-[1rem]">
                    {/* Links Container */}
                    <div className="flex-1 flex justify-center items-center">
                        <Link href="/" className="normal-case text-[1rem] text-white font-poppins m-[1rem]">Home</Link>
                        <Link href="/" className="normal-case text-[1rem] text-white font-poppins m-[1rem]">Shop</Link>
                        <Link href="/" className="normal-case text-[1rem] text-white font-poppins m-[1rem]">About Us</Link>
                        <Link href="/" className="normal-case text-[1rem] text-white font-poppins m-[1rem]">Contact Us</Link>
                    </div>
                    {/* Users Container */}
                    <div className="flex-1 flex justify-center items-center">
                        <h4>Hello! User </h4>
                    </div>
                    <div className="flex items-center">
                        <div className="indicator">
                            {/* Cart Link */}
                            <Link href="/cartPage" className="mr-[2rem]">
                                <svg width="25" height="25" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M48.8 48.8C50.4178 48.8 51.9694 49.4427 53.1133 50.5866C54.2573 51.7306 54.9 53.2822 54.9 54.9C54.9 56.5178 54.2573 58.0694 53.1133 59.2134C51.9694 60.3573 50.4178 61 48.8 61C47.1822 61 45.6306 60.3573 44.4866 59.2134C43.3427 58.0694 42.7 56.5178 42.7 54.9C42.7 51.5145 45.4145 48.8 48.8 48.8ZM0 0H9.9735L12.8405 6.1H57.95C58.7589 6.1 59.5347 6.42134 60.1067 6.99332C60.6787 7.56531 61 8.34109 61 9.15C61 9.6685 60.8475 10.187 60.634 10.675L49.715 30.4085C48.678 32.269 46.665 33.55 44.3775 33.55H21.655L18.91 38.5215L18.8185 38.8875C18.8185 39.0897 18.8988 39.2837 19.0418 39.4267C19.1848 39.5697 19.3788 39.65 19.581 39.65H54.9V45.75H18.3C16.6822 45.75 15.1306 45.1073 13.9866 43.9634C12.8427 42.8194 12.2 41.2678 12.2 39.65C12.2 38.5825 12.4745 37.576 12.932 36.722L17.08 29.2495L6.1 6.1H0V0ZM18.3 48.8C19.9178 48.8 21.4694 49.4427 22.6133 50.5866C23.7573 51.7306 24.4 53.2822 24.4 54.9C24.4 56.5178 23.7573 58.0694 22.6133 59.2134C21.4694 60.3573 19.9178 61 18.3 61C16.6822 61 15.1306 60.3573 13.9866 59.2134C12.8427 58.0694 12.2 56.5178 12.2 54.9C12.2 51.5145 14.9145 48.8 18.3 48.8ZM45.75 27.45L54.229 12.2H15.677L22.875 27.45H45.75Z" fill="#99AAD0" />
                                </svg>
                                <span className="badge badge-sm indicator-item bg-red-500 rounded-full size-[1rem] text-white left-3">3</span>
                            </Link>
                        </div>
                        <div className="dropdown dropdown-end mr-[2rem]">
                            {/* User profile */}
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Profile Picture"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-[#44506D] rounded-box z-1 mt-3 w-52 p-2 shadow-sm outline outline-solid outline-white">
                                <li>
                                    <Link href="/userPage" className="justify-between px-[0.5em] py-[0.3rem]">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a className="px-[0.5em] py-[0.3rem]">Settings</a></li>
                                <li><a className="px-[0.5em] py-[0.3rem]">Logout</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
                {/* Search Container */}
                <div className="flex-1 col-span-2 flex justify-start items-center mt-[2rem]">
                    <form onSubmit={handleSearch}>
                        <input type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="input input-bordered outline-solid outline-black outline focus:outline bg-[#44506D] w-[37.95rem] p-[1rem] rounded-xs ml-[2.78rem]" />
                    </form>
                </div>
            </div>
        </>
    )
}