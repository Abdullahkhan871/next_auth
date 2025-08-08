"use client";

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Card */}
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm w-full text-center">

                {/* Avatar */}
                <div className="flex justify-center mb-4">
                    <img
                        src="https://picsum.photos/200/300"
                        alt="User Avatar"
                        className="w-[100px] h-[100px] object-cover rounded-full border-4 border-blue-500 overflow-hidden"
                    />
                </div>

                {/* Username */}
                <h1 className="text-2xl font-semibold text-gray-800">John Doe</h1>
                <p className="text-gray-500 mb-4">johndoe@example.com</p>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-6">
                    Full-stack developer passionate about building scalable web apps and
                    exploring new technologies.
                </p>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
