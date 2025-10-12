import { usePage, router } from "@inertiajs/react"

interface Product {
    productId: number
    productName: string
    productPrice: number
    imgUrl: string | null
}

interface DailyProductProps {
    products: Product[]
    [key: string]: any
}

export default function DailyProduct({ products }) {
    const handleAddtoCart = (productId: number) => {
        router.post('/cartPage', { productId } , {
            preserveScroll: true,
            onSuccess: () => {
                console.log(`${productId} added to cart`)
            },
            onError: (errors) => {
                console.error("error", errors)
                alert("Failed to add to cart")
            }
        })
    }

    console.log(products)
    return (
        <>
            <div className="flex bg-red-700 items-center grid grid-cols-1 p-4">
                <div className="flex col-span-1">
                    <h1 className="text-xl align-items-start ml-[1rem]">Daily Product</h1>
                </div>
                {/* Items Container */}
                {/* Random Products */}
                <div className="grid grid-cols-6 gap-4 justify-items-center w-full">
                    {/* Item 1 */}
                    {products && products.length > 0 ? (products.map(product => (
                        <div key={product.productId} className="w-50 h-65 bg-gray-50 p-3 flex flex-col gap-1 col-span-1">
                            <div className="duration-500 contrast-50 h-48 bg-gradient-to-bl from-black via-orange-900 to-indigo-600  hover:contrast-100">
                                <img src={product.imgUrl} alt={product.productName} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[1rem] h-[3rem] text-black font-bold">{product.productName}</span>
                                    </div>
                                    <span className="font-bold  text-red-600">{product.productPrice}</span>
                                </div>
                                <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2"
                                        onClick={() => handleAddtoCart(product.productId)}>Add to cart</button>
                            </div>
                        </div>
                    ))) : (
                        <>
                            <div className="w-50 h-65 bg-gray-200 animate-pulse flex items-center justify-center">
                                <span className="text-gray-400">No products available</span>
                            </div>
                        </>
                    )}
                </div>
                {/* Load more button */}
                <div className="flex align-items-center">
                    <button
                        className="bg-red-500 text-[1rem] text-white">Load More</button>
                </div>
            </div>
        </>
    )
}