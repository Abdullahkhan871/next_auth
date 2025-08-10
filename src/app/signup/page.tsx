"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface user {
    username: string,
    email: string,
    password: string,
}


export default function SignupPage() {
    const [user, setUser] = useState<user>({
        username: "",
        email: "",
        password: ""
    })
    const { username, email, password } = user;
    const [loader, setLoader] = useState<boolean>(false)
    const [submitDisable, setSubmitDisable] = useState<boolean>(true);


    const handleSumbit = async (e: any) => {
        try {
            e.preventDefault();
            const response = await axios.post("/api/users/signup", user)

        } catch (error: any) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (username.length > 1 || email.length > 1 || password.length > 1) {
            setSubmitDisable(() => false)
            console.log("1")
        } else {
            console.log("2")
            setSubmitDisable(true)
        }
    }, [user])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create an Account
                </h2>
                <form className="space-y-5" onSubmit={handleSumbit}>
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Your username"
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                            value={username}
                            onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                            value={email}
                            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                            value={password}
                            onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={submitDisable ? true : false}
                        type="submit"
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition duration-200 ${submitDisable ? "cursor-not-allowed hover:bg-gray-400" : "cursor-pointer"}`}
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
