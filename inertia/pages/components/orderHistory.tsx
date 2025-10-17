export default function OrderHistory() {
    return (
        <>
            <div className="relative w-[68dvw] h-auto">
                <h2 className="text-[#515A70] text-[2rem] font-bold h-[3rem] translate-x-[0.5rem] left-0 mt-[1rem]">My Orders</h2>

                {/* Order List */}
                <div className="w-full">
                    <table className="table-auto border-spacing-x-2 border-spacing-y-5 border-separate w-full ">
                        <tbody className="">
                            {/* Order # 1 */}
                            <tr className="">
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
                            </tr>
                            
                            {/* Order # 1 */}
                            <tr className="mt-[1rem]">
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
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}