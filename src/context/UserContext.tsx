import { createContext } from 'react' 

interface IUserContext {
    user?: {
        userId?: string
        name?: string
        email?: string
        picture?: string
    },
    lists?: {
        favorites: any[]
        list: any[]
    }
    setUser?: any,
    setLists?:any
}

export const UserContext = createContext<IUserContext>({})