"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {GraphData} from "force-graph";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export default function Graph({ data }: { data: GraphData | null }) {
  const router = useRouter();
  if(data)
  return (
    <ForceGraph2D
      graphData={data}
      height={400}
      width={800}
      nodeColor={(_) => "rgb(235, 110, 60)"}
      onNodeClick={(node) => {
        const id = node.id;
        if (!id) throw new Error("Node has to have a id");

        router.push(`/documents/${String(id)}`);
      }}
    />
  );
}
