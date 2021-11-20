import firebase from 'firebase'
import { useEffect, useState } from 'react'
import { UserContext } from "./UserContext"

const ContextWrapper = ({children}) => {
    const [user, setUser] = useState({})
    
    useEffect(() =>{
      firebase.auth().onAuthStateChanged(user => {
          setUser({
              userId: user?.uid,
              email: user?.email,
              picture: user?.photoURL,
              name: user?.displayName
          })
      }) 
    }, [])
    
    return (
        <>
            <UserContext.Provider value={{user, setUser}}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default ContextWrapper