// server addy from .env
export const server = import.meta.env.VITE_APP_SERVER
// check if two object have identical keys and values
export const isObjectsEqual = (a: Object, b: Object) => JSON.stringify(a) === JSON.stringify(b)
// for all number input
export const stringToNumber = (input: string) => isNaN(Number(input)) ? 0 : Number(input)
// sleep function
export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));