export interface ColorObject {
    h: number
    s: number
    l: number
    isLocked: boolean
    id: string
}

export interface ColorName {
    name: string
    hex: string
}

export interface SavedPalette {
    colors: ColorObject[],
    id: string
}