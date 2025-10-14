import Navigation from "./components/navBar";
import { useState } from "react";
import { ChevronDown, ChevronUp, Link } from "lucide-react";
import { usePage } from "@inertiajs/react"


export default function ResultPage() {
    const { category } = usePage().props as any // <-- Add this line

    const [showMore, setShowMore] = useState(false);
    const [active, setActive] = useState("Relevance");

    const buttons = ["Relevance", "Latest", "Top Sales"];

    const categories = [
        "Book & Modules",
        "Uniforms",
        "Electronics",
        "Accessories",
        "Computer Peripherals",
        "Sports and Fitness",
        "Merchs",
        "Souvenirs",
        "Event Tickets",
    ];

    const visibleCategories = showMore ? categories : categories.slice(0, 4);

    return (
        <>
            <Navigation />


            <div className="w-screen h-screen flex overflow-hidden">

                {/* search filter */}
                <div className="h-screen w-[30%] block">

                    <div className="flex w-full justify-center gap-2 pt-10">
                        <img src="search.svg" alt="" className="w-" />
                        <h1 className="text-xl font-bold text-[#515A70]">Search Filter</h1>
                    </div>

                    {/* other items */}
                    <div className="w-full h-5 block pl-24 pt-2 ">

                        <div className="flex justify-center">
                            <ul className=" space-y-2 list-disc">
                                {visibleCategories.map((category) => (
                                    <li key={category} className="hover:text-blue-600 hover:underline cursor-pointer text-md text-[#515A70] font-semibold">
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-center" >
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="mt-4 flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                                {showMore ? (
                                    <>
                                        <span>Show Less</span>
                                        <ChevronUp size={16} />
                                    </>
                                ) : (
                                    <>
                                        <span>See More</span>
                                        <ChevronDown size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/*search result  */}
                <div className="h-screen w-[50%]">
                    <div className="flex space-x-2 pt-10 pl-4">
                        <img src="idea.svg" alt="" className="w-6" />
                        <h1>Result for '<span className="text-[#C65E61]">Book & Modules</span>'</h1>
                    </div>

                    {/* sort */}
                    <div className="flex w-full pl-6 mt-2 h-15 items-center gap-4 bg-[#8698BC]">

                        <span >Sort by</span>
                        {buttons.map((btn) => (
                            <button
                                key={btn}
                                onClick={() => setActive(btn)}
                                className={` p-2 
                            ${active === btn ? "bg-[#44506D] text-[#FFFFFF]" : " bg-[#949EC0] hover:text-[#FFFFFF] hover:bg-[#44506D]"}`}>{btn}</button>


                        ))}



                        <div className="dropdown dropdown-bottom">
                            <div tabIndex={0} role="button" className="flex  m-1 bg-[#ABB1CF] hover:bg-[#44506D] hover:text-[#ffffff] p-2">Price <ChevronDown size={20} className="w-10 mt-1" /></div>
                            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 mt-2 shadow-sm bg-[#ABB1CF] gap-2 ">
                                <li className="hover:bg-[#44506D] hover:text-[#ffffff] p-2">Price: Low to High</li>
                                <li className="hover:bg-[#44506D] hover:text-[#ffffff] p-2">Price: High to Low</li>
                            </ul>
                        </div>

                    </div>

                    <div>
                        {category?.products?.length ? (
                            category.products.map((product: any) => (
                                <div key={product.productId}>
                                    <h2>{product.productName}</h2>
                                    <p>{product.description}</p>
                                    <span>₱{product.productPrice}</span>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>

                </div>

            </div>



        </>
    )
}