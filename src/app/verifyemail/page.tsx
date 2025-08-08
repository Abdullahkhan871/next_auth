// app/verify-email/page.tsx
export default function VerifyEmailPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Verify Your Email
                </h1>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    We’ve sent a verification link to your email address. Please click the
                    link in the email to verify your account.
                </p>

                {/* Click Button */}
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                    Click Here to Verify
                </button>
            </div>
        </div>
    );
}
