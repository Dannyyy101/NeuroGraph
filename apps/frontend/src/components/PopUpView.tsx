'use client'
import { PopUpContext } from '@/context/PopUpContext'
import React, { useEffect, useRef } from 'react'

interface PopUpViewProps {
    children: React.ReactNode
    handlePopUpClose: () => void
    closeOnOutsideClick?: boolean
}

export const PopUpView: React.FC<PopUpViewProps> = ({ children, handlePopUpClose, closeOnOutsideClick = true }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node) && closeOnOutsideClick) {
                handlePopUpClose()
            }
        }

        window.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [closeOnOutsideClick, handlePopUpClose])

    return (
        <>
            <PopUpContext.Provider value={handlePopUpClose}>
                <div className="fixed inset-0 bg-white opacity-50 z-40"></div>
                <section
                    ref={inputRef}
                    className="shadow-xl z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit rounded-lg bg-white flex flex-col items-center"
                >
                    {children}
                </section>
            </PopUpContext.Provider>
        </>
    )
}
