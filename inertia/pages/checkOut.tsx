import Navigation from "./components/navBar";

export default function CheckOut() {
    return (
        <>
            <Navigation />

            <div className="w-screen h-sceen bg-[#E1E5EC] block">

                {/* checkout text */}
                <div className="w-full h-auto border-b-2 border-black h-[8rem] ">
                    <h1 className="text-5xl font-black px-10 py-8 text-[#515A70]">Checkout</h1>
                </div>

                <div className="w-screen h-[15rem]">
                    <h1></h1>
                </div>
            </div>



        </>
    )
}