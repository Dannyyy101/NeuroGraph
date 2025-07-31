import { create } from 'zustand'

interface BearState {
    nodes: {id: number, titel:string}[]
}

const useNodes = create<BearState>()((set) => ({
    nodes: [],

}))
