import React, { useState } from "react"
import Color from "./components/Color"
import { createNewColor, createNewColors } from "./helpers/helperFunctions"
import { ColorObject } from "./interfaces/interfaces"

const App = () => {
    const [numberOfColors, setNumberOfColors] = useState(4)
    const [colors, setColors] = useState(createNewColors(numberOfColors))

    const createPalette = () => {
        setColors((prevColors) =>
            prevColors.map((color) => {
                return color.isLocked ? color : createNewColor()
            })
        )
    }

    const lockColor = (id: string) => {
        setColors((prevColors) =>
            prevColors.map((color) => {
                console.log(color.id, id)
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
            setColors([...colors, createNewColor()])
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
        <div className="flex flex-col h-screen">
            <section>
                <button
                    onClick={createPalette}
                    onKeyDown={(event) => {
                        if (event.key === "Space" || event.key === "Enter") {
                            createPalette()
                        }
                    }}
                >
                    Generate
                </button>
                <button onClick={increaseColors}>Add</button>
                <button onClick={decreaseColors}>Subtract</button>
            </section>
            <section className="flex flex-grow">{colorElements}</section>
        </div>
    )
}

export default App
