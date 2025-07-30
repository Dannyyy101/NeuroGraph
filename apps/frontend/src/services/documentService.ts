'use server'
import {DocumentHead} from "@/utils/types/DocumentHead.type";
import {BACKEND_URL} from "@/utils/constants";

export const getAllDocuments = async () => {
    const response = await fetch(`${BACKEND_URL}/documents/`)
    return await response.json() as DocumentHead[]
}