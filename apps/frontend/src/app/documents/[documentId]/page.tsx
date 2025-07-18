"use client";
import { useState } from "react";

export default function Document() {
  const [content, setContent] = useState<string>("");

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className="w-2/3 h-2/3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full pl-1 border border-secondary-200 rounded-md resize-none focus:outline-none"
        ></textarea>
      </section>
    </main>
  );
}
