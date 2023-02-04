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
        if (savedPalettes.length === 1) {
            localStorage.clear()
            setSavedPalettes([])
        } else {
            setSavedPalettes((prevSavedPalettes: SavedPalette[]) =>
                prevSavedPalettes.filter(
                    (palette: SavedPalette) => palette.id !== id
                )
            )
        }
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
        <div className="flex h-screen flex-col">
            <section className="flex flex-col items-center justify-center gap-4 p-4 sm:p-6">
                <Link
                    to="/"
                    className="text-center font-bungee text-2xl tracking-widest"
                >
                    Palette&nbsp; Pro
                </Link>
                {savedPalettes.length ? (
                    <div className="flex w-full flex-col items-center gap-6">
                        <p className="text-center leading-relaxed tracking-wide">
                            Click a color to copy the hex code to your clipboard
                            <span className="text-2xl"> 😉</span>
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            {swatchElements}
                        </div>
                        <div className="flex w-full flex-wrap justify-center gap-4 text-center">
                            <button
                                onClick={deleteAllSavedPalettes}
                                className="w-1/2 rounded bg-gray-500 p-2 font-bold tracking-widest text-gray-100 transition duration-200 hover:bg-gray-800 active:bg-gray-500 sm:w-1/4 lg:w-1/6"
                            >
                                Delete All
                            </button>
                            <Link
                                to="/"
                                className="w-1/2 rounded bg-gray-500 p-2 font-bold tracking-widest text-gray-100 transition duration-200 hover:bg-gray-800 active:bg-gray-500 sm:w-1/4 lg:w-1/6"
                            >
                                Generator
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full flex-col items-center justify-center gap-6 text-center">
                        <p className="flex items-center gap-2">
                            <span className="text-4xl">😲</span> No saved
                            palettes...
                        </p>
                        <Link
                            to="/"
                            className="w-1/2 rounded bg-gray-500 p-2 font-bold tracking-widest text-gray-100 transition duration-200 hover:bg-gray-800 active:bg-gray-500 sm:w-1/4 lg:w-1/6"
                        >
                            Generator
                        </Link>
                    </div>
                )}
            </section>
        </div>
    )
}

export default SavedPalettes
