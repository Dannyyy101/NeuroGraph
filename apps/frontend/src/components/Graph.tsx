"use client";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export default function Graph({ data }: { data: any }) {
  return <ForceGraph2D graphData={data} height={400} width={800} />;
}
