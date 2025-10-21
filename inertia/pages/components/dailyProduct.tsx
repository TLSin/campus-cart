import { usePage, router } from "@inertiajs/react"
import { useState } from "react"

interface Product {
    productId: number
    productName: string
    productPrice: number
    imgUrl: string | null
}

interface DailyProductProps {
    products: Product[]
    // [key: string]: any
}

interface ToastState {
    visible: boolean
    message: string
    type: 'alert-success' | 'alert-error'
}

export default function DailyProduct({ products }: DailyProductProps) {
    const [toast, setToast] = useState<ToastState>({ visible: false, message: '', type: 'alert-success' })
    const [visibleProducts, setVisibleProducts] = useState(12)

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

    const handleLoadMore = () => {
        setVisibleProducts((prev) => prev + 12)
    }

    // console.log(products)
    return (
        <>
            <div className="bg-[#e6f4f1] mx-2 h-auto rounded-xl shadow-lg mb-[2rem] overflow-hidden">
                <div className="bg-blue-400 mt-6 p-2">
                    <h1 className="text-3xl text-white align-items-start ml-[1rem] font-bold">Daily Product</h1>
                </div>
                {/* Items Container that is random selected*/}
                <div className="grid grid-cols-6 gap-1 px-[5rem] justify-items-center w-full h-auto mt-4 overflow-hidden">
                    {/* Items that going to be rendered dynamically */}
                    {products && products.length > 0 ? (
                        products.map(product => (
                        // Item Card for the product
                        <div key={product.productId} 
                            className="w-60 h-auto bg-gray-50 p-3 flex flex-col col-span-1 rounded-lg shadow-lg mb-[1rem] hover:cursor-pointer hover:shadow-[#bfd6d9] hover:shadow-2xl"
                            
                            >
                            <img 
                                src={product.imgUrl || ''} alt={product.productName} className="h-48 object-cover"
                                onClick={() => handleNavigateToProduct(product.productId)}
                            />
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[0.8rem] h-[3rem] text-black font-bold">{product.productName}</span>
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
                {/* <div className="flex align-items-center justify-center w-[100%] mt-[2rem]">
                    <button
                        className="bg-red-500 text-[1rem] text-white p-2 rounded-lg">Load More</button>
                </div> */}
            </div>
            {
                toast.visible &&
                (
                    <div role="alert" className={`alert ${toast.type} absolute top-0 right-0 w-[30%] p-5 mt-[2rem] mr-[2rem]`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-white" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white text-[1rem]">{toast.message}</span>
                    </div>
                )
            }
        </>
    )
}