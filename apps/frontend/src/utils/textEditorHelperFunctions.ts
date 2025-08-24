export const focusElement = (id: number, index?: number) => {
    setTimeout(() => {
        const element = document.getElementById(String(id)) as HTMLDivElement
        if (element) {
            element.focus()
            const range = document.createRange()
            const selection = window.getSelection()
            const textNode = element.firstChild
            if (index !== undefined && textNode && textNode.nodeType === Node.TEXT_NODE) {
                const textLength = textNode.textContent?.length ?? 0
                range.setStart(textNode, Math.min(index, textLength))
                range.collapse(true)
            } else {
                range.selectNodeContents(element)
                range.collapse(false)
            }

            if (selection) {
                selection.removeAllRanges()
                selection.addRange(range)
            }
        }
    }, 0)
}

export const getCaretPositionOfDiv = (element: HTMLElement, text: string) => {
    const selection = window.getSelection()
    if (!selection) return
    const temp = element.cloneNode(true) as HTMLDivElement
    temp.innerText = text
    temp.style.width = 'fit-content'
    temp.style.height = 'fit-content'
    document.body.appendChild(temp)
    const coordinates = temp.getBoundingClientRect()
    document.body.removeChild(temp)
    return coordinates
}
