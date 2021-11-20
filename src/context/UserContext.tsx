import { createContext } from 'react' 
import { User } from '../classes/user'

interface IUserContext {
    user?: User, 
    setUser?: any
}

export const UserContext = createContext<IUserContext>({})