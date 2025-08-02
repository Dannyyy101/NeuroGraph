import '../../styles/mdStyles.css'

export const converter = (text: string) => {
    let occurrences
    if ((occurrences = (text.match(/#/g) || []).length)) {
        return text.replace(/^#+(.*?)$/, `<h${occurrences}>$1</h${occurrences}>`)
    }
    if (text.match(/^---/))
        return "<div class='w-full h-6 flex items-center'><div class='h-[1px] w-full  bg-border'></div></div>"

    return text.replace(/\[\[(.*?)\|(.*?)]]/g, '<a class="hover:cursor-pointer" href=$1>$2</a>')
}
