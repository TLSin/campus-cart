export default function Footer() {
    return (
        <>
            <div className=" inset-x-0 bottom-0  w-full">
                <footer className="footer  bg-[#44506D] text-neutral-content ">

                    <div className="flex ">
                        <div className="flex">
                            <div>
                                <img src="/CClogo.png" className=" h-[10rem]"></img>
                            </div>
                            <div>
                                <p className="text-[#FFFFFF] translate-y-[3rem] translate-x-[1rem]">
                                    CC Campus Cart.
                                    <br />
                                    ©2025 Campus Cart. All rights reserved.
                                </p>
                            </div>
                        </div>


                        <div className=" translate-x-[50rem] py-[3rem] flex w-[20rem] items-center justify-center">
                            <nav className="">
                                <h1 className="footer-title text-lg px-5">Socials:</h1>
                                <div className="grid grid-flow-col gap-4 flex">
                                    <a href="#">
                                        <div className="group w-[2rem] h-[5rem] relative overflow-hidden">
                                            
                                            <img
                                                src="/x.png"
                                                alt="Static preview"
                                                className="absolute inset-0 w-[2rem] h-[2rem] object-cover group-hover:hidden"
                                            />

                                            
                                            <img
                                                src="/xx.gif"
                                                alt="Animated GIF"
                                                className="absolute inset-0 w-full h-[2rem] w-[2rem] object-cover hidden group-hover:block duration-2"
                                            />
                                        </div>
                                    </a>
                                    <a href="#">
                                        <div className="group h-[2rem] w-[2rem] relative overflow-hidden">
                                            
                                            <img
                                                src="/fb.png"
                                                alt="Static preview"
                                                className="absolute inset-0 w-[2rem] h-[2rem] object-cover group-hover:hidden"
                                            />

                                            
                                            <img
                                                src="/fb.gif"
                                                alt="Animated GIF"
                                                className="absolute inset-0 w-full h-[2rem] w-[2rem] object-cover hidden group-hover:block duration-2"
                                            />
                                        </div>
                                    </a>

                                    <a href="#">
                                        <div className="group h-[2rem] w-[2rem] relative overflow-hidden">
                                            
                                            <img
                                                src="/yt.png"
                                                alt="Static preview"
                                                className="absolute inset-0 w-[2rem] h-[2rem] object-cover group-hover:hidden"
                                            />

                                            
                                            <img
                                                src="/yt
                                                .gif"
                                                alt="Animated GIF"
                                                className="absolute inset-0 w-full h-[2rem] w-[2rem] object-cover hidden group-hover:block duration-2"
                                            />
                                        </div>
                                    </a>
                                    
                                </div>
                            </nav>
                        </div>
                    </div>

                </footer>



















            </div>
        </>
    )
}