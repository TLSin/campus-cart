import { useState } from "react";
import { router } from "@inertiajs/react";
import Product from "#models/product";

interface CategoryProps {
    user: {
        id: string
        fName: string
    } | null
    category: {
        id: number
        name: string
        products: Product[]
    }
}

export default function Category() {
    const [hover, setHover] = useState<number | null>(null);
    const category = [
        { id: 1, name: "School Supplies", path: "M544-400 440-504 240-304l104 104 200-200Zm-47-161 104 104 199-199-104-104-199 199Zm-84-28 216 216-229 229q-24 24-56 24t-56-24l-2-2-26 26H60l126-126-2-2q-24-24-24-56t24-56l229-229Zm0 0 227-227q24-24 56-24t56 24l104 104q24 24 24 56t-24 56L629-373 413-589Z" },
        { id: 2, name: "Books & Modules", path: "M270-80q-45 0-77.5-30.5T160-186v-558q0-38 23.5-68t61.5-38l395-78v640l-379 76q-9 2-15 9.5t-6 16.5q0 11 9 18.5t21 7.5h450v-640h80v720H270Zm90-233 200-39v-478l-200 39v478Zm-80 16v-478l-15 3q-11 2-18 9.5t-7 18.5v457q5-2 10.5-3.5T261-293l19-4Zm-40-472v482-482Z" },
        { id: 3, name: "Uniforms", path: "m240-522-40 22q-14 8-30 4t-24-18L66-654q-8-14-4-30t18-24l230-132h70q9 0 14.5 5.5T400-820v20q0 33 23.5 56.5T480-720q33 0 56.5-23.5T560-800v-20q0-9 5.5-14.5T580-840h70l230 132q14 8 18 24t-4 30l-80 140q-8 14-23.5 17.5T760-501l-40-20v361q0 17-11.5 28.5T680-120H280q-17 0-28.5-11.5T240-160v-362Zm80-134v456h320v-456l124 68 42-70-172-100q-15 51-56.5 84.5T480-640q-56 0-97.5-33.5T326-758L154-658l42 70 124-68Zm160 177Z" },
        { id: 4, name: "Electronics", path: "M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" },
        { id: 5, name: "Accessories", path: "M360-500v-60h240v60H360Zm40 120v-60h160v60H400Zm20-420h120-120Zm0 640h120-120Zm-60 80-54-182q-48-38-77-95t-29-123q0-66 29-123t77-95l54-182h240l54 182q48 38 77 95t29 123q0 66-29 123t-77 95L600-80H360Zm120-200q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm-76-470q20-5 38.5-8t37.5-3q19 0 37.5 3t38.5 8l-16-50H420l-16 50Zm16 590h120l16-50q-20 5-38.5 7.5T480-200q-19 0-37.5-2.5T404-210l16 50Z" },
        { id: 6, name: "Computer Peripherals", path: "M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z" },
        { id: 7, name: "Sports and Fitness", path: "m480-80-20-400-140-40H40v-80h240l280-200 52 61-166 119h114l312-180 48 56-340 264-20 400h-80ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Z" },
        { id: 8, name: "Merchs", path: "M200-80q-33 0-56.5-23.5T120-160v-480q0-33 23.5-56.5T200-720h80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720h80q33 0 56.5 23.5T840-640v480q0 33-23.5 56.5T760-80H200Zm0-80h560v-480H200v480Zm280-240q83 0 141.5-58.5T680-600h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85h-80q0 83 58.5 141.5T480-400ZM360-720h240q0-50-35-85t-85-35q-50 0-85 35t-35 85ZM200-160v-480 480Z" },
        { id: 9, name: "Souvenirs", path: "M160-120v-80h640v80H160Zm160-160q-66 0-113-47t-47-113v-400h640q33 0 56.5 23.5T880-760v120q0 33-23.5 56.5T800-560h-80v120q0 66-47 113t-113 47H320Zm0-80h240q33 0 56.5-23.5T640-440v-320H240v320q0 33 23.5 56.5T320-360Zm400-280h80v-120h-80v120ZM320-360h-80 400-320Z" },
        { id: 10, name: "Event Tickets", path: "m368-320 112-84 110 84-42-136 112-88H524l-44-136-44 136H300l110 88-42 136ZM160-160q-33 0-56.5-23.5T80-240v-135q0-11 7-19t18-10q24-8 39.5-29t15.5-47q0-26-15.5-47T105-556q-11-2-18-10t-7-19v-135q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v135q0 11-7 19t-18 10q-24 8-39.5 29T800-480q0 26 15.5 47t39.5 29q11 2 18 10t7 19v135q0 33-23.5 56.5T800-160H160Zm0-80h640v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102Zm320-240Z" },
    ]

    const categoryClick = (id: number) => {
        router.get(`/resultPage/${id}`)

    }

    return (
        <div className="w-full bg-[#F5F5F5] grid grid-cols-1  justify-between items-center p-5">
            <h3 className="text-[2rem] text-[#44506D] font-bold border border-[#eceff7] px-[1rem] py-[1.5rem]">Category</h3>
            <div className="grid grid-cols-5 place-items-center shadow-lg mb-[2rem]">
                {category.map((cat) => (
                    <button key={cat.id}
                        onMouseEnter={() => setHover(cat.id)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => categoryClick(cat.id)}
                        className="text-[#44506D] text-[1rem] text-center align-center justify-center p-1
                                w-full h-full my-[1.6dvh] rounded-none hover:bg-[#BFC7E3] hover:text-white 
                                hover:outline-white border border-[#eceff7]">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="40" height="40"
                            viewBox="0 -960 960 960"
                            className="align-center justify-center mx-auto my-[1rem]">
                            <path fill={hover === cat.id ? "white" : "#44506D"}
                                fill-rule="evenodd"
                                d={cat.path}
                                clip-rule="evenodd" />
                        </svg>
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
