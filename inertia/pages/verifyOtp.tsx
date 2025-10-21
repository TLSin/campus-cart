import React, { useState, useRef, useEffect } from 'react'
import { Head, Link, router, usePage} from '@inertiajs/react'
import Footer from './components/footer'

interface VerifyOtpProps{
    studentNo?: string
    message?: string
    [key: string]: any
}

export default function VerifyOtp() {
    const { studentNo, message } = usePage<VerifyOtpProps>().props

    const [otpDigits, setOtpDigits] = useState<string[]>(new Array(6).fill(''))
    const [isLoading, setIsLoading] = useState<boolean>(false)   

    const inputRefs = useRef<Array<HTMLInputElement | null>>([])

    useEffect(() => {
        if(inputRefs.current[0]){
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1)

        const newOtpDigits = [...otpDigits]
        newOtpDigits[index] = value
        setOtpDigits(newOtpDigits)

        if(value && index < 5){
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if(e.key === 'Backspace' && !otpDigits[index] && index > 0){
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '')

        if(pasteData.length === 6){
            const newOtpDigits = pasteData.split('')
            setOtpDigits(newOtpDigits)
        }
    }

    const fullOtpCode = otpDigits.join('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(fullOtpCode.length !== 6){
            return
        }

        setIsLoading(true)

        router.post('/verifyOtp', {
            studentNo: studentNo,
            otpCode: fullOtpCode,
        }, {
            onFinish: () => setIsLoading(false)
        })
    }

    return (
        <>
            <Head title="Verify OTP" />

            <div className="relative min-h-[100dvh] w-screen overflow-hidden flex flex-col">
                 <div className="flex-grow flex justify-center items-center w-full min-h-[100dvh] lg:min-h-0 p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md p-8 sm:p-12 rounded-2xl shadow-2xl space-y-6 border-2 border-white/30"
                    >
                        <h2 className="text-3xl font-bold text-[#FFFFFF] text-center mb-4">Verify Your Account</h2>
                        <p className="text-center text-gray-600 mb-6">
                            A 6-digit verification code has been sent to your registered email for student ID <strong className="text-[#FFFFFF]">{studentNo}</strong>.
                        </p>

                        {/* Message Display (e.g., from server flash) */}
                        {message && (
                            <div className="p-3 rounded-lg text-center bg-red-100 text-red-700">
                                {message}
                            </div>
                        )}

                        {/* OTP Input Fields */}
                        <div className="flex justify-center space-x-2 sm:space-x-3 mb-6 text-white" onPaste={handlePaste}>
                            {otpDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {(inputRefs.current[index] = el)}}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-3xl font-bold rounded-lg border-2 border-gray-300 focus:border-[#92A8D1] focus:ring-[#92A8D1] focus:outline-none transition duration-150"
                                    disabled={isLoading}
                                />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full bg-[#92A8D1] text-white py-3 rounded-xl text-xl font-bold hover:bg-[#A7C7E7] shadow-lg shadow-gray-400/50 transition duration-150 ease-in-out disabled:opacity-75 flex justify-center items-center"
                                disabled={isLoading || fullOtpCode.length !== 6}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-md mr-2 text-[#4A69A8]"></span>
                                        Verifying...
                                    </>
                                ) : (
                                    'Verify & Log In'
                                )}
                            </button>
                        </div>

                        {/* Resend/Back to Login link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600 text-sm">
                                Didn't receive the code? <Link href="/login" className="text-[#FFFFFF] hover:underline font-bold">Resend or Go back to Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    )
}