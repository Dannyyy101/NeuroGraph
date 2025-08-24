import { getAllDecks } from '@/services/deckService'
import Link from 'next/link'

export default async function Page() {
    const { result: decks, error } = await getAllDecks()

    if (!decks) return <div>No decks found</div>

    return (
        <main className={'w-full h-screen flex justify-center'}>
            <h1 className="text-4xl font-bold ml-10 absolute left-16 top-10">Decks</h1>
            <section className={'w-11/12 flex flex-wrap mt-32'}>
                {decks.map((deck) => (
                    <Link
                        href={`/decks/${deck.deckId}`}
                        className={'w-72 h-40 p-4 border border-border rounded-md'}
                        key={deck.deckId}
                    >
                        <h2 className={'text-xl font-semibold'}>{deck.name}</h2>
                    </Link>
                ))}
            </section>
        </main>
    )
}
