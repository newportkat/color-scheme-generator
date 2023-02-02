import chroma from "chroma-js"
import html2canvas from "html2canvas"
import { nanoid } from "nanoid"
import { ColorName, ColorObject } from "../interfaces/interfaces"

export const createRandomNumber = (min: number, max: number): number => {
    const randomNumber: number =
        Math.floor(Math.random() * (max - min + 1)) + min

    return randomNumber
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

export const findClosestColorName = (
    colorNames: ColorName[],
    hexValue: string
): string => {
    let low = 0,
        high = colorNames.length - 1
    let closestMatch = Number.MAX_SAFE_INTEGER,
        closestName = ""
    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        const colorDifference = chroma.deltaE(hexValue, colorNames[mid].hex)
        if (colorDifference < closestMatch) {
            closestMatch = colorDifference
            closestName = colorNames[mid].name
        }
        if (colorDifference === 0) {
            break
        }
        if (hexValue > colorNames[mid].hex) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return closestName
}

export const checkContrastRatio = (hexValue: string): string => {
    //contrast of 4.5:1 is recommended to ensure text is readable
    const contrastRatio: number = chroma.contrast(hexValue, "#000000")

    if (contrastRatio > 4.5) {
        return "gray-800"
    } else {
        return "gray-200"
    }
}

export const createRandomColor = (): ColorObject => {
    const h: number = createRandomNumber(0, 360)
    const s: number = createRandomNumber(0, 100)
    const l: number = createRandomNumber(0, 100)

    return { h, s, l, isLocked: false, id: nanoid() }
}

export const createRandomInitialColors = (
    numberOfColors: number
): ColorObject[] => {
    const newColors: ColorObject[] = []

    for (let i = 0; i < numberOfColors; i++) {
        newColors.push(createRandomColor())
    }

    return newColors
}

export const createHueValueColor = (hueValue: number): ColorObject => {
    const h: number = hueValue
    const s: number = createRandomNumber(0, 100)
    const l: number = createRandomNumber(0, 100)

    return { h, s, l, isLocked: false, id: nanoid() }
}

export const createPastelColor = (): ColorObject => {
    const h: number = createRandomNumber(0, 360)
    const s: number = createRandomNumber(30, 50)
    const l: number = createRandomNumber(50, 80)

    return { h, s, l, isLocked: false, id: nanoid() }
}
export const createVibrantColor = (): ColorObject => {
    const h: number = createRandomNumber(0, 360)
    const s: number = createRandomNumber(80, 100)
    const l: number = createRandomNumber(30, 50)

    return { h, s, l, isLocked: false, id: nanoid() }
}

export const createNeutralColor = (): ColorObject => {
    const h: number = createRandomNumber(0, 360)
    const s: number = createRandomNumber(0, 30)
    const l: number = createRandomNumber(30, 50)

    return { h, s, l, isLocked: false, id: nanoid() }
}

export const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
}

export const downloadImage = (blob: string, filename: string) => {
    const fakeLink = window.document.createElement("a")
    fakeLink.setAttribute("style", "display:none")
    fakeLink.download = filename
    fakeLink.href = blob

    document.body.appendChild(fakeLink)
    fakeLink.click()
    document.body.removeChild(fakeLink)

    fakeLink.remove()
}

export const exportAsImage = async (
    element: HTMLElement,
    imageFileName: string
) => {
    const canvas = await html2canvas(element)
    const image = canvas.toDataURL("image/png", 1.0)
    downloadImage(image, imageFileName)
}
