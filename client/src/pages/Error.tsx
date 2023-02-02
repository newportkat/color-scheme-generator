import React from "react"
import { Link } from "react-router-dom"

const Error = () => {
    return (
        <div className="flex h-screen flex-col bg-gray-200 ">
            <section className="flex flex-col items-center justify-center gap-6 p-6">
                <Link to="/" className="font-bungee text-2xl tracking-widest">
                    Palette&nbsp; Pro
                </Link>

                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <p className="flex items-center gap-2 text-center text-xl">
                        <span className="text-4xl">😲</span> Page doesn't
                        exist...
                    </p>
                    <Link
                        to="/"
                        className="rounded bg-gray-500 py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 hover:bg-gray-800"
                    >
                        Take Me Home!
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Error
