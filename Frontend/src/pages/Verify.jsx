import React from "react";

const verify = () => {
    return (
        <div className="relative w-full h-[700px] overflow-hidden">
            <div className="min-h-screen flex items-center justify-center bg-pink-100 px-6">
                <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-md text-center">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">☑️ Check Your Email</h2>
                    <p className="text-gray-400 text-sm">
                        We've sent you an email to verify your account. Please check your emain and click on verification link
                    </p>
                </div>
            </div>
        </div>
    )
}

export default verify