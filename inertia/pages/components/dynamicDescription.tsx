import { useState, Dispatch, SetStateAction } from "react";

interface ProductVariant {
    productId: number
    productName: string
    productPrice: number
    imgUrl: string | null
}

interface DynamicDescriptionProps {
    descriptionId: number | null
    productVariants: ProductVariant[]
    selectedProductId: number
    onVariantSelect: (productId: number) => void
    quantity: number
    onQuantityChange: Dispatch<SetStateAction<number>>
}

export default function DynamicDescription({ descriptionId, productVariants, selectedProductId, onVariantSelect, quantity, onQuantityChange }: DynamicDescriptionProps) {
    
    const addFunction = () => {
        onQuantityChange(prev => prev + 1)
    }

    const subtractFunction = () => {
        if (quantity > 1) {
            onQuantityChange(prev => prev - 1)
        }
    }

    const isSizeVariant = productVariants.every(v => v.productName.length < 3 && v.productName.match(/^[XSML\d]+$/i));
    const variantLabel = isSizeVariant ? 'Size' : 'Type'

    return (
        <>
            <div className="flex items-center grid grid-cols-3 ml-[1rem]">
                <div className="col-1 align-left col-span-1">
                    <h3 className="text-gray-500">Shipping</h3>
                </div>
                <div className="col-2 align-left items-top col-span-2">
                    <br />
                    <h3 className="text-black text-[1rem]">Get by 29 Sept <a></a></h3>
                    <h3 className="text-black text-[1rem]">Free Shipping</h3>
                </div>
                {productVariants.length > 1 && (
                    <>
                        <div className="col-1 align-left col-span-1">
                            <h3 className="text-gray-500">{variantLabel}</h3>
                        </div>
                        <div className="col-2 align-center justify-between col-span-2 pt-[1rem]">
                            {productVariants.map((variant) => (
                                <button
                                    key={variant.productId}
                                    className={`btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none mb-[0.5rem] ${selectedProductId === variant.productId ? 'bg-[#44506D] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'}`}
                                    onClick={() => onVariantSelect(variant.productId)}
                                >
                                    {variant.productName}
                                </button>
                            ))}

                            {/* <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Blazer-F</button>
                            <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Skirt-F</button>
                            <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Pants-M</button>
                            <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Necktie-M</button>
                            <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Necktie-F</button>
                            <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Polo-F</button>
                            <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">Polo-M</button>
                            <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">All-F</button>
                            <button className="btn text-black text=[1rem] mr-[0.2rem] h-[2rem] px-2 py-2 border rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">All-M</button> */}
                        </div>
                        {/* <div className="col-1 align-left col-span-1 pt-[1rem]">
                            <h3 className="text-gray-500">Size</h3>
                        </div>
                        <div className="col-2 align-left justify-between col-span-2 pt-[1rem]">
                            <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">XS</button>
                            <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">S</button>
                            <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">M</button>
                            <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">L</button>
                            <button className="btn text-black text=[1rem] mr-[0.5rem] px-2 py-2 border w-[2rem] h-[2rem] rounded-none active:bg-[#44506D] active:text-white focus:bg-[#44506D] focus:text-white">XL</button>
                        </div> */}
                    </>
                )}

                <div className="col-1 align-left col-span-1 pt-[1rem]">
                    <h3 className="text-gray-500">Quantity</h3>
                </div>
                <div className="flex col-2 align-left col-span-2 pt-[1rem]">
                    <button
                        className="text-black rounded-none border-black outline border w-[2rem] h-[2rem]"
                        onClick={subtractFunction}
                        disabled={quantity <= 1}
                    >
                        &minus;
                    </button>
                    <input
                        type="number"
                        readOnly
                        defaultValue="1"
                        value={quantity}
                        min="1"
                        className="pl-[0.5rem] bg-white w-[2.5rem] text-black text-center rounded-none border-black border outline"
                    />
                    <button className="text-black rounded-none border-black outline border w-[2rem] h-[2rem]" onClick={addFunction}>+</button>
                </div>
            </div>
        </>
    )
}