import { Head, usePage, router } from "@inertiajs/react";
import Footer from "./components/footer";
import Navigation from "./components/navBar";
import { useState } from "react";

interface CartItemProps {
    id: number
    quantity: number
    productName: string
    productPrice: number
    imgUrl: string | null
    size: string
}

interface UserDataProps {
    fName: string
    address: string
    contactNo: string
}

interface CheckoutPageProps {
    user: UserDataProps
    cartItems: CartItemProps[]
    merchandiseSubtotal: number
    shippingFee: number
    totalAmount: number
}

interface PageProps {
    props: CheckoutPageProps
    [key: string]: any
}

export default function CheckOut() {
    const { props } = usePage<PageProps>()
    const { user, cartItems, merchandiseSubtotal, shippingFee, totalAmount } = props

    const [shippingAddress, setShippingAddress] = useState(user.address)
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'GCash' | 'Maya'>('COD')
    const [isProcessing, setIsProcessing] = useState(false)

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount)
    }

    const [showAlert, setShowAlert] = useState(false);

    const handlePlaceOrder = () => {
        setShowAlert(true); // Show alert when button is clicked
        setTimeout(() => setShowAlert(false), 4000); // Auto-hide after 3 seconds
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isProcessing) return

        setIsProcessing(true)

        router.post('/checkout/placeOrder', {

            totalAmount: totalAmount,
            shippingFee: shippingFee,
            shippingAddress: shippingAddress,

            paymentMethod: paymentMethod,
        }, {

            onSuccess: (page) => {
                alert('Order placed successfully! Redirecting to order history.')

                router.get('/userPage')
            },
            onError: (errors) => {

                const errorMessage = errors.message || 'Failed to place order.'
                alert(`Order Error: ${errorMessage}. Please check your cart and stock availability.`)
            },
            onFinish: () => {
                setIsProcessing(false)
            }
        })
    }

    return (
        <>
            <Head title="Checkout" />
            <Navigation />


            <div className="bg-white">
                {/* Purchase alert */}
                {showAlert && (
                    <div
                        role="alert"
                        className="alert alert-success fixed top-0 right-0 h-[3rem] w-[40rem] max-w-md shadow-lg animate-slide-down-fade"
                    >
                        <img src="confirm.gif" alt="" className="w-15" />
                        <span className="">You have successfully purchased the item(s).</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="w-full max-w-full overflow-x-hidden">

                        {/* checkout text */}
                        <div className="w-full h-auto border-b-2 border-black h-[8rem]">
                            <h1 className="text-5xl font-black px-10 py-8 text-[#515A70]">Checkout</h1>
                        </div>

                        {/* user's info */}
                        <div className="w-full pb-14 pt-2 grid grid-rows-2 grid-cols-2 border-b-2 border-black">
                            <div className="px-8 py-1 flex row-start-1">
                                <img src="pin-location.gif" alt="" className="h-8 " />
                                <h1 className="py-1 font-black text-[#515A70]">{user.fName}</h1>
                                <h1 className="py-1 px-2 text-[#ACC0EB] font-semibold">(+63) {user.contactNo}</h1>
                            </div>
                            <div className="w-[35rem] px-16 row-start-2 row-end-3 ">
                                <h1 className="text-[#515A70] font-semibold">{user.address}</h1>
                            </div>
                            <div className="row-start-2 row-end-3 text-center" >
                                <button className="text-[#515A70] font-semibold text-lg hover:btn-link ">edit</button>
                            </div>
                        </div>

                        {/* item ordered */}
                        <div className="flex items-center space-x-4 pl-8 py-8 border-b-2 border-black">

                            <div className="w-30 h-30 flex-shrink-0 bg-gray-600">
                                <img src={props.imgUrl} alt="Black pleated skirt" className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow">
                                <div className="flex  items-start">
                                    <div>
                                        <p className="text-lg font-semibold text-[#515A70] leading-tight">
                                            {props.productName}
                                        </p>
                                        <p className="text-sm text-[#515A70] mt-1">
                                            {props.productName}
                                        </p>
                                    </div>
                                    <div className="flex-grow flex justify-end items-center pr-[28.5rem]">
                                        <div className="text-[#515A70] text-lg mt-2 ">
                                            {props.quantity} pcs
                                        </div>
                                    </div>
                                </div>


                                <div className="mt-2">
                                    <p className="text-xl font-bold text-[#C65E61]">
                                        {props.propductPrice}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* delivery option */}
                        <div className="block items-center py-8 pl-8 pr-10 border-b-2 border-black">
                            <div className="flex justify-between items-start">
                                <h1 className="text-[#515A70] text-2xl font-black">Delivery option</h1> <button className="text-[#515A70] font-semiblack text-lg hover:btn-link font-semibold">View all &gt;</button>
                            </div>

                            <div className="w-full block rounded-lg border-2 border-black">
                                <div className="flex justify-between px-4 py-2">
                                    <h1 className="text-[#515A70] text-xl font-medium">Standard</h1>
                                    <h1 className="text-[#515A70] text-lg">₱40</h1>
                                </div>
                                <div className="flex items-center space-x-2 px-4">
                                    <img src="delivery (2).gif" alt="" className="h-10 w-10" />
                                    <h1 className="text-[#515A70] text-md font-thin">Guaranteed to get by 18-20 Sept</h1>
                                </div>

                            </div>

                            <div className="flex justify-between items-start pt-4">
                                <h1 className="text-[#515A70] text-xl font-semibold">Total {props.quantity} item(s)</h1>
                                <h1 className="text-xl font-bold text-[#C65E61]">{props.productPrice}</h1>
                            </div>
                        </div>

                        {/* payment method */}
                        <div className=" pb-10 pt-8 border-b-2 border-black">
                            <div className="flex justify-between items-start px-9">
                                <h1 className="text-[#515A70] text-2xl font-black">Payment Methods</h1>
                                <button className="text-[#515A70] font-semiblack text-lg hover:btn-link font-semibold">View all &gt;</button>
                            </div>

                            {/* payment options */}
                            <div className=" ">

                                {/* cash on delivery */}
                                <div className="flex items-center px-6 mb-2">
                                    <input
                                        type="radio"
                                        id="COD"
                                        name="payment"
                                        value="Mock_COD"
                                        checked={paymentMethod === 'Mock_COD'}
                                        onChange={() => setPaymentMethod('Mock_COD')}
                                        className="form-radio text-blue-600 "
                                        required
                                    />

                                    <label
                                        htmlFor="COD"
                                        className="inline-flex items-center justify-between p-4 rounded-lg text-[#515A70] cursor-pointer border-0 peer-checked:border
                                                    peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                                        <div className="flex space-x-4 items-center">
                                            <img src="cash.svg" alt="" className="w-10" />
                                            <h1 className="text-lg font-semibold">Cash on delivery</h1>
                                        </div>
                                    </label>
                                </div>

                                {/* gcash */}
                                <div className="flex items-center px-6 mb-2">
                                    <input
                                        type="radio"
                                        id="gcash"
                                        name="payment"
                                        value="Mock_GCash"
                                        checked={paymentMethod === 'Mock_GCash'}
                                        onChange={() => setPaymentMethod('Mock_GCash')}
                                        className="form-radio text-blue-600"
                                        required
                                    />

                                    <label
                                        htmlFor="gcash"
                                        className=" inline-flex items-center justify-between p-4 rounded-lg text-[#515A70] cursor-pointer border-0 peer-checked:border
                                                    peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                                        <div className="flex space-x-4 items-center">
                                            <img src="gcash.png" alt="" className="w-10" />
                                            <div className="block -space-y-1">
                                                <h1 className="text-lg font-semibold">63-{user.contactNo}</h1>
                                                <h6 className="text-sm font-thin">Gcash e-wallet</h6>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {/* paymaya */}
                                <div className="flex items-center px-6">
                                    <input
                                        type="radio"
                                        id="maya"
                                        name="payment"
                                        value="Mock_Maya"
                                        checked={paymentMethod === 'Mock_Maya'}
                                        onChange={() => setPaymentMethod('Mock_Maya')}
                                        className="form-radio text-blue-600"
                                        required
                                    />

                                    <label
                                        htmlFor="maya"
                                        className=" inline-flex items-center justify-between p-4 rounded-lg text-[#515A70] cursor-pointer border-0 peer-checked:border
                                                    peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                                        <div className="flex space-x-4 items-center">
                                            <img src="maya.jpg" alt="" className="w-10 h-8" />
                                            <div className="block -space-y-1">
                                                <h1 className="text-lg font-semibold">63-9*****78345</h1>
                                                <h6 className="text-sm font-thin">Maya e-wallet</h6>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            {/* Order Items List */}
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 text-blue-700 border-b pb-2">Order Summary</h2>
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex items-center justify-between border-b last:border-b-0 py-2">
                                            <div className="flex items-center space-x-4">
                                                <img src={item.imgUrl || 'placeholder.jpg'} alt={item.productName} className="w-16 h-16 object-cover rounded-md" />
                                                <div>
                                                    <p className="font-medium text-gray-800">{item.productName}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-800">
                                                {formatCurrency(item.productPrice * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* payment details */}
                    <div className="sticky bottom-0 absolute bg-white">
                        <div className=" px-5 pt-3 pb-4 border-b border-black border-t">
                            <h1 className="text-[#515A70] text-2xl font-black">Payment Details</h1>

                            <div className="flex justify-between items-start pt-2 pl-4">
                                <h6 className="text-[#515A70] text-md font-medium">Merchandise Subtotal</h6>
                                <h6 className="text-[#515A70] text-md font-medium">{formatCurrency(merchandiseSubtotal)}</h6>
                            </div>

                            <div className="flex justify-between items-start pl-4">
                                <h6 className="text-[#515A70] text-md font-medium">Shipping Subtotal</h6>
                                <h6 className="text-[#515A70] text-md font-medium">{formatCurrency(shippingFee)}</h6>
                            </div>

                        </div>

                        <div className="">
                            {/* total payment */}
                            <div className="flex justify-between items-start px-5 py-1">
                                <h6 className="text-[#515A70] text-md font-medium">Total payment</h6>
                                <h6 className="text-[#515A70] text-md font-medium">{props.productPrice}</h6>
                            </div>
                            <div className="flex justify-end space-x-4 right-0 items-center px-9 py-6">
                                <h1 className="text-[#515A70] text-md font-medium">Total</h1>
                                <h1 className="text-xl font-bold text-[#C65E61]">{props.productPrice}</h1>
                                <button
                                    type="submit"
                                    disabled={isProcessing || cartItems.length === 0}
                                    className={`mt-6 w-full py-3 rounded-lg text-white text-xl font-semibold transition duration-200 
                                    ${isProcessing || cartItems.length === 0
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {isProcessing ? 'Processing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            <Footer />
        </>
    )
}