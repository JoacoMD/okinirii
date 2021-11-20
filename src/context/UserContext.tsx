import { createContext } from 'react' 
import { User } from '../interfaces/user'

interface IUserContext {
    user?: User, 
    setUser?: any
}

export const UserContext = createContext<IUserContext>({})