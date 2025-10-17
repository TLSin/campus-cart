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

    const [noItem, setNoItem] = useState([])
    const [firstName, setFirstName] = useState(user.fName)
    const [shippingAddress, setShippingAddress] = useState(user.address)
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'GCash'>('COD')
    const [isProcessing, setIsProcessing] = useState(false)

    // const list = {
    //     no: props.id.length + 1,
    //     name: `${noItem.length}`,
    // }

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
        if (isProcessing)
            return

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
                                <input 
                                    type="text" 
                                    value={user.fName}
                                    />
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
                        <div className="items-center align-center justfify-center space-x-4 border-b-2 border-black">
                            <div className="align-center items-center w-[100%] bg-black justify-center">
                                <h2 className="text-2xl text-[#515A70] font-bold mb-4 text-blue-700 border-b pb-2">Order Summary</h2>
                                <table className="table w-[80%] mb-[2rem] bg-white p-6 rounded-xl shadow-lg items-center">
                                    <thead className="border-b-2 border-[#44506D]">
                                        <tr>
                                            <th className="w-[5dvw] text-[#44506D] font-medium text-[1rem] text-center">No.</th>
                                            <th className="text-[#44506D] font-medium text-[1rem] text-center">Products</th>
                                            <th className="text-[#44506D] font-medium text-[1rem] text-center">Quantity</th>
                                            <th className="text-[#44506D] font-medium text-[1rem] text-center">Price</th>
                                        </tr>
                                    </thead>

                                    <tbody className="border-b-2 border-[#44506D] px-2 py-2 w-[100%]">
                                        {cartItems.map((item: any, index: number) => (
                                            <tr key={item.id} className="items-center justify-between border-b last:border-b-0 py-2">
                                                <th className="px-2 py-2 ">
                                                    <div className="text-center">
                                                        {index + 1}
                                                    </div>
                                                </th>
                                                <td className="px-2 py-2 align-center items-center">
                                                    <div className="flex items-center space-x-4 align-center items-center justify-center">
                                                        <div className="flex w-[10rem]">
                                                            <img
                                                                src={item.imgUrl || 'placeholder.jpg'} alt={item.productName}
                                                                className="w-16 h-16 object-contain rounded-md" />
                                                            <p className="font-medium text-gray-800 align-center text-center">{item.productName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-2 align-center">
                                                    <p className="text-sm text-gray-500 text-center">Qty: {item.quantity}</p>
                                                </td>
                                                <td className="px-2 py-2 align-center">
                                                    <p className="font-semibold text-gray-800 text-center">
                                                        {formatCurrency(item.productPrice * item.quantity)}
                                                    </p>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                            <div className="flex ">

                                {/* cash on delivery */}
                                <div className="flex items-center px-6 mb-2">
                                    <input
                                        type="radio"
                                        id="COD"
                                        name="payment"
                                        value="Mock_COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={() => setPaymentMethod('COD')}
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
                                        checked={paymentMethod === 'GCash'}
                                        onChange={() => setPaymentMethod('GCash')}
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
                            </div>


                        </div>

                    </div>
                    {/* payment details */}
                    <div className="sticky bottom-0 absolute bg-white">
                        <div className=" px-5 pt-3 pb-4 border-b border-black border-t">
                            <h1 className="text-[#515A70] text-2xl font-black">Payment Details</h1>

                            <div className="flex justify-between items-start pt-2 px-4">
                                <h6 className="text-[#515A70] text-md font-medium">Merchandise Subtotal</h6>
                                <h6 className="text-[#515A70] text-md font-medium">{formatCurrency(merchandiseSubtotal)}</h6>
                            </div>

                            <div className="flex justify-between items-start px-4">
                                <h6 className="text-[#515A70] text-md font-medium">Shipping Subtotal</h6>
                                <h6 className="text-[#515A70] text-md font-medium">{formatCurrency(shippingFee)}</h6>
                            </div>

                        </div>

                        <div className="">
                            {/* total payment */}
                            <div className="flex justify-between items-start px-9 py-1 w-full">
                                <h6 className="text-[#515A70] text-md font-medium">Total payment</h6>
                                <h6 className="text-red text-md font-medium">{formatCurrency(merchandiseSubtotal + shippingFee)}</h6>
                            </div>
                            <div className="flex justify-end space-x-4 right-0 items-center px-9 py-6">

                                <button
                                    type="submit"
                                    disabled={isProcessing || cartItems.length === 0}
                                    className={`mt-1 w-[12rem] py-3 rounded-lg text-white text-xl font-semibold transition duration-200 
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