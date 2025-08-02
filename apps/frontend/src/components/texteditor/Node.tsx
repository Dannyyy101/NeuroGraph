'use client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React, { useState } from 'react'
import { DocumentHead } from '@/utils/types/DocumentHead.type'
import { getAllDocuments } from '@/services/documentService'
import ContentEditable from 'react-contenteditable'
import { focusElement } from '@/utils/textEditorHelperFunctions'
import { converter } from '@/utils/mdConverter/converter'

interface NodeProps {
    position: number
    activeElementId: number
    handleChangeActiveElement: (id: number) => void
    value: string
    onChange: (text: string, id: number) => void
    router: AppRouterInstance
}

export const Node: React.FC<NodeProps> = ({
    position,
    activeElementId,
    handleChangeActiveElement,
    value,
    onChange,
    router,
}) => {
    const [labelPosition, setLabelPosition] = useState<{ x: number; y: number } | null>(null)
    const [filteredNodes, setFilteredNodes] = useState<DocumentHead[]>([])

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLElement).nodeName === 'A') {
            router.push((e.target as HTMLAnchorElement).href)
            return
        }
        handleChangeActiveElement(position)
        setTimeout(() => {
            document.getElementById(String(position))?.focus()
        }, 0)
    }

    const handleOnChange = async (text: string) => {
        if (!active) return
        onChange(text, position)
        const input = document.getElementById(String(position)) as HTMLDivElement
        if (input) {
            const match = text.match(/\[\[(.*?)(?:\s|$)/)
            const selection = window.getSelection()
            if (match && selection) {
                const documentSearchName = match[1]
                const temp = input.cloneNode(true) as HTMLDivElement
                temp.innerText = text.slice(0, selection.anchorOffset - documentSearchName.length)
                temp.style.width = 'fit-content'
                temp.style.height = 'fit-content'
                document.body.appendChild(temp)
                const coordinates = temp.getBoundingClientRect()
                document.body.removeChild(temp)

                const cords = input.getBoundingClientRect()
                const documents = await getAllDocuments(
                    documentSearchName.length > 0 ? { name: documentSearchName } : undefined
                )
                setFilteredNodes(documents)
                setLabelPosition({ x: coordinates.width + cords.x - 52, y: coordinates.height + cords.y })
            } else {
                setLabelPosition(null)
            }
        }
    }

    const handleAddLink = (id: number, name: string) => {
        const link = value.replace(/\[\[(.*?)(?:\s|$)/, `[[${id}|${name}]] `)
        onChange(link, position)
        setLabelPosition(null)
        focusElement(position)
    }
    const active = activeElementId === position

    return (
        <>
            {labelPosition && filteredNodes.length > 0 && (
                <li
                    className={`z-10 bg-white rounded-md absolute flex flex-col items-start w-32 max-h-20 overflow-y-auto border-border border`}
                    style={{ top: `${labelPosition.y}px`, left: `${labelPosition.x}px` }}
                >
                    {filteredNodes.map((node) => (
                        <ul key={node.documentId + '-searched-documents'} className={'w-full'}>
                            <button
                                className={'px-2 w-full text-left hover:bg-fg-border'}
                                onClick={() => handleAddLink(node.documentId, node.name)}
                            >
                                {node.name}
                            </button>
                        </ul>
                    ))}
                </li>
            )}
            <ContentEditable
                id={position}
                html={active ? value : converter(value)}
                onChange={(e) => handleOnChange(e.target.value)}
                onMouseDown={handleOnClick}
                className={'ml-1 w-full min-h-6 focus:outline-none select-text'}
            ></ContentEditable>
        </>
    )
}
