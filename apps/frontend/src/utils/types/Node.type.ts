import { Label } from "./Label.type";

export interface Node {
    id: string;
    name: string
    content: string
    labels: Label[]
}