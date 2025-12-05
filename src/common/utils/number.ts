// String 타입 숫자를 안전하게 Number 타입으로 변환
export const getSafeNumberFromString = (value: unknown): number | null => {
    if (value === null || value === undefined) {
        return null
    }

    const cleanValue = String(value).trim().replace(/,/g, '')

    if (cleanValue === '') {
        return null
    }

    const cleanNumber = Number(cleanValue)

    return cleanNumber
}
