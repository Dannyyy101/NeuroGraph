import { createContext, useContext } from 'react'

export const PopUpContext = createContext<() => void>(() => {})
export const usePopUpClose = () => useContext(PopUpContext)
