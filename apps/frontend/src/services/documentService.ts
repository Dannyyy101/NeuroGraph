'use server'
import {DocumentHead} from "@/utils/types/DocumentHead.type";

export const getAllDocuments = async () => {
    const response = await fetch("http://backend:8080/api/documents/")
    return await response.json() as DocumentHead[]
}