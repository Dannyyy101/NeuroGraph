'use client'
import Image from 'next/image'
import icon from '../media/icon.png'
import Link from 'next/link'

export default function Navbar() {
    return (
        <>
            <nav
                className={`flex flex-col items-center h-screen w-16 absolute top-0 left-0 bg-background-100 border border-border`}
            >
                <section className={'w-full h-1/3 flex flex-col items-center'}>
                    <Link href={'/'}>
                        <Image className={'w-10 h-10 my-4 mr-1'} src={icon} alt={'icon'} />
                    </Link>
                    <div className={'h-[1px] w-9/12 bg-border '}></div>
                </section>
                <section className={'w-full h-1/3 flex flex-col items-center'}>
                    <Link className={'mt-4'} href={''}>
                        <span className="material-symbols-outlined icon-size-24">sticky_note_2</span>
                    </Link>
                </section>
            </nav>
        </>
    )
}
