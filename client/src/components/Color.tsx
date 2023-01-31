import chroma from "chroma-js"
import React from "react"
import { sortedColorNames } from "../data/sortedColorNames"
import {
    checkContrastRatio,
    convertToHexValue,
    convertToRgb,
    findClosestColorName,
} from "../helpers/helperFunctions"

const Color = (props: any) => {
    let lockIconPath: string = props.isLocked
        ? "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        : "M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"

    const hslValue: string = `hsl(${props.h}, ${props.s}%, ${props.l}%)`
    const hexValue: string = convertToHexValue(props.h, props.s, props.l)
    const rgbValue: string = convertToRgb(props.h, props.s, props.l)
    const colorName = findClosestColorName(sortedColorNames, hexValue)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hexValue)
    }

    const textColor = checkContrastRatio(hexValue)

    return (
        <div
            style={{ backgroundColor: `${hslValue}` }}
            className={`flex-grow flex-1 group ${textColor}`}
        >
            <div className="invisible group-hover:visible flex flex-row-reverse justify-between items-center h-full p-10 sm:flex-col sm:justify-evenly sm:gap-20">
                <div className="flex gap-8 flex-row-reverse sm:flex-col">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
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
                        className="w-6 h-6 cursor-pointer"
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
                        className="w-6 h-6 cursor-pointer hidden sm:block"
                        onClick={copyToClipboard}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                        />
                    </svg>
                </div>
                <div className="flex gap-8 items-center text-center sm:flex-col">
                    <span className="visible uppercase text-xl font-bold">
                        {hexValue.replace("#", "")}
                    </span>
                    <span className="capitalize hidden sm:group-hover:block">
                        {colorName}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Color
