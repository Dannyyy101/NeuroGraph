"use client";
import Graph from "@/components/Graph";
import { useState } from "react";

export default function Home() {
  const data = {
    nodes: [
      { id: "node1", name: "Node 1" },
      { id: "node2", name: "Node 2" },
      { id: "node3", name: "Node 3" },
    ],
    links: [
      { source: "node1", target: "node2" },
      { source: "node2", target: "node3" },
      { source: "node3", target: "node1" },
    ],
  };
  const [searchedNodes, setSearchedNodes] = useState(data);
  const [userInput, setUserInput] = useState("");

  const handleSearch = (userInput: string) => {
    setUserInput(userInput);
    const nodes = data.nodes.filter((item) =>
      item.name.toLowerCase().includes(userInput.toLowerCase())
    );
    const validNodeIds = nodes.map((item) => item.id);

    const links = data.links
      .map((item) => {
        if (
          !validNodeIds.includes(item.source) ||
          !validNodeIds.includes(item.target)
        ) {
          console.log(item);
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);

    setSearchedNodes({ nodes: nodes, links: links });
  };

  return (
    <div className="w-screen h-screen">
      <h1 className="text-4xl font-bold mt-10 ml-10">NeuroGraph</h1>
      <div className="w-full flex justify-center mt-10">
        <input
          className="w-96 h-10 rounded-md pl-1 border border-black"
          value={userInput}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
      <section className="h-full w-full flex justify-center">
        <Graph data={searchedNodes} />
      </section>
    </div>
  );
}
