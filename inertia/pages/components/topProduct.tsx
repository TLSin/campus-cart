import { useState } from "react"
import { router } from "@inertiajs/react"

interface Product {
    productId: number
    productName: string
    productPrice: number
    imgUrl: string | null
}

interface TopProductProps {
    products: Product[]
    [key: string]: any
}

export default function TopProduct({ products }) {
    const [page, setPage] = useState(0)
    const pageSize = 6
    const totalPages = Math.ceil(products.length / pageSize)

    const paginated = products.slice(page * pageSize, (page + 1) * pageSize)
    const handleAddtoCart = (productId: number) => {
        router.post('/cartPage', { productId }, {
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
    return (
        <>
            <div className="backdrop-blur-sm">
                <h2 className="text-black text-[2rem] font-bold ml-[1rem] mt-[1rem]">Top Product</h2>
                <div className="carousel w-full flex">
                    {/* Item list of products*/}
                    <div className="carousel-item relative w-full shadow-lg rounded-lg bg-white grid grid-cols-6 gap-4 justify-items-center">
                        {paginated.length > 0 ? (
                            paginated.map(product => (
                                <div key={product.productId} className="w-50 h-65 bg-gray-50 p-3 flex flex-col gap-1 col-span-1">
                                    {product.imgUrl ? (
                                        <img src={product.imgUrl} className="h-48 object-cover" />
                                    ) : (
                                        <div className="h-48 bg-gray-200 animate-pulse" />
                                    )}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[0.8rem] text-black h-[3rem] font-bold">{product.productName}</span>
                                            </div>
                                            <span className="font-bold text-[1rem] text-red-600">{product.productPrice}</span>
                                        </div>
                                        <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2"
                                                onClick={() => handleAddtoCart(product.productId)}>Add to cart</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            Array.from({ length: pageSize }).map((_, i) => (
                                <div key={i} className="w-50 h-65 bg-gray-200 animate-pulse flex flex-col gap-1 col-span-1" />
                            ))
                        )}
                        {/* Item Card of the products */}

                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between mt-[1rem]">
                            <button
                                className="btn btn-circle"
                                onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
                                disabled={totalPages <= 1}
                            >
                                ❮
                            </button>
                            <button
                                className="btn btn-circle"
                                onClick={() => setPage((p) => (p + 1) % totalPages)}
                                disabled={totalPages <= 1}
                            >
                                ❯
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}