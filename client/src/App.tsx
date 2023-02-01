import React, { useEffect, useState } from "react"
import Color from "./components/Color"
import { modeNames } from "./data/modeNames"
import {
    createHueValueColor,
    createNeutralColor,
    createPastelColor,
    createRandomColor,
    createRandomInitialColors,
    createRandomNumber,
    createVibrantColor,
} from "./helpers/helperFunctions"
import { ColorObject } from "./interfaces/interfaces"

const App = () => {
    const [numberOfColors, setNumberOfColors] = useState(4)
    const [colors, setColors] = useState(
        createRandomInitialColors(numberOfColors)
    )
    const [mode, setMode] = useState("Random")

    const createRandomPalette = () => {
        setColors((prevColors) =>
            prevColors.map((color) => {
                return color.isLocked ? color : createRandomColor()
            })
        )
    }

    const createMonochromaticPalette = () => {
        const newHueValue = createRandomNumber(0, 360)

        setColors((prevColors) =>
            prevColors
                .map((color) => {
                    return color.isLocked
                        ? color
                        : createHueValueColor(newHueValue)
                })
                .sort((a, b) => {
                    return a.l - b.l
                })
        )
    }

    const createComplementaryPalette = () => {
        const newHueValue = createRandomNumber(0, 360)

        //complementary values are separated by 180° in hue value
        //hue values wrap after 360° so must use % operator
        const complementaryHueValue = (newHueValue + 180) % 360

        setColors((prevColors) =>
            prevColors.map((color, index) => {
                return color.isLocked
                    ? color
                    : createHueValueColor(
                          index % 2 === 0 ? newHueValue : complementaryHueValue
                      )
            })
        )
    }

    const createAnalagousPalette = () => {
        const newHueValue = createRandomNumber(0, 360)

        //analogic values are separated by 30° or 60° in hue value
        //hue values wrap after 360° so must use % operator
        const analagousHueValueOne = (newHueValue + 30) % 360
        const analagousHueValueTwo = (newHueValue - 30) % 360

        setColors((prevColors) =>
            prevColors.map((color, index) => {
                return color.isLocked
                    ? color
                    : createHueValueColor(
                          index % 3 === 0
                              ? newHueValue
                              : index % 3 === 1
                              ? analagousHueValueOne
                              : analagousHueValueTwo
                      )
            })
        )
    }

    const createTriadicPalette = () => {
        const newHueValue = createRandomNumber(0, 360)

        //triadic values are separated by 120° in hue value
        //hue values wrap after 360° so must use % operator
        const triadicHueValueOne = (newHueValue + 120) % 360
        const triadicHueValueTwo = (newHueValue - 120) % 360

        setColors((prevColors) =>
            prevColors.map((color, index) => {
                return color.isLocked
                    ? color
                    : createHueValueColor(
                          index % 3 === 0
                              ? newHueValue
                              : index % 3 === 1
                              ? triadicHueValueOne
                              : triadicHueValueTwo
                      )
            })
        )
    }

    const createPastelPalette = () => {
        setColors((prevColors) =>
            prevColors.map((color) => {
                return color.isLocked ? color : createPastelColor()
            })
        )
    }

    const createVibrantPalette = () => {
        setColors((prevColors) =>
            prevColors.map((color) => {
                return color.isLocked ? color : createVibrantColor()
            })
        )
    }

    const createNeutralPalette = () => {
        setColors((prevColors) =>
            prevColors.map((color) => {
                return color.isLocked ? color : createNeutralColor()
            })
        )
    }

    const lockColor = (id: string) => {
        setColors((prevColors) =>
            prevColors.map((color) => {
                return color.id === id
                    ? { ...color, isLocked: !color.isLocked }
                    : color
            })
        )
    }

    const deleteColor = (id: string) => {
        if (numberOfColors > 2) {
            setNumberOfColors((prevNumber) => prevNumber - 1)
            setColors((prevColors) =>
                prevColors.filter((color) => {
                    return color.id != id
                })
            )
        }
    }

    const increaseColors = () => {
        if (numberOfColors < 10) {
            setNumberOfColors((prevNumber) => prevNumber + 1)
            setColors([...colors, createRandomColor()])
        }
    }

    const decreaseColors = () => {
        if (numberOfColors > 2) {
            if (colors[numberOfColors - 1].isLocked === false) {
                setNumberOfColors((prevNumber) => prevNumber - 1)
                setColors(colors.slice(0, colors.length - 1))
            }
        }
    }

    const savePalette = () => {
        let savedPalettes: any[] = JSON.parse(localStorage.getItem("savedPalettes") || "[]")
        savedPalettes.push(colors)
        localStorage.setItem("savedPalettes", JSON.stringify(savedPalettes))
    }

    const deleteSavedPalettes = () => {
       localStorage.clear()
    }

    const colorElements = colors.map((color) => (
        <Color
            h={color.h}
            s={color.s}
            l={color.l}
            isLocked={color.isLocked}
            key={color.id}
            deleteColor={() => deleteColor(color.id)}
            lockColor={() => lockColor(color.id)}
        />
    ))

    return (
        <div className="flex flex-col h-screen bg-gray-200 ">
            <section className="flex flex-col justify-center items-center p-6 gap-4">
                <div className="flex items-center justify-center w-full gap-6">
                    <h1 className="text-2xl font-bungee tracking-widest">
                        Palette&nbsp; Pro
                    </h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 p-1 rounded cursor-pointer hover:backdrop-contrast-75 lg:hidden"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </div>
                <div className="flex w-full items-center justify-center gap-4">
                    <select
                        name="mode"
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm tracking-wider rounded focus:ring-gray-900 focus:border-gray-900 block p-3 w-96 h-full"
                        onChange={(event) => {
                            setMode(event.target.value)
                        }}
                    >
                        {modeNames.map((mode) => (
                            <option key={mode.id}>{mode.name}</option>
                        ))}
                    </select>
                    <button onClick={savePalette} className="hidden lg:block py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 bg-gray-500 rounded hover:bg-gray-800">
                        Save
                    </button>
                    <button className="hidden lg:block py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 bg-gray-500 rounded hover:bg-gray-800">
                        My Palettes
                    </button>
                    <button
                        onClick={deleteSavedPalettes}
                        className="hidden lg:block py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 bg-gray-500 rounded hover:bg-gray-800"
                    >
                        Delete All
                    </button>
                </div>
                <div className="flex items-center gap-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 cursor-pointer hover:backdrop-contrast-75 p-1 transition stroke-2 rounded"
                        onClick={decreaseColors}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                        />
                    </svg>
                    <button
                        className="py-4 px-6 font-bold tracking-widest text-gray-100 transition duration-200 bg-gray-900 rounded hover:bg-gray-800"
                        onClick={
                            mode === "Random"
                                ? createRandomPalette
                                : mode === "Monochromatic"
                                ? createMonochromaticPalette
                                : mode === "Complementary"
                                ? createComplementaryPalette
                                : mode === "Analogous"
                                ? createAnalagousPalette
                                : mode === "Triadic"
                                ? createTriadicPalette
                                : mode === "Pastel"
                                ? createPastelPalette
                                : mode === "Vibrant"
                                ? createVibrantPalette
                                : createNeutralPalette
                        }
                    >
                        Generate
                    </button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 cursor-pointer hover:backdrop-contrast-75 p-1 transition stroke-2 rounded"
                        onClick={increaseColors}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </div>
            </section>
            <section className="flex flex-col flex-grow lg:flex-row">
                {colorElements}
            </section>
        </div>
    )
}

export default App
