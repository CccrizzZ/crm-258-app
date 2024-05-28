import { atom } from 'jotai'

export const countAtom = atom<number>(0)
export const citiesAtom = atom<string[]>(['New York', 'Toronto', 'Detroit'])
// export const mangaAtom = atom({ 'Dragon Ball': 1984, 'One Piece': 1997, Naruto: 1999 })

export const isLoadingAtom = atom<boolean>(false)

export const invoiceArr = atom<string[]>(['I1', 'I2'])