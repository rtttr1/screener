export const REGIONS = {
    DOMESTIC: 'domestic',
    OVERSEAS: 'overseas',
} as const

export type RegionType = (typeof REGIONS)[keyof typeof REGIONS]

export const REGION_LABEL: Record<RegionType, string> = {
    [REGIONS.DOMESTIC]: '국내',
    [REGIONS.OVERSEAS]: '해외',
} as const

export const REGION_ITEMS = Object.values(REGIONS).map((region) => ({
    value: region,
    label: REGION_LABEL[region],
}))
