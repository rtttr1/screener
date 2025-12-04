// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildSearchParams = (params: Record<string, any>) => {
    const sp = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            sp.append(key, String(value))
        }
    })
    return sp
}
