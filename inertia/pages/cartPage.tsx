import Navigation from "./components/navBar"
import Footer from "./components/footer"
import { useState } from "react";
import { Head } from '@inertiajs/react'

export default function CartPage() {
    const [isCheck, setIsCheck] = useState(false);
    const [count, setCount] = useState(1);

    const addFunction = () => {
        setCount(count + 1);
    }

    const subtractFunction = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const handleCheck = () => {
        setIsCheck(!isCheck);
    }
    

    return (
        <>
            <Head title="Dormio" />
            <Navigation />
            {/* 
                Note: Settings here are for screen size 1280 * 1024
                TODO: Modify it for screen size 1920 * 1080 
            */}
            <div className="h-[69.38dvh] w-full">
                <h1 className="flex text-[3rem] font-bold text-[#515A70] ml-[1rem] mb-[2rem]">Shopping Cart</h1>
                <div className="overflow-x-auto">
                    <table className="table w-[95dvw] ml-[1rem] mb-[2rem]">
                        {/* Head */}
                        <thead className="border-b-2 border-[#44506D]">
                            <tr>
                                <th>
                                    <label>
                                        <h3 className="text-[#44506D] text-center">Check All</h3>
                                    </label>
                                </th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center"> </th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center">Products</th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center">Type</th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center">Price</th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center">Quantity</th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center"> </th>
                            </tr>
                        </thead>
                        <tbody className="border-b-2 border-[#44506D] h-[5dvh] px-2 py-2">
                            {/* row 1 */}
                            <tr>
                                {/* Checkbox */}
                                <th className="px-2 py-2 align-center">
                                    <label>
                                        <input type="checkbox" className={`checkbox p-1 rounded-none justify-center outline outline-[#99AAD0] ${isCheck ? 'bg-[#44506D]' : 'bg-transparent'}`} checked={isCheck} onChange={(e) => setIsCheck(e.target.checked)} />
                                    </label>
                                </th>
                                {/* Product Image */}
                                <td>
                                    {/* Image */}
                                    <div className="flex items-center gap-3 p-2">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component"
                                            className="w-[9rem] h-[9rem] object-cover"
                                        />
                                    </div>
                                </td>
                                {/* Product Name */}
                                <td className="text-[#44506D] text-[1.2rem] text-left w-[30dvw]">
                                    Computer Studies Complete Uniform For Male and Female
                                </td>
                                {/* Product Type */}
                                <td className="text-[#44506D] text-[1rem] text-center">Skirt, M</td>
                                {/* Product Price */}
                                <td className="text-[#44506D] text-[1rem] text-center">₱300.00</td>
                                {/* Quantity */}
                                <td className="text-[#44506D] text-[1rem] text-center">
                                    <button className="text-[#44506D] rounded-none border-[#44506D] outline border w-[1rem] h-[1.6rem]" onClick={subtractFunction}>-</button>
                                    <input type="text" defaultValue="1" value={count} min="1" className="bg-transparent w-[2rem] h-[1.6rem] text-[#44506D] text-center text-[1rem] rounded-none border-[#44506D] border outline p-[0.1rem]" readOnly />
                                    <button className="text-[#44506D] rounded-none border-[#44506D] outline border w-[1rem] h-[1.6rem]" onClick={addFunction}>+</button>
                                </td>
                                {/* Remove Button */}
                                <td>
                                    <button className="btn btn-ghost btn-xs text-[#44506D] p-2 outline border-[#44506D] rounded-none w-[9rem] hover:bg-[#44506D] hover:text-white">Remove</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
            <div className="flex w-full items-center mb-[2rem] justify-bottom">
                {/* Subtotal Container */}
                <div className="flex align-center items-center flex-1 ml-[2rem]">
                    <h3 className="text-[#44506D] text-[1rem] ml-[2rem]">Subtotal (3 items):</h3>
                    <div className="text-red-500 text-[1.5rem] font-bold ml-[0.5rem]">₱2,700.00</div>
                </div>
                {/* Checkout Container */}
                <div className="flex-1 flex justify-end items-center">
                    <button className="btn bg-[hsl(222,23,35,25%)] text-black border-[#44506D] border rounded-none hover:bg-[#44506D] hover:text-white px-8 py-3 mr-[2rem]">Continue Shopping</button>
                    <button className="btn bg-[#44506D] text-white border-none rounded-none hover:bg-[#2C3653] px-8 py-3 mr-[2rem]">Proceed to Checkout</button>
                </div>
            </div>

            <Footer />
        </>
    )
}