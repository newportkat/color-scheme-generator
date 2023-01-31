import chroma from "chroma-js"
import { nanoid } from "nanoid"
import { colorNames } from "../data/colorNames"
import { ColorObject } from "../interfaces/interfaces"

export const createRandomNumber = (min: number, max: number): number => {
    const randomNumber: number = Math.floor(Math.random() * (max + 1)) + min

    return randomNumber
}

export const createNewColor = (): ColorObject => {
    const h: number = createRandomNumber(0, 360)
    const s: number = createRandomNumber(0, 100)
    const l: number = createRandomNumber(0, 100)

    return { h, s, l, isLocked: false, id: nanoid() }
}

export const createNewColors = (numberOfColors: number): ColorObject[] => {
    const newColors: ColorObject[] = []

    for (let i = 0; i < numberOfColors; i++) {
        newColors.push(createNewColor())
    }

    return newColors
}

export const convertToHexValue = (h: number, s: number, l: number): string => {
    //chroma requires saturation and lightness to be a % value
    const hexValue = chroma(h, s / 100, l / 100, "hsl").hex()

    return hexValue
}

export const convertToRgb = (h: number, s: number, l: number): string => {
    //chroma requires saturation and lightness to be a % value
    const [r, g, b] = chroma(h, s / 100, l / 100, "hsl").rgb()

    return `rgb(${r}, ${g}, ${b})`
}

export const findColorName = (hexValue: string): string => {
    let closestMatch: number = 100
    let closestName: string = ""

    //chroma.deltaE calculates color difference
    //resulting values range from 0 (no difference) to 100 (max difference)
    colorNames.forEach((entry) => {
        const colorDifference = chroma.deltaE(hexValue, entry.hex)
        if (colorDifference < closestMatch) {
            closestMatch = colorDifference
            closestName = entry.name
        }
    })
    return closestName
}
