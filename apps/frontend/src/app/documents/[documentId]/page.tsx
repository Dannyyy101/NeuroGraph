"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {DocumentBody} from "@/utils/types/documentBody.type";

export default function Document() {
  const [document, setDocument] = useState<DocumentBody | null>(null);
  const [updatedDocument, setUpdatedDocument] = useState<DocumentBody | null>(null);
  const params = useParams<{documentId:string}>()
    const documentId = parseInt(params.documentId, 10);
    useEffect(() => {
    const fetchDocument = async () => {
      const response = await fetch(
        `http://localhost:8080/api/documents/${documentId}`
      );
      const result = await response.json();
      setDocument(result);
      setUpdatedDocument(result);
    }
    fetchDocument()
    }, [documentId]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (JSON.stringify(document) !== JSON.stringify(updatedDocument)) {
                fetch(`http://localhost:8080/api/documents/${documentId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedDocument)
                });
                setDocument(updatedDocument);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [document, updatedDocument, documentId]);

    if(!document || !updatedDocument) return <div>Loading...</div>;

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
            value={updatedDocument.name}
            onChange={(e) => setUpdatedDocument({...document, name: e.target.value})}
          className="w-full h-10 pl-1 text-2xl focus:outline-none"
          placeholder="Titel"
        />
        <div className="h-[1px] w-full bg-gray-300"></div>
        <textarea
          placeholder="Content"
          value={updatedDocument.content}
          onChange={(e) => setUpdatedDocument({...document, content: e.target.value})}
          className="mt-2 w-full h-full pl-1 rounded-md resize-none focus:outline-none"
        ></textarea>
      </section>
    </main>
  );
}
