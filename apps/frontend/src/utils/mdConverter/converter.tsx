import "../../styles/mdStyles.css"
export const converter = (text:string) => {
    let occurrences;
    if((occurrences = (text.match(/#/g) || []).length)){
        console.log(occurrences)
        return text.replace(/^#+(.*?)$/, `<h${occurrences}>$1</h${occurrences}>`)
    }
    return text
}