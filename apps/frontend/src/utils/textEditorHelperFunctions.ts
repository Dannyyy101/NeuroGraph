export const focusElement = (id: number) => {
    setTimeout(() => {
        const element = document.getElementById(String(id)) as HTMLDivElement
        if (element) {
            element.focus()
            const range = document.createRange()
            const selection = window.getSelection()

            range.selectNodeContents(element)
            range.collapse(false)
            if (selection) {
                selection.removeAllRanges()
                selection.addRange(range)
            }
        }
    }, 0)
}
