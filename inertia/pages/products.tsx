import Navigation from "./components/navBar"
import Footer from "./components/footer"
import DynamicDescription from "./components/dynamicDescription"
import { useState, useMemo, Dispatch, SetStateAction, useEffect } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"

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
    groupId: number
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

const markdownClasses = {
    h1: (props: any) => <h1 className="text-xl font-bold mb-2" {...props} />,
    p: (props: any) => <p className="mb-2" {...props} />,
    a: (props: any) => <a className="text-blue-600 underline" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside ml-4" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside ml-4" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-2" {...props} />,
    code: (props: any) => <code className="bg-gray-200 p-1 rounded text-sm" {...props} />,
    pre: (props: any) => <pre className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto text-sm" {...props} />,
    table: (props: any) => <table className="table-auto w-full border-collapse border border-gray-400 my-2" {...props} />,
    th: (props: any) => <th className="border border-gray-400 px-2 py-1 bg-gray-100" {...props} />,
    td: (props: any) => <td className="border border-gray-400 px-2 py-1" {...props} />,
}

export default function ProductPage() {
    const { product, productVariants, studentReviews } = usePage<ProductPageProps>().props

    const [mainImage, setMainImage] = useState(product.imgUrl || '')
    const [toast, setToast] = useState<ToastState>({ visible: false, message: '', type: 'alert-success' })
    const [quantity, setQuantity] = useState(1)
    const [selectedProductId, setSelectedProductId] = useState(product.productId)
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(true);
    const [isPosting, setIsPosting] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
            console.log('reloaded')
        }, [reload])

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

    const handleReviewSubmit = () => {
        if (isPosting || !comment.trim) return

        setIsPosting(true)
        setReload(true)

        router.post('/reviews', {
            groupId: product.groupId,
            reviews: comment,
        }, {
            onSuccess: () => {
                setReload(prev => !prev)
                setComment('')
            },
            onStart: () => setIsPosting(true),
            onFinish: () => {
                setIsPosting(false)
                setReload(false)
            },
            preserveScroll: true
        })
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
                <button className="w-[7rem] translate-x-[-23dvw] mt-[1rem]">
                    <Link href='/' className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                        </svg>
                        <h5>Go Back</h5>
                    </Link>
                </button>
                {/* Product Container */}
                <div className="w-[85%] h-[80dvh] bg-white rounded-lg shadow-lg m-[1.5rem] my-[2rem] flex">
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
                                {/* <div className="flex items-center border-r border-[#44506D]">
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
                                </div> */}
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {product.description}
                    </ReactMarkdown>
                </div>

                {/* User Reviews */}
                <div className="w-[85%] h-auto bg-white rounded-lg shadow-lg mb-[1.5rem] p-4">
                    <h1 className="text-[#44506D] text-[1.5rem] font-bold mb-[1rem]">User Reviews</h1>
                    {/* User 1 Review */}
                    {studentReviews.length > 0 ? (
                        <div className="mb-[2rem] mx-[2rem]">
                            {studentReviews.map((review) => (
                                <>
                                    {/* user description */}
                                    <div className="mb-[1rem]  border-b ">
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
                <div className="w-[85%] h-auto bg-white rounded-lg shadow-lg mb-[1.5rem] p-4">
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className={`px-4 py-1 text-sm rounded transition-colors ${isEditing ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className={`px-4 py-1 text-sm rounded transition-colors ${!isEditing ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            Preview
                        </button>
                    </div>

                    {/* Input / Preview Area */}
                    <div className='w-full'>
                        {isEditing ? (
                            // EDIT MODE (Textarea)
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Type your comment here (Markdown supported)..."
                                rows={6}
                                disabled={isPosting}
                                className="markdown-input-field w-full p-3 rounded-lg resize-none focus:outline-none"
                            />
                        ) : (
                            // PREVIEW MODE (Markdown Renderer)
                            <div className="markdown-preview-container w-full min-h-[150px] p-3 rounded-lg overflow-auto text-sm">
                                {comment.trim() ? (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={markdownClasses} // Use the inline defined classes
                                    >
                                        {comment}
                                    </ReactMarkdown>
                                ) : (
                                    <p className="text-gray-500 italic">Nothing to preview. Start typing!</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleReviewSubmit}
                            disabled={!comment.trim() || isPosting}
                            className="markdown-button px-6 py-2 rounded-lg text-lg font-semibold disabled:opacity-50"
                        >
                            {isPosting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}