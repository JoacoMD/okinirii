import { firestore } from 'firebase'
import { Comentario } from '../../classes/comentario'
import { db } from '../../firebase/FirebaseConfig'
import { ResultAnime } from './anime.service'
import { handleError } from './util/handles'

const getCollection = collection => db.collection(collection)
const save = collection => object => getCollection(collection).doc().set(object)
const update = collection => (object, id) => getCollection(collection).doc(id).update(object)

const userListsCollection = getCollection('userLists')
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

const getUserLists = async userId => {
    const result = await userListsCollection.where('userId', '==', userId).limit(1).get()
    return result.empty ? null : result.docs[0]
}

export const getUserListsObs = (userId, callback) => userListsCollection.where('userId', '==', userId).onSnapshot(callback)

export const addFavorite = async (userId: string, anime: any) => {
    const userList = await getUserLists(userId)
    if (userList) {
        const data = userList.data()
        updateUserLists({ favorites: [...data.favorites, reduceAnime(anime)] }, userList.id)
            .catch(handleError)
    } else {
        saveUserLists({
            userId,
            favorites: [reduceAnime(anime)],
            list: []
        })
            .catch(handleError)
    }
}

export const addAnimeToList = async (userId: string, anime: any) => {
    const userList = await getUserLists(userId)
    if (userList) {
        const data = userList.data()
        updateUserLists({ list: [...data.list, reduceAnime(anime)] }, userList.id)
            .catch(handleError)
    } else {
        saveUserLists({
            userId,
            favorites: [],
            list: [reduceAnime(anime)]
        })
            .catch(handleError)
    }
}

const removeAnimeFrom = listType => async (userId, animeId) => {
    const userList = await getUserLists(userId)
    debugger
    if (userList) {
        const data = userList.data()
        listType === 'list' ?
            updateUserLists({ list: data.list.filter(a => a.animeId !== animeId) }, userList.id).catch(handleError) :
            updateUserLists({ favorites: data.favorites.filter(a => a.animeId !== animeId) }, userList.id).catch(handleError)
    }
}

export const removeAnimeFromList = removeAnimeFrom('list')
export const removeAnimeFromFavorites = removeAnimeFrom('favorites')

const reduceAnime = (anime: ResultAnime) => {
    return {
        animeId: anime.mal_id,
        title: anime.title,
        image: anime.image_url
    }
}


