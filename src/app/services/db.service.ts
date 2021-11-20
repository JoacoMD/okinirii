import { Comentario } from '../../interfaces/comentario'
import { db } from '../../firebase/FirebaseConfig'

const getCollection = collection => db.collection(collection)
const save = collection => object => getCollection(collection).doc().set(object)
const update = collection => (object, id) => getCollection(collection).doc(id).update(object)

const comentariosCollection = getCollection('comentarios')
// const reviewsCollection = getCollection('reviews')

export const updateUserLists = update('userLists')
export const saveUserLists = save('userLists')
export const saveComentario = save('comentarios')
export const saveReview = save('reviews')

export const getComentariosByAnimeId = async (id: number): Promise<Comentario[]> => {
    const response = await comentariosCollection.where('animeId', '==', +id).orderBy('date', 'desc').get()
    return response.docs.map(doc => {
        const data = doc.data()
        return {
            animeId: data.animeId,
            user: data.user,
            date: data.date,
            message: data.message,
            id: doc.id
        }
    })
}