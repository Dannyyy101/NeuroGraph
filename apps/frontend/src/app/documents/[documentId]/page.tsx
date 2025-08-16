'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { DocumentBody } from '@/utils/types/documentBody.type'
import { Texteditor } from '@/components/texteditor/Texteditor'
import { deleteDocumentById, getDocumentById, updateDocumentById } from '@/services/documentService'
import { Label } from '@/components/Label'
import { PopUpView } from '@/components/PopUpView'
import { useRouter } from 'next/navigation'

export default function Document() {
    const [document, setDocument] = useState<DocumentBody | null>(null)
    const [updatedDocument, setUpdatedDocument] = useState<DocumentBody | null>(null)
    const params = useParams<{ documentId: string }>()
    const documentId = parseInt(params.documentId, 10)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        const fetchDocument = async () => {
            const { result } = await getDocumentById(documentId)
            setDocument(result)
            setUpdatedDocument(result)
        }
        fetchDocument()
    }, [documentId])

    useEffect(() => {
        const interval = setInterval(async () => {
            if (updatedDocument && JSON.stringify(document) !== JSON.stringify(updatedDocument)) {
                await updateDocumentById(documentId, updatedDocument)
                setDocument(updatedDocument)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [document, documentId, updatedDocument])

    useEffect(() => {
        const handleUnload = async () => {
            if (updatedDocument && JSON.stringify(document) !== JSON.stringify(updatedDocument)) {
                await updateDocumentById(documentId, updatedDocument)
                setDocument(updatedDocument)
            }
        }

        window.addEventListener('unload', handleUnload)
        return () => window.removeEventListener('unload', handleUnload)
    }, [document, documentId, updatedDocument])

    if (!document || !updatedDocument) return <div>Loading...</div>

    const handleDeleteDocument = async () => {
        await deleteDocumentById(documentId)
        router.push('/')
    }

    return (
        <main className="w-full h-screen flex justify-center items-center">
            <Link href={'/'} className="text-4xl font-bold ml-10 absolute left-16 top-10">
                NeuroGraph
            </Link>
            <div className={'flex w-full h-full'}>
                <section className="w-full h-2/3 ml-16 mt-32">
                    <input
                        value={updatedDocument.name}
                        onChange={(e) => setUpdatedDocument({ ...updatedDocument, name: e.target.value })}
                        className="w-full h-10 pl-1 text-2xl focus:outline-none"
                        placeholder="Titel"
                    />
                    <div className="h-[1px] w-full bg-border"></div>
                    <Texteditor
                        className={'mt-2'}
                        value={updatedDocument.content}
                        onChange={(content: string) => setUpdatedDocument({ ...updatedDocument, content: content })}
                    ></Texteditor>
                </section>
                <section className={'mx-8 w-72 mt-32'}>
                    <div className={'w-full flex'}>
                        <p className={'w-full font-normal text-xl'}>Settings</p>
                        <button>
                            <span className="material-symbols-outlined icon-size-24">settings</span>
                        </button>
                    </div>
                    <div className={'my-2 w-full h-[1px] bg-border'}></div>
                    <div className={'w-full flex-col flex'}>
                        <p className={'w-full font-normal text-xl'}>Labels</p>
                        <div className={'flex w-full'}>
                            <Label className={'bg-bg-danger-emphasis text-white'}>Mathe</Label>
                            <Label className={'bg-bg-attention-emphasis text-white'}>Mathe</Label>
                        </div>
                    </div>
                    <div className={'my-2 w-full h-[1px] bg-border'}></div>
                    <button onClick={() => setShowDeleteDialog(true)} className={'flex items-center'}>
                        <span className="material-symbols-outlined icon-size-20 text-bg-danger-emphasis">Delete</span>
                        <p className={'text-bg-danger-emphasis'}>Delete Document</p>
                    </button>
                    {showDeleteDialog && (
                        <PopUpView handlePopUpClose={() => setShowDeleteDialog(false)}>
                            <section className={'w-96 h-56 flex flex-col p-4 relative'}>
                                <h3 className={'mt-2'}>Delete Document</h3>
                                <p>Are you sure that you want to delete this document?</p>
                                <button
                                    onClick={() => setShowDeleteDialog(false)}
                                    className={'w-32 h-10 absolute bottom-4 left-4 border border-black rounded-md'}
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleDeleteDocument}
                                    className={
                                        'w-32 h-10 absolute bottom-4 right-4 text-white bg-bg-danger-emphasis rounded-md'
                                    }
                                >
                                    Delete
                                </button>
                            </section>
                        </PopUpView>
                    )}
                </section>
            </div>
        </main>
    )
}
