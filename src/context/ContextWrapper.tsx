import { useState } from 'react'
import { UserContext } from "./UserContext"

const initialLists = {
    favorites: [],
    list: []
}

const ContextWrapper = ({children}) => {
    const [user, setUser] = useState({})
    const [lists, setLists]= useState(initialLists)

    return (
        <>
            <UserContext.Provider value={{user, lists, setUser, setLists}}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default ContextWrapper