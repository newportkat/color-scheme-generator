import React from "react"
import { Link } from "react-router-dom"

const Error = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-200 ">
            <section className="flex flex-col justify-center items-center p-6 gap-6">
                <Link to="/" className="text-2xl font-bungee tracking-widest">
                    Palette&nbsp; Pro
                </Link>

                <div className="flex flex-col w-full items-center justify-center gap-4">
                    <p className="text-xl text-center flex items-center gap-2">
                        <span className="text-4xl">😲</span> Page doesn't
                        exist...
                    </p>
                    <Link
                        to="/"
                        className="py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 bg-gray-500 rounded hover:bg-gray-800"
                    >
                        Take Me Home!
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Error
