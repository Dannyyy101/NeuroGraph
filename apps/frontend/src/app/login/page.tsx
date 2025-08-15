import { GithubIcon, GoogleIcon } from '@/components/Icons'

export default function SignIn() {
    return (
        <main className={'w-full h-screen flex justify-center items-center'}>
            <section
                className={
                    'w-[400px] h-[450px] shadow-xl border-border border rounded-xl pt-2 px-8 flex flex-col items-center'
                }
            >
                <h2 className={'mt-6 text-2xl font-semibold'}>Willkommen zurück</h2>
                <form className={'mt-4 flex flex-col w-full items-center'}>
                    <label className={'w-full'}>E-Mail</label>
                    <input
                        type={'email'}
                        className={
                            'focus:outline-none focus:border-fg-border focus:border-2 pl-1 w-full border-border border rounded-md h-10'
                        }
                    />
                    <label className={'mt-2 w-full'}>Passwort</label>
                    <input type={'password'} className={'w-full border-border border rounded-md h-10'} />
                    <button className={'text-white mt-6 w-full h-10 rounded-md border border-fg-accent bg-accent'}>
                        Einloggen
                    </button>
                </form>
                <div className={'w-full flex items-center my-6'}>
                    <div className={'mx-1 w-1/2 h-[1px] border-fg-border border'}></div>
                    <p className={'text-sm text-gray-400'}>Oder</p>
                    <div className={'mx-1 w-1/2 h-[1px] border-fg-border border'}></div>
                </div>
                <div className={'w-full flex justify-center'}>
                    <form
                        className={'flex justify-center items-center'}
                        action={async () => {
                            'use server'
                        }}
                    >
                        <button
                            className={
                                'bg-[#F2F2F2] mx-2 w-28 h-10 border-border border rounded-md flex justify-center items-center'
                            }
                        >
                            <GoogleIcon />
                        </button>
                    </form>
                    <form
                        className={'flex justify-center items-center'}
                        action={async () => {
                            'use server'
                        }}
                    >
                        <button
                            className={
                                'bg-[#F2F2F2] mx-2 w-28 h-10 border-border border rounded-md flex justify-center items-center'
                            }
                        >
                            <GoogleIcon />
                        </button>
                    </form>
                    <form
                        className={'flex justify-center items-center'}
                        action={async () => {
                            'use server'
                        }}
                    >
                        <button
                            className={
                                'bg-[#F2F2F2] mx-2 w-28 h-10 border-border border rounded-md flex justify-center items-center'
                            }
                        >
                            <GithubIcon />
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}
