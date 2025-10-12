export default function OrderHistory() {
    return (
        <>
            <div className="w-[100%] ">
                <h2 className="text-[#515A70] text-[2rem] font-bold h-[3rem] translate-y-[-0.5rem] translate-x-[0.5rem] left-0 ">My Orders</h2>

                {/* Order List */}
                <div className="overflow-y-auto  w-[100%] mx-[2rem] my-[1rem]">
                    <table  className="table-auto border-collapse ]">
                        <tbody className="">
                            <tr className="">
                                <td  className="bg-white rounded-2xl shadow-md p-4">
                                    
                                    <div  className="flex justify-between border-b pb-2 mb-2">
                                        <div>
                                            <div  className="font-medium">Order Placed</div>
                                            <div  className="text-xs text-gray-500">Arriving Sep 18 – Sep 20</div>
                                        </div>
                                        <div  className="text-sm font-semibold">#QDR-7558</div>
                                    </div>

                                    
                                    <div  className="flex justify-between items-start">
                                        <div  className="flex gap-4">
                                            
                                            <div  className="w-16 h-16 bg-gray-400 rounded-md"></div>
                                            
                                            <div>
                                                <div  className="font-medium">
                                                    Computer Studies Complete Uniform for Male and Female
                                                </div>
                                                <div  className="text-xs text-gray-500">Skirt, M</div>
                                                <div  className="text-lg font-bold mt-1">₱300</div>
                                            </div>
                                        </div>

                                        
                                        <div  className="text-xs text-gray-500 mt-1">x1</div>
                                    </div>
                                </td>
                            </tr>

                            <tr className="translate-y-[1rem]">
                                <td   className="bg-white rounded-2xl shadow-md p-4">
                                    
                                    <div  className="flex justify-between border-b pb-2 mb-2">
                                        <div>
                                            <div  className="font-medium">Order Placed</div>
                                            <div  className="text-xs text-gray-500">Arriving Sep 18 – Sep 20</div>
                                        </div>
                                        <div  className="text-sm font-semibold">#QDR-7558</div>
                                    </div>

                                    
                                    <div  className="flex justify-between items-start">
                                        <div  className="flex gap-4">
                                            
                                            <div  className="w-16 h-16 bg-gray-400 rounded-md"></div>
                                            
                                            <div>
                                                <div  className="font-medium">
                                                    Computer Studies Complete Uniform for Male and Female
                                                </div>
                                                <div  className="text-xs text-gray-500">Skirt, M</div>
                                                <div  className="text-lg font-bold mt-1">₱300</div>
                                            </div>
                                        </div>

                                        
                                        <div  className="text-xs text-gray-500 mt-1">x1</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <table className="table-auto w-full border-collapse ">
                        

                            <tr className="bg-white rounded-xl w-[]">
                                <tr>
                                    <td className="p-4">
                                        <div className="text-sm font-semibold">Order Placed</div>
                                        <div className="text-xs text-gray-500">Arriving Sep 18 - Sep 20</div>
                                    </td>
                                </tr>
                                <td className="p-4 flex items-start gap-4">

                                    <div className="w-16 h-16 bg-gray-400 rounded-md"></div>

                                    <div>
                                        <div className="font-medium">Computer Studies Complete Uniform for Male and Female</div>
                                        <div className="text-xs text-gray-500">Skirt, M</div>
                                        <div className="text-lg font-bold mt-1">₱300</div>
                                    </div>
                                </td>
                                <td className="p-4 text-right align-top w-1/6">
                                    <div className="text-sm font-medium">#QDR-7558</div>
                                    <div className="text-xs text-gray-400">x1</div>
                                </td>
                            </tr>


                            <tr className="bg-white rounded-2xl shadow-md translate-y-[1rem]">
                                <td className="p-4 align-top w-1/4">
                                    <div className="text-sm font-semibold">Order Delivered</div>
                                    <div className="text-xs text-gray-500">Delivered Aug 26</div>
                                </td>
                                <td className="p-4 flex items-start gap-4">

                                    <div className="w-16 h-16 bg-gray-400 rounded-md"></div>

                                    <div>
                                        <div className="font-medium">Computer Studies Complete Uniform for Male and Female</div>
                                        <div className="text-xs text-gray-500">Skirt, M</div>
                                        <div className="text-lg font-bold mt-1">₱300</div>
                                    </div>
                                </td>
                                <td className="p-4 text-right align-top w-1/6">
                                    <div className="text-sm font-medium">#QDR-8465</div>
                                    <div className="text-xs text-gray-400">x1</div>
                                </td>
                            </tr>
                        
                    </table> */}
                </div>
            </div>
        </>
    )
}