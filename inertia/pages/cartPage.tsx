import Navigation from "./components/navBar"
import Footer from "./components/footer"
import { useState } from "react"
import { Head, router, usePage } from '@inertiajs/react'

interface CartItemData {
    cartItemId: number
    productId: number
    productName: string
    productPrice: number
    quantity: number
    itemTotal: string
}

interface CartPageProps {
    cartItems: CartItemData[]
    subtotal: string
    user: { fName: string }
}

export default function CartPage() {
    const { cartItems, subtotal } = usePage<CartPageProps>().props

    const [checkedItems, setCheckedItems] = useState<number[]>([])
    const handleCheckAll = () => {
        const allChecked = checkedItems.length === cartItems.length
        if (!allChecked) {
            setCheckedItems(cartItems.map(item => item.cartItemId))
        } else {
            setCheckedItems([])
        }
    }

    const handleCheckItem = (id: number) => {
        setCheckedItems((prev) => {
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        })
    }

    const handleQuantityChange = (cartItemId: number, currentQuantity: number, action: 'add' | 'subract') => {
        let newQuantity = action === 'add' ? currentQuantity + 1 : currentQuantity - 1
        if (newQuantity < 1) return;
        router.put(`/cartPage/update/${cartItemId}`, { quantity: newQuantity }, {
            preserveScroll: true,
            preserveState: true
        })
    }

    const handleRemoveItem = (cartItemId: number) => {
        if (!confirm('Are you sure you want to remove this item from your cart?')) return
        router.delete(`/cartPage/${cartItemId}`, {
            preserveScroll: true
        })
    }

    const selectedSubtotal = cartItems
        .filter(item => checkedItems.includes(item.cartItemId))
        .reduce((sum, item) => sum + item.productPrice * item.quantity, 0)
        .toFixed(2)


    return (
        <>
            <Head title="Dormio" />
            <Navigation />
            {/* 
                Note: Settings here are for screen size 1280 * 1024
                TODO: Modify it for screen size 1920 * 1080 
            */}
            <div className="h-[69.38dvh] w-full">
                <h1 className="flex text-[3rem] font-bold text-[#515A70] ml-[1rem] mb-[2rem]">Shopping Cart</h1>
                <div className="overflow-x-auto">
                    <table className="table w-[95dvw] ml-[1rem] mb-[2rem]">
                        {/* Head */}
                        <thead className="border-b-2 border-[#44506D]">
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox p-1 rounded-none outline outline-[#99AAD0]"
                                            checked={cartItems.length > 0 && checkedItems.length === cartItems.length}
                                            onChange={handleCheckAll}
                                        />
                                    </label>
                                </th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center"> </th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center">Products</th>

                                <th className="text-[#44506D] font-medium text-[1rem] text-center">Price</th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center">Quantity</th>
                                <th className="text-[#44506D] font-medium text-[1rem] text-center"> </th>
                            </tr>
                        </thead>
                        <tbody className="border-b-2 border-[#44506D] h-[5dvh] px-2 py-2">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <tr key={item.cartItemId}>
                                        {/* Checkbox */}
                                        <th className="px-2 py-2 align-center">
                                            <label>
                                                <input type="checkbox" className={`checkbox p-1 rounded-none justify-center outline outline-[#99AAD0] ${checkedItems.includes(item.cartItemId) ? 'bg-[#44506D]' : 'bg-transparent'}`}
                                                    checked={checkedItems.includes(item.cartItemId)}
                                                    onChange={() => handleCheckItem(item.cartItemId)} />
                                            </label>
                                        </th>
                                        {/* Product Image */}
                                        <td>
                                            {/* Image */}
                                            <div className="flex items-center gap-3 p-2">
                                                <img
                                                    src=""
                                                    alt={item.productName}
                                                    className="w-[9rem] h-[9rem] object-cover"
                                                />
                                            </div>
                                        </td>
                                        {/* Product Name */}
                                        <td className="text-[#44506D] text-[1.2rem] text-left w-[30dvw]">
                                            {item.productName}
                                        </td>
                                        {/* Product Type */}

                                        {/* Product Price */}
                                        <td className="text-[#44506D] text-[1rem] text-center">₱{item.productPrice}</td>
                                        {/* Quantity */}
                                        <td className="text-[#44506D] text-[1rem] text-center">
                                            <button className="text-[#44506D] rounded-none border-[#44506D] outline border w-[1rem] h-[1.6rem]" onClick={() => handleQuantityChange(item.cartItemId, item.quantity, 'subract')}>-</button>
                                            <input type="text" defaultValue="1" value={item.quantity} min="1" className="bg-transparent w-[2rem] h-[1.6rem] text-[#44506D] text-center text-[1rem] rounded-none border-[#44506D] border outline p-[0.1rem]" readOnly />
                                            <button className="text-[#44506D] rounded-none border-[#44506D] outline border w-[1rem] h-[1.6rem]" onClick={() => handleQuantityChange(item.cartItemId, item.quantity, 'add')}>+</button>
                                        </td>
                                        {/* Remove Button */}
                                        <td>
                                            <button
                                                className="btn btn-ghost btn-xs text-[#44506D] p-2 outline border-[#44506D] rounded-none w-[9rem] hover:bg-[#44506D] hover:text-white"
                                                onClick={() => handleRemoveItem(item.cartItemId)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-gray-500 text-xl">
                                        Your Cart is Empty
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="flex w-full items-center mb-[2rem] justify-bottom">
                {/* Subtotal Container */}
                <div className="flex align-center items-center flex-1 ml-[2rem]">
                    <h3 className="text-[#44506D] text-[1rem] ml-[2rem]">Subtotal ({checkedItems.length} item(s) selected):</h3>
                    <div className="text-red-500 text-[1.5rem] font-bold ml-[0.5rem]">₱{selectedSubtotal}</div>
                </div>
                {/* Checkout Container */}
                <div className="flex-1 flex justify-end items-center">
                    <button className="btn bg-[hsl(222,23,35,25%)] text-black border-[#44506D] border rounded-none hover:bg-[#44506D] hover:text-white px-8 py-3 mr-[2rem]">Continue Shopping</button>
                    <button className="btn bg-[#44506D] text-white border-none rounded-none hover:bg-[#2C3653] px-8 py-3 mr-[2rem]"
                            disabled={checkedItems.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            <Footer />
        </>
    )
}