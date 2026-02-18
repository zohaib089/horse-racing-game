import type { Horse } from "./Horse";

export interface Round {
    id:number,
    distance:number,
    horses: Horse[]
}