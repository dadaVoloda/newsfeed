export type Category = 'index' | 'tech' | 'sport' | 'fashion' | 'politics'

// interface CategoryIds {
//     index: number
//     tech: number
//     sport: number
//     fashion: number
//     politics: number
// }

export const categoryIds: Record<Category, number> = {
    index: 0,
    tech: 1,
    sport: 2,
    fashion: 3,
    politics: 4,
}

export const beautifyDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        month: 'long', day: 'numeric'
    })
}