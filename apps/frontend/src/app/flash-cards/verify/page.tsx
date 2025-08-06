import { getAllPrompts } from '@/services/flashcardService'

export default async function Page() {
    const prompts = await getAllPrompts()

    return (
        <main className={'w-full h-screen flex-col flex items-center overflow-y-auto'}>
            <div className={'w-full mt-12'}>
                <h1 className="text-4xl font-bold ml-10 ">Validiere KI generierte Karteikarten</h1>
            </div>
            <table className={'w-3/4 mt-16 mb-8 h-fit table-fixed border-collapse'}>
                <thead>
                    <tr className={'border border-border'}>
                        <th className={'w-10/12'}>Prompt</th>
                        <th className={'w-2/12'}>Erstellt Am</th>
                    </tr>
                </thead>
                <tbody>
                    {prompts.map((prompt) => (
                        <tr key={prompt.flashcardPromptId} className={'border border-border'}>
                            <td>{prompt.prompt}</td>
                            <td>{prompt.createdOn && new Date(prompt.createdOn).toISOString().split('T')[0]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
