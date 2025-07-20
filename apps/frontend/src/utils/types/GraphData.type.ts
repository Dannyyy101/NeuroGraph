export interface GraphData{
    nodes: {
        id: number;
        name: string;
    }[];
    links: {
        source: number;
        target: number;
    }[];
}