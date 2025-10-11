
export default function Slider() {
    return (
        <>
            <div className="carousel w-full overflow-x-hidden">
                <div className="carousel-inner flex transition-transform duration-500 ease-in-out ">

                    {/* picture 1 */}
                    <div id="slide1" className="flex-none w-full relative overflow-hidden">
                        {/* picture text */}
                        <div className="absolute top-[15rem] left-[5rem] h-[60vh] z-2">
                            <h1 className="text-[#F1C8C9] text-center text-xl font-bold font-poppins">NEWEST ARRIVAL</h1>
                            <h1 className="text-center font-black text-4xl text-[#FFFFFF] font-poppins">COMPUTER <br /> STUDIES UNIFORM</h1>
                            <h1 className="text-[#F1C8C9] text-center text-xl font-medium font-poppins">Starting at Php 400.00</h1>
                            <a href="#" className="flex flex-col items-center">
                                <button className="bg-[#E1C9CA] w-[7rem] h-[2.5rem] text-[#ffffff] rounded-xl text-xl">Shop now</button>
                            </a>
                        </div>
                        <img
                            src="/carousel1.jpg"
                            alt=""
                            className="w-full h-full object-cover object-left-top" />
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8698BC] from-0% via-[#8698BC] via-0% to-transparent to-75% opacity-50 z-1">
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-2">
                            <a href="#slide2" className="btn btn-circle"><img src="/left-arrow.gif" alt="" className="h-[5rem]" /></a>
                            <a href="#slide2" className="btn btn-circle"><img src="/arrow (2).gif" alt="" className="h-[5rem]" /></a>
                        </div>
                    </div>

                    {/* picture 2 */}
                    <div id="slide2" className=" flex-none w-full relative h-[70vh] overflow-hidden">
                        {/* picture text */}
                        <div className="absolute top-[15rem] left-[5rem] z-2">
                            <h1 className="text-[#F1C8C9] text-center text-xl font-bold font-poppins">NEWEST ARRIVAL</h1>
                            <h1 className="text-center font-black text-4xl text-[#FFFFFF] font-poppins">COMPUTER <br /> STUDIES UNIFORM</h1>
                            <h1 className="text-[#F1C8C9] text-center text-xl font-medium font-poppins">Starting at Php 400.00</h1>
                            <a href="#" className="flex flex-col items-center">
                                <button className="bg-[#E1C9CA] w-[7rem] h-[2.5rem] text-[#ffffff] rounded-xl text-xl">Shop now</button>
                            </a>
                        </div>
                        <img
                            src="/sports.jpg"
                            alt=""
                            className="w-full h-full bg-gradient-to-t from-black to-transparent object-cover object-left-top" />
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8698BC] from-0% via-[#8698BC] via-0% to-transparent to-75% opacity-50 z-1">
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-2">
                            <a href="#slide1" className="btn btn-circle"><img src="/left-arrow.gif" alt="" className="h-[5rem]" /></a>
                            <a href="#slide1" className="btn btn-circle"><img src="/arrow (2).gif" alt="" className="h-[5rem]" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


