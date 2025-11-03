import { useState } from "react"
import { router } from "@inertiajs/react"

interface Product {
    productId: number
    productName: string
    productPrice: number
    imgUrl: string | null
}

interface FeatureoductProps {
    products: Product[]
    [key: string]: any
}

interface ToastState {
    visible: boolean
    message: string
    type: 'alert-success' | 'alert-error'
}

export default function Feature({ products }: FeatureoductProps) {
    const [page, setPage] = useState(0)
    const [toast, setToast] = useState<ToastState>({ visible: false, message: '', type: 'alert-success' })
    const pageSize = 7
    const totalPages = Math.ceil(products.length / pageSize)

    const paginated = products.slice(page * pageSize, (page + 1) * pageSize)

    const showToast = (message: string, type: 'alert-success' | 'alert-error') => {
        setToast({ visible: true, message, type })
        setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }))
        }, 3000)
    }

    const handleAddtoCart = (productId: number) => {
        const product = products.find(p => p.productId === productId)
        const productName = product?.productName || 'Product'

        router.post('/home', { productId }, {
            preserveScroll: true,
            onSuccess: () => {
                showToast(`${productName} added to cart!`, 'alert-success')
            },
            onError: (errors) => {
                showToast('Failed to add to cart. Please try again.', 'alert-error')
                console.log(errors)
            }
        })
    }

    const handleNavigateToProduct = (productId: number) => {
        router.get(`/products/${productId}`)
        console.log(router.get(`/products/${productId}`))
    }

    return (
        <>
            <div className="bg-white mx-2 rounded-xl shadow-lg my-[2rem] overflow-hidden">
                <div className="bg-red-300">
                    <h2 className="text-white text-[2rem] font-bold ml-[1rem] mt-[1rem]">Feature Product</h2>
                </div>
                <div className="carousel w-full flex">
                    {/* Item list of products*/}
                    <div className="carousel-item relative w-full shadow-lg rounded-lg bg-white grid grid-cols-7 gap-3 justify-items-center overflox-x-hidden">
                        {paginated.length > 0 ? (
                            paginated.map(product => (
                                // Product Card
                                <div
                                    key={product.productId}
                                    className="w-60 md:w-44 2xl:w-60 bg-gray-50 p-3 flex flex-col col-span-1 shadow-lg rounded-lg mb-[1rem] hover:cursor-pointer"
                                >
                                    {product.imgUrl ? (
                                        <img src={product.imgUrl} className="h-48 object-contain"
                                            onClick={() => handleNavigateToProduct(product.productId)} />
                                    ) : (
                                        <div className="h-48 bg-gray-200 animate-pulse" />
                                    )}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row justify-between h-auto">
                                            <div className="flex flex-col h-[3rem]">
                                                <span className="text-[0.8rem] font-bold text-black">{product.productName}</span>
                                            </div>
                                            <span className="font-bold  text-red-600">{product.productPrice}</span>
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
                                className="btn btn-circle hover:bg-gray-300 hover:text-white active:text-black"
                                onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
                                disabled={totalPages <= 1}
                            >
                                ❮
                            </button>
                            <button
                                className="btn btn-circle hover:bg-gray-300 hover:text-white active:text-black"
                                onClick={() => setPage((p) => (p + 1) % totalPages)}
                                disabled={totalPages <= 1}
                            >
                                ❯
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                toast.visible && (
                    <div role="alert" className={`alert ${toast.type} absolute top-0 right-0 w-[30%] p-5 mt-[2rem] mr-[2rem]`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-white" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white text-[1rem]">{toast.message}</span>
                    </div>)
            }
        </>
    )
}