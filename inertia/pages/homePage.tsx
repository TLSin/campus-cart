
import Slider from "./components/slider"
import Navigation from "./components/navBar"
import Footer from "./components/footer"

export default function homePage() {

    return (
        <>
            <head title="Home Page" />

            {/* whole screen */}
            <div className="w-screen h-screen bg-[#8698BC] overflow-x-hidden">

                {/* navigation bar
            <Navigation /> */}

                {/* carousel */}
                <Slider />

                {/* showcase */}
                <div className="container mx-auto py-8">
                    <div className="flex items-stretch space-x-[5rem] justify-center">
                        <div className="w-2/4 bg-white p-4 h-[30rem] rounded-2xl">
                            <div className="w-5/  bg-[#E4C3CA] p-4 h-[28rem] ">

                            </div>
                        </div>

                        <div className="w-2/4 bg-white p-4 rounded-2xl">
                            <div className="w-5/  bg-[#E4C3CA] p-4 h-[28rem] ">

                            </div>
                        </div>

                        <div className="w-2/4 bg-white p-4 rounded-2xl">
                            <div className="w-5/ bg-[#E4C3CA] p-4 h-[28rem]">

                            </div>
                        </div>
                    </div>
                </div>







                {/* footer */}
                <Footer />
            </div>





        </>
    )
}