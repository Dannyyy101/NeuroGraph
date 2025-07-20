"use client";
import Graph from "@/components/Graph";
import {useEffect, useState} from "react";
import {DocumentHead} from "@/utils/types/DocumentHead.type";
import {GraphData} from "@/utils/types/GraphData.type";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await fetch("http://localhost:8080/api/documents/")
            const result = await response.json() as DocumentHead[]
            const nodes = result.map((item) => ({id: item.documentId, name: item.name}))
            const links = result.map((item => item.linkedDocumentIds.map((linkedId) => ({
                source: item.documentId,
                target: linkedId
            }))))
            setNodes({nodes: nodes, links: links.flat()});
            setSearchedNodes({nodes: nodes, links: links.flat()});
        }
        fetchDocuments()
    }, []);

    const [nodes, setNodes] = useState<GraphData | null>(null);
    const [searchedNodes, setSearchedNodes] = useState<GraphData | null>(nodes);
    const [userInput, setUserInput] = useState("");

    if(!nodes) return <div></div>

    const handleSearch = (userInput: string) => {
        setUserInput(userInput);

        if(userInput.length === 0) {
            setSearchedNodes(nodes);
            return;
        }

        const nodesByName = nodes.nodes.filter((item) =>
            item.name.toLowerCase().includes(userInput.toLowerCase())
        );
        const validNodeIds = nodesByName.map((item) => item.id);

        const links = nodes.links
            .map((item) => {
                if (
                    !validNodeIds.includes(item.source) ||
                    !validNodeIds.includes(item.target)
                ) {
                    return null;
                }
                return item;
            })
            .filter((item) => item !== null);

        setSearchedNodes({nodes: nodesByName, links: links});
    };

    const handleAddDocument = async () => {
        const response = await fetch("http://localhost:8080/api/documents/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: userInput, content: ""})
        });
        const data = await response.json()
        router.push(`/documents/${data}`)
    }

    return (
        <div className="">
            <h1 className="text-4xl font-bold ml-10 absolute left-8 top-10">
                NeuroGraph
            </h1>
            <div className="w-full flex flex-col items-center mt-40">
                <input
                    className="w-96 h-10 rounded-md pl-1 border border-black"
                    value={userInput}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search"
                />{searchedNodes && searchedNodes.nodes.length === 0 &&
                <button className={"h-8"} onClick={handleAddDocument}>Dokument hinzufügen?</button>
            }
            </div>
            <section className="h-fit w-full flex justify-center">
                <Graph data={searchedNodes}/>
            </section>
        </div>
    );
}
