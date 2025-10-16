import Navigation from "./components/navBar";
import Footer from "./components/footer";
import { useState } from "react";
import { ChevronDown, ChevronUp, Link } from "lucide-react";
import { usePage, router } from "@inertiajs/react"

interface Product {
    productId: number
    productName: string
    productPrice: number
    description: string
    imgUrl: string | null
}

interface CategoryProps {
    id: number
    name: string
    products: Product[]
}

interface CategoryResultProps {
    user: {
        id: number
        fName: string
    } | null
    category: CategoryProps | null
    [key: string]: any
}

export default function ResultPage() {
    const { category } = usePage<CategoryResultProps>().props

    const [showMore, setShowMore] = useState(false);
    const [active, setActive] = useState("Relevance");

    const products = category?.products || []
    const categoryName = category?.name || 'All Results'

    const buttons = ["Relevance", "Latest", "Top Sales"];

    const categories = [
        "School Supplies",
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

    const categoryClick = (id: number) => {
        router.get(`/resultPage/${id}`)
    }

    return (
        <>
            <Navigation />


            <div className="w-screen h-full flex">

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
                                    <li
                                        key={category}
                                        className="hover:text-blue-600 hover:underline cursor-pointer text-md text-[#515A70] font-semibold"
                                        onClick={() => categoryClick}>
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

                {/* Main Result Area */}
                {/*search result  */}
                <div className="h-screen w-[50%]">
                    <div className="flex space-x-2 pt-10 pl-4">
                        <img src="idea.svg" alt="" className="w-6" />
                        <h1>Result for '<span className="text-[#C65E61]">{categoryName}</span>'</h1>
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
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div className="grid">
                                    <div key={product.productId} className="bg-bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer group">
                                        <div className="h-auto w-[10dvw] bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                                            <img
                                                src={product.imgUrl || ""}
                                                alt={product.productName}
                                                className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-105"

                                            />
                                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{categoryName}</div>
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h2 className="text-lg font-bold text-[#44506D] truncate group-hover:text-[#C65E61] transition-colors">{product.productName}</h2>
                                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                            <span className="text-2xl font-black text-[#C65E61]">
                                                ₱{Number(product.productPrice || 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full w-full text-center p-16 bg-white rounded-xl border-4 border-dashed border-gray-300 shadow-inner">
                                <h2 className="text-3xl font-bold text-gray-700 mb-4">
                                    No Matching Products Found 😔
                                </h2>
                                <p className="text-lg text-gray-500">
                                    The category **"{categoryName}"** currently has no products listed.
                                    Please check back later or try a different category.
                                </p>
                            </div>
                        )}
                    </div>

                </div>

            </div>

            <Footer />


        </>
    )
}