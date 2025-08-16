'use client'
import Graph from '@/components/Graph'
import { useEffect, useState } from 'react'
import { GraphData } from '@/utils/types/GraphData.type'
import { useRouter } from 'next/navigation'
import { createNewDocument, getAllDocuments } from '@/services/documentService'

export default function Home() {
    const router = useRouter()

    const [nodes, setNodes] = useState<GraphData | null>(null)
    const [searchedNodes, setSearchedNodes] = useState<GraphData | null>(nodes)
    const [userInput, setUserInput] = useState('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        const fetchDocuments = async () => {
            const { result, error } = await getAllDocuments()

            if (!result || error) {
                setErrorMessage(error)
                return
            }

            const nodes = result.map((item) => ({ id: item.documentId, name: item.name }))
            const links = result.map((item) =>
                item.linkedDocumentIds.map((linkedId) => ({
                    source: item.documentId,
                    target: linkedId,
                }))
            )
            setNodes({ nodes: nodes, links: links.flat() })
            setSearchedNodes({ nodes: nodes, links: links.flat() })
        }
        fetchDocuments()
    }, [])

    if (errorMessage)
        return (
            <div className={'text-red-600 text-3xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'}>
                {errorMessage}
            </div>
        )

    if (!nodes) return <div></div>

    const handleSearch = (userInput: string) => {
        setUserInput(userInput)

        if (userInput.length === 0) {
            setSearchedNodes(nodes)
            return
        }

        const nodesByName = nodes.nodes.filter((item) => item.name.toLowerCase().includes(userInput.toLowerCase()))
        const validNodeIds = nodesByName.map((item) => item.id)

        const links = nodes.links
            .map((item) => {
                if (!validNodeIds.includes(item.source) || !validNodeIds.includes(item.target)) {
                    return null
                }
                return item
            })
            .filter((item) => item !== null)

        setSearchedNodes({ nodes: nodesByName, links: links } as GraphData)
    }

    const handleAddDocument = async () => {
        const { result } = await createNewDocument(userInput)
        router.push(`/documents/${result?.documentId}`)
    }

    return (
        <div className="w-full">
            <h1 className="text-4xl font-bold ml-10 absolute left-16 top-10">NeuroGraph</h1>
            <div className="w-full flex flex-col items-center mt-40">
                <input
                    className="w-96 h-10 rounded-md pl-1 border border-black"
                    value={userInput}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search"
                />
                {searchedNodes && searchedNodes.nodes.length === 0 && (
                    <button className={'h-8'} onClick={handleAddDocument}>
                        Dokument hinzufügen?
                    </button>
                )}
            </div>
            <section className="h-fit w-full flex justify-center">
                <Graph data={searchedNodes} />
            </section>
        </div>
    )
}
