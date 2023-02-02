import React, { useState } from "react"
import { Link } from "react-router-dom"
import Swatch from "../components/Swatch"
import { SavedPalette } from "../interfaces/interfaces"

const SavedPalettes = () => {
    const [savedPalettes, setSavedPalettes] = useState(
        JSON.parse(localStorage.getItem("savedPalettes") || "[]")
    )

    const deleteAllSavedPalettes = () => {
        localStorage.clear()
        setSavedPalettes([])
    }

    const deletePalette = (id: string) => {
        setSavedPalettes((prevSavedPalettes: SavedPalette[]) =>
            prevSavedPalettes.filter(
                (palette: SavedPalette) => palette.id !== id
            )
        )
    }

    const swatchElements = savedPalettes.map((palette: SavedPalette) => (
        <Swatch
            key={palette.id}
            {...palette}
            deletePalette={() => {
                deletePalette(palette.id)
            }}
        />
    ))

    return (
        <div className="flex h-screen flex-col bg-gray-200 ">
            <section className="flex flex-col items-center justify-center gap-6 p-6">
                <Link to="/" className="font-bungee text-2xl tracking-widest">
                    Palette&nbsp; Pro
                </Link>
                {savedPalettes.length ? (
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                        <p className="text-center leading-relaxed tracking-wide">
                            Click a color to copy the hex code to your clipboard
                            <span className="text-2xl"> 😉</span>
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-10 p-6">
                            {swatchElements}
                        </div>
                        <div className="flex flex-wrap gap-8 text-center justify-center">
                            <button
                                onClick={deleteAllSavedPalettes}
                                className="rounded bg-gray-500 py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 hover:bg-gray-800"
                            >
                                Delete All
                            </button>
                            <Link
                                to="/"
                                className="rounded bg-gray-500 py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 hover:bg-gray-800"
                            >
                                Back Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                        <p className="flex items-center gap-2 text-center text-xl">
                            <span className="text-4xl">😲</span> No saved
                            palettes...
                        </p>
                        <Link
                            to="/"
                            className="rounded bg-gray-500 py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 hover:bg-gray-800"
                        >
                            Take Me Home!
                        </Link>
                    </div>
                )}
            </section>
        </div>
    )
}

export default SavedPalettes
