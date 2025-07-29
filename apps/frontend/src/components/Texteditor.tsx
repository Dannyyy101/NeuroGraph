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

const Node: React.FC<NodeProps> = ({position, activeElementId, handleChangeActiveElement, value, onChange}) => {
    const handleOnClick = () => {
        handleChangeActiveElement(position)
        setTimeout(() => {
            document.getElementById(String(position))?.focus()
        }, 0);
    }

    const handleOnChange = (text: string) => {
        onChange(text, position)
    }

    return <>
        {position === activeElementId ?
            <input value={value} onChange={(e) => handleOnChange(e.target.value)}
                   id={String(position)} className={"ml-1 w-full min-h-6 focus:outline-none"}/> :
            <div onClick={handleOnClick} className={"ml-1 w-full min-h-6"}
                 dangerouslySetInnerHTML={{__html: converter(value)}}></div>
        }
    </>
}