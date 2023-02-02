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
        <div className="flex flex-col h-screen bg-gray-200 ">
            <section className="flex flex-col justify-center items-center p-6 gap-6">
                <Link to="/" className="text-2xl font-bungee tracking-widest">
                    Palette&nbsp; Pro
                </Link>
                {savedPalettes.length ? (
                    <div className="flex flex-col w-full items-center justify-center gap-4">
                        <p className="text-center tracking-wide leading-relaxed">
                            Click a color to copy the hex code to your clipboard
                            <span className="text-2xl"> 😉</span>
                        </p>
                        <div className="flex justify-center items-center gap-10 flex-wrap p-6">
                            {swatchElements}
                        </div>
                        <div className="flex gap-8">
                            <button
                                onClick={deleteAllSavedPalettes}
                                className="py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 bg-gray-500 rounded hover:bg-gray-800"
                            >
                                Delete All
                            </button>
                            <Link
                                to="/"
                                className="py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 bg-gray-500 rounded hover:bg-gray-800"
                            >
                                Back Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-full items-center justify-center gap-4">
                        <p className="text-xl text-center flex items-center gap-2">
                            <span className="text-4xl">😲</span> No saved
                            palettes...
                        </p>
                        <Link
                            to="/"
                            className="py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 bg-gray-500 rounded hover:bg-gray-800"
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
