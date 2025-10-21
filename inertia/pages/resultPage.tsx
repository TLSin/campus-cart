import Navigation from "./components/navBar";
import Footer from "./components/footer";
import { useState, useEffect } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react"

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

    const [showMore, setShowMore] = useState(false)
    const [active, setActive] = useState("Relevance")
    const [reload, setReload] = useState(false)
    const products = category?.products || []
    const categoryName = category?.name || 'All Results'

    const buttons = ["Relevance", "Latest", "Top Sales"]

    useEffect(() => {
        console.log('reloaded')
    }, [reload])

    const categories = [
        { id: 1, name: "School Supplies" },
        { id: 2, name: "Book & Modules" },
        { id: 3, name: "Uniforms" },
        { id: 4, name: "Electronics" },
        { id: 5, name: "Accessories" },
        { id: 6, name: "Computer Peripherals" },
        { id: 7, name: "Sports and Fitness" },
        { id: 8, name: "Merchs" },
        { id: 9, name: "Souvenirs" },
        { id: 10, name: "Event Tickets" },
    ]

    const handleNavigateToProduct = (productId: number) => {
        router.get(`/products/${productId}`)
        console.log(router.get(`/products/${productId}`))
    }

    const categoryClick = (id: number) => {
        setReload(true)
        router.get(`/resultPage/${id}`)

    }

    return (
        <>
            <Head title={category?.name} />
            <Navigation />
            <div className="w-screen flex bg-white">

                {/* search filter */}
                <div className="h-screen w-[30%] sticky top-0">
                    <button className="w-[7rem] ml-[6rem] mt-[1rem]">
                        <Link href='/' className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                            </svg>
                            <h5>Go Back</h5>
                        </Link>
                    </button>
                    <div className="flex w-full justify-center gap-2 pt-10">
                        <img src="search.svg" alt="" className="w-" />
                        <h1 className="text-xl font-bold text-[#515A70]">Search Filter</h1>
                    </div>

                    {/* other items */}
                    <div className="w-full h-5 block pl-24 pt-2 ">

                        <div className="flex justify-center">
                            <ul className=" space-y-2 list-disc">
                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="hover:text-blue-600 hover:underline cursor-pointer text-md text-[#515A70] font-semibold list-none"
                                        onClick={() => categoryClick(category.id)}>
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-center" >
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="mt-4 flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Result Area */}
                {/*search result  */}
                <div className="h-auto w-[60dvw]">
                    <div className="flex space-x-2 pt-10">
                        <img src="idea.svg" alt="" className="w-6" />
                        <h1>Result for '<span className="text-[#C65E61]">{categoryName}</span>'</h1>
                    </div>

                    {/* sort */}
                    <div className="flex w-full pl-6 mt-2 h-15 items-center gap-4 bg-[#8698BC]">

                        <span className="text-white">Sort by</span>
                        {buttons.map((btn) => (
                            <button
                                key={btn}
                                onClick={() => setActive(btn)}
                                className={` p-2 
                            ${active === btn ? "bg-[#44506D] text-[#FFFFFF]" : " bg-[#949EC0] hover:text-[#FFFFFF] hover:bg-[#44506D]"}`}>{btn}</button>


                        ))}

                        <div className="dropdown dropdown-bottom">
                            <div tabIndex={0} role="button" className="flex  m-1 bg-[#ABB1CF] hover:bg-[#44506D] hover:text-[#ffffff] p-2">Price</div>
                            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 mt-2 shadow-sm bg-[#ABB1CF] gap-2 ">
                                <li className="hover:bg-[#44506D] hover:text-[#ffffff] p-2">Price: Low to High</li>
                                <li className="hover:bg-[#44506D] hover:text-[#ffffff] p-2">Price: High to Low</li>
                            </ul>
                        </div>

                    </div>

                    <div className="grid grid-cols-5 gap-4 align-items-center">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div className="w-auto mt-[1rem]
                                ">
                                    <div
                                        key={product.productId}
                                        onClick={() => handleNavigateToProduct(product.productId)}
                                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer group h-[22rem] w-auto item-center justify-center overflow-hidden"
                                    >
                                        <div className="h-60 overflow-hidden">
                                            <img
                                                src={product.imgUrl || ""}
                                                alt={product.productName}
                                                className="object-cover duration-500 group-hover:scale-105 w-[100%] h-[100%]"

                                            />
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h2 className="text-lg font-bold text-[#44506D] truncate group-hover:text-[#C65E61] transition-colors">{product.productName}</h2>
                                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                            <span className="text-md font-bold text-[#C65E61]">
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