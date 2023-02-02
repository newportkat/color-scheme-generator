import React from "react"
import { ColorObject } from "../interfaces/interfaces"
import { convertToHexValue, copyToClipboard } from "../utils/utils"

const Swatch = (props: any) => {
    const copyHexToClipboard = (h: number, s: number, l: number) => {
        const hexValue = convertToHexValue(h, s, l)
        copyToClipboard(hexValue)
    }

    const hslValues = props.colors.map((color: ColorObject) => (
        <div
            style={{
                backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
            }}
            className="w-10 h-10 cursor-pointer"
            key={color.id}
            onClick={() => {
                copyHexToClipboard(color.h, color.s, color.l)
            }}
        ></div>
    ))

    return (
        <div className="flex flex-wrap">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 p-1 backdrop-contrast-75 hover:backdrop-contrast-50 cursor-pointer"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
            </svg>
            {hslValues}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 p-1 backdrop-contrast-75 hover:backdrop-contrast-50 cursor-pointer"
                onClick={props.deletePalette}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </div>
    )
}

export default Swatch
