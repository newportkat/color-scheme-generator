import React, { useEffect, useState } from "react"
import Color from "./components/Color"
import { modeNames } from "./data/modeNames"
import {
    createOneToneColor,
    createOneToneColors,
    createRandomColor,
    createRandomInitialColors,
    createRandomNumber,
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

    const createOneTonePalette = () => {
        const randomHueValue = createRandomNumber(0, 360)

        setColors((prevColors) =>
            prevColors.map((color) => {
                return color.isLocked
                    ? color
                    : createOneToneColor(randomHueValue)
            }).sort((a, b) => {return a.l - b.l})
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
            if (colors[numberOfColors - 1].isLocked === true) {
                alert("Last color locked!")
            } else {
                setNumberOfColors((prevNumber) => prevNumber - 1)
                setColors(colors.slice(0, colors.length - 1))
            }
        }
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
        <div className="flex flex-col h-screen bg-gray-200">
            <section className="flex flex-col justify-center items-center p-6 gap-6">
                <h1 className="text-2xl font-bungee tracking-widest">
                    Palette&nbsp; Pro
                </h1>
                <select
                    name="mode"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm tracking-wider rounded focus:ring-gray-900 focus:border-gray-900 block w-full p-3"
                    onChange={(event) => {
                        setMode(event.target.value)
                    }}
                >
                    {modeNames.map((mode) => (
                        <option key={mode.id}>{mode.name}</option>
                    ))}
                </select>
                <div className="flex items-center gap-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 cursor-pointer hover:bg-gray-300 p-1 transition stroke-2 rounded"
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
                                : mode === "One Tone Wonder"
                                ? createOneTonePalette
                                : () => {}
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
                        className="w-8 h-8 cursor-pointer hover:bg-gray-300 p-1 transition stroke-2 rounded"
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
            <section className="flex flex-col flex-grow sm:flex-row">
                {colorElements}
            </section>
        </div>
    )
}

export default App
