'use client'
import React, { useState } from 'react'
import { focusElement, getCaretPositionOfDiv } from '@/utils/textEditorHelperFunctions'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { Node } from '@/components/texteditor/Node'

interface TexteditorProps {
    value: string
    onChange: (content: string) => void
    className: string
}

export const Texteditor: React.FC<TexteditorProps> = ({ className, value, onChange }) => {
    const defaultValue: {
        id: number
        text: string
    }[] =
        value.length > 0
            ? value.split('\n').map((text: string, index: number) => ({
                  id: index,
                  text: text,
              }))
            : [{ id: 0, text: '' }]

    const [nodes, setNodes] = React.useState<{ id: number; text: string }[]>(defaultValue)
    const [toolbar, setToolbar] = useState<{ text: string; position: { x: number; y: number } } | null>(null)
    const [activeElementId, setActiveElementId] = useState<number>(0)

    const router = useRouter()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case 'Enter': {
                e.preventDefault()
                handleAddNewLine()
                break
            }
            case 'Backspace': {
                handleRemoveLine(e)
                break
            }
            case 'ArrowUp': {
                e.preventDefault()
                handleArrowKeys(1)
                break
            }
            case 'ArrowDown': {
                handleArrowKeys(-1)
                break
            }
        }
    }

    const handleArrowKeys = (direction: number) => {
        if (nodes.length > 1) {
            const index = nodes.findIndex((item) => item.id === activeElementId)

            const newActiveElement = direction === 1 ? Math.max(0, index - 1) : Math.min(nodes.length - 1, index + 1)
            setActiveElementId(newActiveElement)
            setTimeout(() => {
                document.getElementById(String(newActiveElement))?.focus()
            }, 0)
        }
    }

    const handleRemoveLine = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (nodes.length > 1) {
            const index = nodes.findIndex((item) => item.id === activeElementId)
            if (!nodes[index].text.match(/^<br>/) && nodes[index].text.length > 0) return

            e.preventDefault()

            setNodes((prev) => prev.toSpliced(index, 1))
            const newActiveElement = index === 0 ? nodes[1].id : nodes[index - 1].id
            setActiveElementId(newActiveElement)
            focusElement(newActiveElement)
        }
    }

    const handleAddNewLine = () => {
        if (nodes.length === 0) {
            setNodes([{ id: 0, text: '' }])
            setActiveElementId(0)
            setTimeout(() => {
                document.getElementById('0')?.focus()
            }, 0)
        } else {
            const len = nodes.length
            const index = nodes.findIndex((item) => item.id === activeElementId)
            setNodes((prev) => prev.toSpliced(index + 1, 0, { id: len, text: '' }))
            setActiveElementId(len)
            setTimeout(() => {
                document.getElementById(String(len))?.focus()
            }, 0)
        }
    }

    const handleOnChangeOfText = (text: string, id: number) => {
        const index = nodes.findIndex((e) => e.id === id)
        const temp = [...nodes]
        if (index !== -1) {
            temp[index] = { id: id, text: text }
        }
        setNodes(temp)
        onChange(temp.map((node) => node.text).join('\n'))
    }

    const handleOnMouseUp = () => {
        // TODO IMPLEMENT OWN SELECTION LOGIC FOR FULL TEXT SELECTION
        const selection = window.getSelection()
        if (!selection) return

        const start = selection.anchorOffset
        const end = selection.focusOffset
        if (start === end && !toolbar) {
            setToolbar(null)
            return
        }
        const input = document.getElementById(String(activeElementId)) as HTMLDivElement
        const text = input.innerText.slice(start, end)
        const coordinates = getCaretPositionOfDiv(input, text)
        const cords = input.getBoundingClientRect()
        if (coordinates) {
            setToolbar({
                text: text,
                position: { x: coordinates.left - cords.x - 620, y: coordinates.height + cords.y - 90 },
            })
        }
    }

    const defaultStyle = 'w-full h-full select-text outline-none'
    const style = clsx(defaultStyle, className)

    return (
        <div onMouseUp={handleOnMouseUp} className={style} tabIndex={-1} onKeyDown={handleKeyDown}>
            {nodes.map((node) => (
                <Node
                    key={node.id}
                    position={node.id}
                    activeElementId={activeElementId}
                    value={node.text}
                    onChange={handleOnChangeOfText}
                    handleChangeActiveElement={setActiveElementId}
                    router={router}
                    toolbar={toolbar}
                    closeToolbar={() => setToolbar(null)}
                />
            ))}
        </div>
    )
}
