import { firestore } from "firebase";

export interface Comentario {
    id: string
    message: string
    date: firestore.Timestamp
    animeId: number
    user: any 
}