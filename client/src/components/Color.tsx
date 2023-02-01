import chroma from "chroma-js"
import React, { useEffect, useState } from "react"
import { sortedColorNames } from "../data/sortedColorNames"
import {
    checkContrastRatio,
    convertToHexValue,
    convertToRgb,
    findClosestColorName,
} from "../helpers/helperFunctions"

const Color = (props: any) => {
    const [hue, setHue] = useState(props.h)
    const [saturation, setSaturation] = useState(props.s)
    const [lightness, setLightness] = useState(props.l)
    const [textColor, setTextColor] = useState("")

    let lockIconPath: string = props.isLocked
        ? "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        : "M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"

    const hexValue: string = convertToHexValue(hue, saturation, lightness)
    const hslValue: string = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    const rgbValue: string = convertToRgb(hue, saturation, lightness)
    const colorName = findClosestColorName(sortedColorNames, hexValue)

    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value)
    }

    useEffect(() => {
        const hexValue: string = convertToHexValue(hue, saturation, lightness)
        const contrastRatioColor: string = checkContrastRatio(hexValue)
        setTextColor(`text-${contrastRatioColor}`)
    }, [hue, saturation, lightness])

    const contrastRatioColor = checkContrastRatio(hexValue)

    return (
        <div
            style={{ backgroundColor: `${hslValue}` }}
            className={`flex-grow flex-1 group ${
                textColor ? textColor : "text-gray-200"
            }`}
        >
            <div className="invisible group-hover:visible h-full flex flex-row-reverse justify-around items-center lg:flex-col">
                <div className="flex flex-row-reverse gap-8 lg:flex-col">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-9 h-9 stroke-2 p-1 cursor-pointer rounded transition hover:backdrop-contrast-75`}
                        style={{}}
                        onClick={props.isLocked ? () => {} : props.deleteColor}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-9 h-9 stroke-2 p-1.5 cursor-pointer rounded transition hover:backdrop-contrast-75`}
                        onClick={props.lockColor}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={lockIconPath}
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-9 h-9 stroke-2 p-1 cursor-pointer rounded transition hover:backdrop-contrast-75 hidden sm:block`}
                        onClick={() => {
                            copyToClipboard(hexValue)
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                        />
                    </svg>
                </div>

                <div className="hidden lg:flex lg:flex-col gap-5">
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={hue}
                        onChange={(event) => {
                            setHue(event.target.value)
                        }}
                        className="w-28 cursor-pointer"
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={saturation}
                        onChange={(event) => {
                            setSaturation(event.target.value)
                        }}
                        className="w-28 cursor-pointer"
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={lightness}
                        onChange={(event) => {
                            setLightness(event.target.value)
                        }}
                        className="w-28 cursor-pointer"
                    />
                </div>

                <div className="flex flex-col gap-2 lg:text-center">
                    <span
                        className={`visible uppercase text-xl font-bold cursor-pointer`}
                        onClick={() => {
                            copyToClipboard(hexValue)
                        }}
                    >
                        {hexValue.replace("#", "")}
                    </span>

                    <span
                        className="visible capitalize text-sm cursor-pointer flex-shrink-0"
                        onClick={() => {
                            copyToClipboard(colorName)
                        }}
                    >
                        {colorName}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Color
