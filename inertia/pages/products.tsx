import Navigation from "./components/navBar"
import Footer from "./components/footer"
import DynamicDescription from "./components/dynamicDescription"
import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { Head, usePage, router } from "@inertiajs/react";

interface ProductVariants {
    productId: number
    productName: string
    productPrice: number
    imgUrl: string | null
}

interface Product {
    productId: number
    productName: string
    productPrice: number
    imgUrl: string | null
    description: string
    descriptionId: number
    subImages: string[]
}

interface ProductPageProps {
    product: Product
    productVariants: ProductVariants[]
    [key: string]: any
}

interface ToastState {
    visible: boolean
    message: string
    type: 'alert-success' | 'alert-error'
}

export default function ProductPage() {
    const { product, productVariants } = usePage<ProductPageProps>().props
    const [mainImage, setMainImage] = useState(product.imgUrl || '')
    const [toast, setToast] = useState<ToastState>({ visible: false, message: '', type: 'alert-success' })
    const [quantity, setQuantity] = useState(1)
    const [selectedProductId, setSelectedProductId] = useState(product.productId)

    const handleImageHover = (imageUrl: string) => {
        setMainImage(imageUrl)
    }

    const showToast = (message: string, type: 'alert-success' | 'alert-error') => {
        setToast({ visible: true, message, type })
        setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }))
        }, 3000)
    }

    const handleVariantSelect = (productId: number) => {
        setSelectedProductId(productId)
        const newVariant = productVariants.find(v => v.productId === productId)
        if (newVariant && newVariant.imgUrl) {
            setMainImage(newVariant.imgUrl)
        }
    }

    const handleAddtoCart = () => {
        if (quantity < 1) {
            showToast('Quantity must be atleast 1', 'alert-error')
            return;
        }

        router.post('/products', {
            productId: selectedProductId, quantity: quantity
        },
            {   
                preserveScroll: true,
                onSuccess: () => {
                    showToast('Added to cart!', 'alert-success')
                },
                onError: (errors) => {
                    console.log(errors)
                    showToast('Failed to add to cart. Please try again.', 'alert-error')
                }
            },

        )
    }

    const selectedVariantPrice = useMemo(() => {
        return productVariants.find(v => v.productId === selectedProductId)?.productPrice || product.productPrice
    }, [selectedProductId, product.productPrice, productVariants])

    return (
        <>
            <Head title={product.productName} />

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
                    <div className="w-[40dvw] h-[73dvh] rounded-t-lg ml-[1.5rem] mt-[1.5rem] overflow-hidden">
                        {/* Main Image */}
                        <div className="flex h-[50dvh] shadow-lg">
                            <img src={mainImage} className="h-[50dvh] w-[40dvw] object-contain rounded-lg aspect-video" alt="Main Image" />
                        </div>
                        {/* Sub-Image */}
                        <div className="flex mt-[0.5rem] space=x mt-[1.5rem] overflow-x-scroll pb-[1rem]">
                            {product.subImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    className="h-[7rem] w-[7rem] object-cover rounded-lg cursor-pointer shadow-md"
                                    onMouseEnter={() => handleImageHover(image)}
                                    onClick={() => handleImageHover(image)}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Product Details Container */}
                    <div className="flex w-[40dvw] rounded-t-lg ml-[2rem] mt-[1rem] grid grid-rows-3">
                        {/* Product Details Row 1 */}
                        <div className="h-[60dvh] p-4 row-span-2">
                            <h1 className="text-[#44506D] text-[1.7rem]">{product.productName}</h1>
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
                            <h2 className="text-red-600 text-[1.5rem] font-bold ml-[1rem] ">₱{selectedVariantPrice}</h2>
                            {/* Other Details */}

                            <DynamicDescription 
                                descriptionId={product.descriptionId}
                                productVariants={productVariants}
                                selectedProductId={selectedProductId}
                                onVariantSelect={handleVariantSelect}
                                quantity={quantity}
                                onQuantityChange={setQuantity as Dispatch<SetStateAction<number>>}
                            />

                        </div>
                        {/* Action Buttons Container */}
                        <div className="flex justify-end items-bottom mt-[2rem] align-end">
                            <button
                                className="btn bg-white text-black border-black hover:bg-gray-200 mr-[1rem] px-8 py-3"
                                onClick={handleAddtoCart}
                            >
                                Add to Cart
                            </button>
                            <button className="btn bg-[#44506D] text-white border-none hover:bg-[#2C3653] mr-[2rem] px-8 py-3">Buy Now</button>
                        </div>
                    </div>
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

                {/* Product Descriptions */}
                <div className="w-[85dvw] h-auto bg-white rounded-lg shadow-lg mb-[1.5rem] p-4">
                    <h1 className="text-[#44506D] text-[1.5rem] font-bold mb-[1rem]">Product Description</h1>
                    <p>
                        {product.description}
                    </p>
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