

export const isStringType = (v: string | undefined) => typeof v === 'string'

export const isNonEmptyString = (v:string) => v.trim().length > 0

export const isNumber = (v: string) => !isNaN(parseInt(v, 10))

export const isInRange = (start: number, end: number) => (num:number) =>  num > start && num <= end