'use client'
import React, {useState} from "react";
import {converter} from "@/utils/mdConverter/converter";
import {clsx} from "clsx";

interface TexteditorProps {
    value: string
    onChange: (content: string) => void
    className: string;
}

export const Texteditor: React.FC<TexteditorProps> = ({className, value, onChange}) => {

    const defaultValue: {
        id: number,
        text: string
    }[] = value.length > 0 ? value.split("\n").map((text: string, index: number) => ({
        id: index,
        text: text
    })) : [{id: 0, text: ""}]

    const [nodes, setNodes] = React.useState<{ id: number, text: string }[]>(defaultValue);
    const [activeElementId, setActiveElementId] = useState<number>(0)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case "Enter": {
                e.preventDefault()
                handleAddNewLine()
                break;
            }
            case "Backspace": {
                handleRemoveLine(e)
                break;
            }
            case "ArrowUp": {
                e.preventDefault()
                handleArrowKeys(1)
                break
            }
            case "ArrowDown": {
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
            }, 0);
        }
    }

    const handleRemoveLine = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (nodes.length > 1) {
            const focusedElement = document.getElementById(String(activeElementId)) as HTMLInputElement
            if (focusedElement && focusedElement.value !== "") return;
            e.preventDefault()
            const index = nodes.findIndex((item) => item.id === activeElementId)
            setNodes((prev) => prev.toSpliced(index, 1))
            const newActiveElement = index === 0 ? nodes[1].id : nodes[index - 1].id
            setActiveElementId(newActiveElement)
            setTimeout(() => {
                document.getElementById(String(newActiveElement))?.focus()
            }, 0);
        }
    }

    const handleAddNewLine = () => {
        if (nodes.length === 0) {
            setNodes([{id: 0, text: ""}])
            setActiveElementId(0)
            setTimeout(() => {
                document.getElementById("0")?.focus()
            }, 0);
        } else {
            const len = nodes.length
            const index = nodes.findIndex((item) => item.id === activeElementId)
            setNodes((prev) => prev.toSpliced(index + 1, 0, {id: len, text: ""}))
            setActiveElementId(len)

            setTimeout(() => {
                document.getElementById(String(len))?.focus()
            }, 0);
        }
    }

    const handleOnChangeOfText = (text: string, id: number) => {
        const index = nodes.findIndex((e) => e.id === id)
        const temp = [...nodes]
        if (index !== -1) {
            temp[index] = {id: id, text: text}
        }
        setNodes(temp)
        onChange(temp.map(((node) => node.text)).join("\n"))
    }
    const defaultStyle = "w-full h-full"
    const style = clsx(defaultStyle, className)
    return <div className={style} tabIndex={-1} onKeyDown={handleKeyDown}>
        {nodes.map((node) =>
            <Node
                key={node.id}
                position={node.id}
                activeElementId={activeElementId}
                value={node.text}
                onChange={handleOnChangeOfText}
                handleChangeActiveElement={setActiveElementId}
            />
        )}
    </div>
}

interface NodeProps {
    position: number;
    activeElementId: number
    handleChangeActiveElement: (id: number) => void
    value: string;
    onChange: (text: string, id: number) => void
}

import getCaretCoordinates from "textarea-caret"
import {DocumentHead} from "@/utils/types/DocumentHead.type";
import {getAllDocuments} from "@/services/documentService";

const Node: React.FC<NodeProps> = ({position, activeElementId, handleChangeActiveElement, value, onChange}) => {
    const [labelPosition, setLabelPosition] = useState<{ x: number, y: number } | null>(null)
    const [filteredNodes, setFilteredNodes] = useState<DocumentHead[]>([])
    // TODO TAKE THE CACHED DOCUMENTS VIA IMMER AND THE OTHER STATE MANAGEMENT TOOL

    const handleOnClick = () => {
        handleChangeActiveElement(position)
        setTimeout(() => {
            document.getElementById(String(position))?.focus()
        }, 0);
    }


    const handleOnChange = async (text: string) => {
        onChange(text, position)
        const input = document.getElementById(String(position)) as HTMLInputElement
        if (input && input.selectionEnd) {
            const match = text.match(/\[\[(.*?)$/);
            if (match) {
                const cords = input.getBoundingClientRect();
                const caret = getCaretCoordinates(input, input.selectionEnd);
                const documents = await getAllDocuments({name: match[1]})
                setFilteredNodes(documents)
                setLabelPosition({x: caret.left + cords.x - 15, y: caret.top + cords.y + 20})
            } else {
                setLabelPosition(null)
            }
        }
    }

    const handleAddLink = (id:number, name:string) => {
        const link = value.replace(/\[\[(.*?)$/, `[[${id}|${name}]]`)
        onChange(link, position)
        setLabelPosition(null)
        setTimeout(() => {
            document.getElementById(String(position))?.focus()
        }, 0);
    }

    return <>
        {labelPosition &&
            <div className={`absolute flex flex-col items-start`}
                 style={{top: `${labelPosition.y}px`, left: `${labelPosition.x}px`}}>{filteredNodes.map((node) =>
                <button key={node.documentId} onClick={() => handleAddLink(node.documentId, node.name)}>{node.name}</button>)}</div>
        }
        {position === activeElementId ?
            <input type={"text"} value={value} onChange={(e) => handleOnChange(e.target.value)}
                   id={String(position)} className={"ml-1 w-full min-h-6 focus:outline-none"}/> :
            <div onClick={handleOnClick} className={"ml-1 w-full min-h-6"}
                 dangerouslySetInnerHTML={{__html: converter(value)}}></div>
        }
    </>
}