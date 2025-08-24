export const makeTextSearchable = (text: string) => {
    return text.replace(/(\s)/g, '').toLowerCase()
}
