import React, { MutableRefObject, useRef } from "react"
import { ColorObject } from "../interfaces/interfaces"
import {
    convertToHexValue,
    copyToClipboard,
    exportAsImage,
} from "../utils/utils"

const Swatch = (props: any) => {
    const exportRef: any = useRef()

    const copyHexToClipboard = (h: number, s: number, l: number) => {
        const hexValue = convertToHexValue(h, s, l)
        copyToClipboard(hexValue)
    }

    const swatchElements = props.colors.map((color: ColorObject) => (
        <div
            style={{
                backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
            }}
            className="h-12 w-12 cursor-pointer"
            key={color.id}
            onClick={() => {
                copyHexToClipboard(color.h, color.s, color.l)
            }}
        ></div>
    ))

    return (
        <div className="flex flex-wrap ">
            <div className="h-12 w-12 flex-shrink-0 cursor-pointer p-1 backdrop-contrast-75 hover:backdrop-contrast-50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={() => exportAsImage(exportRef.current, props.id)}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                </svg>
            </div>
            <div ref={exportRef} className="flex flex-wrap">
                {swatchElements}
            </div>
            <div className="h-12 w-12 flex-shrink-0 cursor-pointer p-1 backdrop-contrast-75 hover:backdrop-contrast-50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={props.deletePalette}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Swatch
