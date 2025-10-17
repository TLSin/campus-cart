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

interface StudentReview {
    reviewId: number
    reviews: string
    createdAt: string
    studentName: string
    studentNo: string
}

interface ProductPageProps {
    product: Product
    productVariants: ProductVariants[]
    studentReviews: StudentReview[]
    [key: string]: any
}

interface ToastState {
    visible: boolean
    message: string
    type: 'alert-success' | 'alert-error'
}

export default function ProductPage() {
    const { product, productVariants, studentReviews } = usePage<ProductPageProps>().props

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

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        } catch {
            return dateString
        }
    }

    return (
        <>
            <Head title={product.productName} />

            <Navigation />
            {/* 
                Note: Settings here are for screen size 1280 * 1024
                TODO: Modify it for screen size 1920 * 1080 
            */}
            {/* Container */}
            <div className="flex flex-col items-center justify-center w-screen h-full bg-[#E0E4EC]">
                {/* Product Container */}
                <div className="w-[85%] h-[80dvh] bg-white rounded-lg shadow-lg m-[1.5rem] flex">
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
                    <div className="flex w-[40dvw] rounded-t-lg ml-[2rem] mt-[1rem] grid grid-auto-rows">
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
                                className="btn bg-white text-black border border-black hover:bg-gray-200 mr-[1rem] px-8 py-3"
                                onClick={handleAddtoCart}
                            >
                                Add to Cart
                            </button>
                            {/* <button className="btn bg-[#44506D] text-white border-none hover:bg-[#2C3653] mr-[2rem] px-8 py-3">Buy Now</button> */}
                        </div>
                    </div>
                </div>

                {
                    toast.visible &&
                    (
                        <div role="alert" className={`alert ${toast.type} absolute top-0 right-0 w-[30%] p-5 mt-[7rem] mr-[2rem]`}>
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
                <div className="w-[85%] h-auto bg-white rounded-lg shadow-lg mb-[1.5rem] p-4">
                    <h1 className="text-[#44506D] text-[1.5rem] font-bold mb-[1rem]">User Reviews</h1>
                    {/* User 1 Review */}
                    {studentReviews.length > 0 ? (
                        <div className="mb-[2rem]">
                            {studentReviews.map((review) => (
                                <>
                                    {/* user description */}
                                    <div className="mb-[rem]]">
                                        <div key={review.reviewId} className="flex space-x-4">
                                            <div className="bg-gray w-[3rem] h-[3rem] rounded-full flex justify-center items-center border border-black">
                                                <h1>{review.studentName.split(' ').map(n => n[0]).join('')}</h1>
                                            </div>
                                            <div className="flex flex-col">
                                                <h1 className="text-black text-[1rem] font-bold">{review.studentName}</h1>
                                                <p>{formatDate(review.createdAt)}</p>
                                            </div>
                                        </div>
                                        {/* user review */}
                                        <div className="ml-[4rem] mb-[1rem]">
                                            <p>{review.reviews}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    )
                        :
                        (
                            <p className="text-gray-500 italic">No student reviews have been posted for this product yet.</p>
                        )}
                </div>
            </div>
            <Footer />
        </>
    )
}