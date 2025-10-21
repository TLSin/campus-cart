interface OrderItem {
    id: number
    productName: string
    price: number
    quantity: number
    imgurl: string | null
}

interface OrderHistoryRecord {
    orderHistoryId: number
    totalAmount: number
    shippingFee: number
    status: 'Pending' | 'Awaiting Payment' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Payment Failed'
    paymentMethod: 'COD' | 'GCash'
    shippingAddress: string
    createdAt: string
    items: OrderItem[]
}

interface OrderHistoryProps {
    orders: OrderHistoryRecord[]
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
    if (orders.length === 0) {
        return (
            <div className="relative w-[68dvw] h-auto p-8 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg mt-4">
                <h2 className="text-[#515A70] text-2xl font-bold mb-4">My Orders</h2>
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg w-full">
                    <p className="text-gray-600 text-lg mb-2">Looks like your order history is empty! 🛒</p>
                    <p className="text-sm text-gray-500">Time to find something you like and place your first order.</p>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="relative w-[68dvw] h-auto">
                <h2 className="text-[#515A70] text-[2rem] font-bold h-[3rem] translate-x-[0.5rem] left-0 mt-[1rem]">My Orders</h2>

                {/* Order List */}
                <div className="w-full">
                    <table className="table-auto border-spacing-x-2 border-spacing-y-5 border-separate w-full ">
                        <tbody className="">
                            {orders.length === 0 ? (
                                <tr>
                                    <td className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-600 border-2 border-dashed border-gray-300">
                                        <p className="text-lg font-medium mb-2">Looks like your order history is empty! 🛒</p>
                                        <p className="text-sm text-gray-500">Time to find something you like and place your first order.</p>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <>
                                        {/* List of orders*/}
                                        <tr key={order.orderHistoryId} className="">
                                            <td className="bg-white rounded-2xl shadow-md p-4">
                                                <div className="flex justify-between border-b pb-2 mb-2">
                                                    <div>
                                                        <div className="font-medium">Status: <strong className="text-red">{order.status}</strong></div>
                                                        <div className="text-xs text-gray-500">Order Placed: {order.createdAt}</div>
                                                    </div>
                                                    <div className="text-sm font-semibold">Order# **{order.orderHistoryId}**</div>
                                                </div>

                                                {order.items.map((item) => (
                                                    <>
                                                        <div className="flex justify-between items-start mb-[1rem]">
                                                            <div className="flex gap-4">
                                                                {item.imgurl ? (
                                                                    <img src={item.imgurl} alt="" className="w-16 h-16 object-cover rounded-md shrink-0" />
                                                                ) : (
                                                                    <div className="w-16 h-16 bg-gray-400 rounded-md"></div>
                                                                )
                                                                }
                                                                <div>
                                                                    <div className="font-medium">
                                                                        {item.productName}
                                                                    </div>
                                                                    <div className="text-lg font-bold mt-1">₱{item.price.toFixed(2)}</div>
                                                                </div>
                                                            </div>

                                                            <div className="text-xs text-gray-500 mt-1">x{item.quantity}</div>
                                                        </div>
                                                    </>
                                                ))}

                                            </td>
                                        </tr>
                                    </>
                                ))
                            )}


                            {/* Order # 1 */}
                            {/* <tr className="mt-[1rem]">
                                <td className="bg-white rounded-2xl shadow-md p-4">
                                    <div className="flex justify-between border-b pb-2 mb-2">
                                        <div>
                                            <div className="font-medium">Order Placed</div>
                                            <div className="text-xs text-gray-500">Arriving Sep 18 – Sep 20</div>
                                        </div>
                                        <div className="text-sm font-semibold">#QDR-7558</div>
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                            <div className="w-16 h-16 bg-gray-400 rounded-md"></div>
                                            <div>
                                                <div className="font-medium">
                                                    Computer Studies Complete Uniform for Male and Female
                                                </div>
                                                <div className="text-xs text-gray-500">Skirt, M</div>
                                                <div className="text-lg font-bold mt-1">₱300</div>
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-500 mt-1">x1</div>
                                    </div>
                                </td>
                            </tr> */}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}