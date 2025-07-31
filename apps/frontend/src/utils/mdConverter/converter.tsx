import "../../styles/mdStyles.css"
import Link from "next/link";
export const converter = (text:string) => {
    let occurrences;
    if((occurrences = (text.match(/#/g) || []).length)){
        console.log(occurrences)
        return text.replace(/^#+(.*?)$/, `<h${occurrences}>$1</h${occurrences}>`)
    }
    return text.replace(/\[\[(.*?)\|(.*?)]]/g, '<a href=$1>$2</a>')

}