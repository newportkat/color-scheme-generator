import React from "react"
import { Link } from "react-router-dom"

const Error = () => {
    return (
        <div className="flex h-screen flex-col">
            <section className="flex flex-col items-center justify-center gap-4 p-4 sm:p-6">
                <Link
                    to="/"
                    className="text-center font-bungee text-2xl tracking-widest"
                >
                    Palette&nbsp; Pro
                </Link>
                <div className="flex w-full flex-col items-center justify-center gap-6 text-center">
                    <p className="flex items-center gap-2">
                        <span className="text-4xl">😲</span> Page not found...
                    </p>
                    <Link
                        to="/"
                        className="w-1/2 rounded bg-gray-500 p-2 font-bold tracking-widest text-gray-100 transition duration-200 hover:bg-gray-800 active:bg-gray-500 sm:w-1/4 lg:w-1/6"
                    >
                        Generator
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Error
