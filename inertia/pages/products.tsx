import Navigation from "./components/navBar"
import Footer from "./components/footer"
import { useState } from "react";
import { Head } from "@inertiajs/react";

export default function shopPage() {
    const [count, setCount] = useState(1);

    const addFunction = () => {
        setCount(count + 1);
    }

    const subtractFunction = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    return (
        <>
            <Head title="Product Page" />

            <Navigation />
            {/* 
                Note: Settings here are for screen size 1280 * 1024
                TODO: Modify it for screen size 1920 * 1080 
            */}
            {/* Container */}
            <div className="flex flex-col items-center justify-center w-full h-full bg-[#E0E4EC]">
                {/* Product Container */}
                <div className="w-[85dvw] h-[80dvh] bg-white rounded-lg shadow-lg m-[1.5rem] overflow-hidden flex">
                    {/* Image Container */}
                    <div className="w-[40dvw] h-[67dvh] rounded-t-lg ml-[1.5rem] mt-[1.5rem] overflow-hidden">
                        {/* Main Image */}
                        <div className="flex h-[50dvh] shadow-lg">
                            <img src="/College of Computer Studies.png" className="h-[50dvh] w-[40dvw] object-contain rounded-lg aspect-video" alt="Main Image" />
                        </div>
                        {/* Sub-Image */}
                        <div className="flex mt-[0.5rem] space-x-2 mt-[1.5rem] overflow-x-scroll overflow-x-hiddden">
                            <img src="/College of Computer Studies - Male - Blazer.png" className="h-[7rem] w-[7rem] object-contain rounded-lg cursor-pointer shadow-md" />
                            <img src="/College of Computer Studies - Female - blouse.png" className="h-[7rem] w-[7rem] object-contain rounded-lg cursor-pointer shadow-md" />
                            <img src="/College of Computer Studies - Female - Ribbon.png" className="h-[7rem] w-[7rem] object-contain rounded-lg cursor-pointer shadow-md" />
                            <img src="/College of Computer Studies - Female - skirt.png" className="h-[7rem] w-[7rem] object-contain rounded-lg cursor-pointer shadow-md" />
                            <img src="/College of Computer Studies - Male - Blazer.png" className="h-[7rem] w-[7rem] object-contain rounded-lg cursor-pointer shadow-md" />
                            <img src="/College of Computer Studies - Male - necktie.png" className="h-[7rem] w-[7rem] object-contain rounded-lg cursor-pointer shadow-md" />
                            <img src="/College of Computer Studies - Male - polo.png" className="h-[7rem] w-[7rem] object-contain rounded-lg cursor-pointer shadow-md" />
                        </div>
                    </div>
                    {/* Product Details Container */}
                    <div className="flex w-[40dvw] rounded-t-lg ml-[2rem] mt-[1rem] grid grid-rows-3">
                        {/* Product Details Row 1 */}
                        <div className="h-[60dvh] p-4 row-span-2">
                            <h1 className="text-[#44506D] text-[1.7rem]">Computer Studies Complete Uniform For Male and Female</h1>
                            {/* Rating Details */}
                            <div className="flex grid grid-cols-3 divide-x-3 divide-solid divide-[#44506D] items-center ml-[1rem] pt-[1rem] pb-[2rem]">
                                <div className="flex items-center border-r border-[#44506D]">
                                    <h3 className="text-black text-[1.1rem] bg-none mr-[0.5rem]">4.8</h3>
                                    <div className="rating w-[5rem] items-center">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" defaultChecked />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
                                    </div>
                                </div>
                                <div className="flex items-center align-center border-r ml-[2rem]">
                                    <h3 className="flex text-black text-[1rem]">209</h3>
                                    <h4 className="text-[0.8rem] text-black ml-[0.5rem]">Ratings</h4>
                                </div>
                                <div className="flex items-center align-center ml-[2rem]">
                                    <h3 className="flex text-black text-[1rem]"> 1K+</h3>
                                    <h4 className="flex text-[0.8rem] text-black ml-[0.5rem]">Sold</h4>
                                </div>
                            </div>
                            <h2 className="text-red-600 text-[1.5rem] font-bold ml-[1rem] ">₱900.00</h2>
                            {/* Other Details */}
                            <div className="flex items-center grid grid-cols-3 ml-[1rem]">
                                <div className="col-1 align-left col-span-1">
                                    <h3 className="text-gray-500">Shipping</h3>
                                </div>
                                <div className="col-2 align-left items-top col-span-2">
                                    <br />
                                    <h3 className="text-black text-[1rem]">Get by 29 Sept <a></a></h3>
                                    <h3 className="text-black text-[1rem]">Free Shipping</h3>
                                </div>
                                <div className="col-1 align-left col-span-1">
                                    <h3 className="text-gray-500">Type</h3>
                                </div>
                                <div className="col-2 align-center justify-between col-span-2 pt-[1rem]">
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Blazer-M</button>
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Blazer-F</button>
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Skirt-F</button>
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Pants-M</button>
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Necktie-M</button>
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Necktie-F</button>
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Polo-F</button>
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Polo-M</button>
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">All-F</button>
                                    <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">All-M</button>
                                </div>
                                <div className="col-1 align-left col-span-1 pt-[1rem]">
                                    <h3 className="text-gray-500">Size</h3>
                                </div>
                                <div className="col-2 align-left justify-between col-span-2 pt-[1rem]">
                                    <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">XS</button>
                                    <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">S</button>
                                    <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">M</button>
                                    <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">L</button>
                                    <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">XL</button>
                                </div>
                                <div className="col-1 align-left col-span-1 pt-[1rem]">
                                    <h3 className="text-gray-500 ">Quantity</h3>
                                </div>
                                <div className="flex col-2 align-left col-span-2 pt-[1rem]                                                           ">
                                    <button className="text-black rounded-none border-black outline border w-[2rem] h-[2rem] active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white" onClick={subtractFunction}>-</button>
                                    <input type="number" defaultValue="1" value={count} min="1" className="pl-[0.5rem] bg-white w-[2.5rem] text-black text-center rounded-none border-black border outline" readOnly />
                                    <button className="text-black rounded-none border-black outline border w-[2rem] h-[2rem] active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white" onClick={addFunction}>+</button>
                                </div>
                            </div>
                        </div>
                        {/* Action Buttons Container */}
                        <div className="flex justify-end items-bottom mt-[2rem] align-end">
                            <button className="btn bg-white text-black border-black hover:bg-gray-200 mr-[1rem] px-8 py-3">Add to Cart</button>
                            <button className="btn bg-[#44506D] text-white border-none hover:bg-[#2C3653] mr-[2rem] px-8 py-3">Buy Now</button>
                        </div>
                    </div>
                </div>
                {/* Product Descriptions */}
                <div className="w-[85dvw] h-auto bg-white rounded-lg shadow-lg mb-[1.5rem] p-4">
                    <h1 className="text-[#44506D] text-[1.5rem] font-bold mb-[1rem]">Product Description</h1>
                    <p>
                        Elevate your school look with the official and complete Computer Studies uniform set! Designed for comfort, style, and a professional appearance, this uniform ensures you look sharp and ready for all your academic and extracurricular activities. Suitable for both male and female students.
                        <br />
                        <br />
                        Key Features:
                        <br />
                        Complete Set: Offers all essential components for a smart, formal school look.
                        <br />
                        High-Quality Fabric: Durable, comfortable, and designed to withstand daily wear and frequent washing.
                        <br />
                        Official Design: Features the official Computer Studies (CS) logo/emblem (as seen on the blazer and polo shirt).
                        <br />
                        Professional Look: The classic navy blazer and tailored pieces offer a distinguished, academic aesthetic.
                        <br />
                        Multiple Options: Available for individual parts (Blazer, Skirt, Pants, Necktie/Necktie-F, Polo) or as a full set (All-M / All-F).
                        <br />
                        <br />
                        Available Variations (Type and Size):
                        Type/Component:
                        <br />
                        Blazer - M (Male)
                        <br />
                        Blazer - F (Female)
                        <br />
                        Skirt - F (Female)
                        <br />
                        Pants - M (Male)
                        <br />
                        Necktie - M (Male)
                        <br />
                        Necktie - F (Female/Bow)
                        <br />
                        Polo - M (Male Casual Shirt)
                        <br />
                        All - F (Complete Female Set)
                        <br />
                        All - M (Complete Male Set)
                        <br />
                        <br />
                        Size (Available for all apparel items):
                        <br />
                        XS (Extra Small)
                        <br />
                        S (Small)
                        <br />
                        M (Medium)
                        <br />
                        L (Large)
                        <br />
                        XL (Large)</p>
                </div>

                {/* User Reviews */}
                <div className="w-[85dvw] h-auto bg-white rounded-lg shadow-lg mb-[1.5rem] p-4">
                    <h1 className="text-[#44506D] text-[1.5rem] font-bold mb-[1rem]">User Reviews</h1>
                    {/* User 1 Review */}
                    <div className="">
                        {/* user description */}
                        <div className="flex space-x-4 ">
                            <div className="bg-gray w-[3rem] h-[3rem] rounded-full flex justify-center items-center border border-black">
                                <h1>JD</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-black text-[1rem] font-bold">John Doe</h1>
                                <p>01 Oct 2025 | All Set-M</p>
                            </div>
                        </div>
                        {/* user review */}
                        <div className="ml-[4rem]">
                            <p>"The item is good no damage naman sya and mabilis ko syang nareceived."</p>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}