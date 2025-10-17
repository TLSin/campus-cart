import { Head, Link, usePage } from "@inertiajs/react"
import Navigation from "./components/navBar" 
import Footer from "./components/footer"    

interface ResultPageProps {
    success: boolean
    message: string
    details?: any 
    [key: string]: any
}

export default function ResultPage() {
    const { success, message, details } = usePage<ResultPageProps>().props

    const icon = success 
        ? <svg className="mx-auto h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        : <svg className="mx-auto h-20 w-20 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

    const title = success ? 'Payment Successful!' : 'Payment Failed'
    const buttonText = success ? 'Continue Shopping' : 'Try Again / View Cart'
    const buttonLink = success ? '/' : '/cartPage'
    const buttonClass = success 
        ? 'bg-blue-600 hover:bg-blue-700' 
        : 'bg-red-600 hover:bg-red-700'

    return (
        <>
            <Head title={title} />
            <Navigation />
            
            <div className="min-h-screen pt-20 bg-gray-50 flex justify-center items-center">
                <div className="max-w-md w-full bg-white p-8 shadow-2xl rounded-xl text-center">
                    {icon}
                    <h1 className="text-4xl font-extrabold text-gray-800 mt-6 mb-3">{title}</h1>
                    <p className="text-xl text-gray-600 mb-8">{message}</p>

                    {/* Optional: Display Xendit details for debugging in development */}
                    {import.meta.env.DEV && details && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left text-sm text-gray-700 break-words overflow-x-auto">
                            <h4 className="font-semibold mb-2">Details (Dev Only):</h4>
                            <pre className="whitespace-pre-wrap">{JSON.stringify(details, null, 2)}</pre>
                        </div>
                    )}

                    <Link 
                        href={buttonLink}
                        className={`inline-block mt-8 px-8 py-4 text-white font-semibold rounded-lg shadow-md transition duration-200 ${buttonClass}`}
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    )
}