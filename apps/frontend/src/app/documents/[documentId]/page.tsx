"use client";
import Link from "next/link";
import { useState } from "react";

export default function Document() {
  const [content, setContent] = useState<string>("");

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Link
        href={"/"}
        className="text-4xl font-bold ml-10 absolute left-8 top-10"
      >
        NeuroGraph
      </Link>
      <section className="w-2/3 h-2/3">
        <input
          className="w-full h-10 pl-1 text-2xl focus:outline-none"
          placeholder="Titel"
        />
        <div className="h-[1px] w-full bg-gray-300"></div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2 w-full h-full pl-1 rounded-md resize-none focus:outline-none"
        ></textarea>
      </section>
    </main>
  );
}
