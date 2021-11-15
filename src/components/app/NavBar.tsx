import { Button } from 'antd'
import { useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { loginWithGoogleAuth } from '../../app/services/auth.service'
import { getUserListsObs } from '../../app/services/db.service'
import { UserContext } from '../../context/UserContext'
import logo from '../../okinirii.png'
import UserInfoNav from '../UserInfoNav'

const NavBar = () => {

    const { user, setUser, setLists } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if (user?.userId) {
            getUserListsObs(user?.userId, (lists) => {
                !lists.empty && setLists(lists.docs[0].data())
            })
        }
    }, [user])

    const onLogin = () => {
        loginWithGoogleAuth(({ user }) => {
            const userData = {
                userId: user?.uid,
                name: user?.displayName,
                email: user?.email,
                picture: user?.photoURL
            }
            setUser(userData)
        })
    }

    const onLogout = () => {
        setUser({})
        history.push('/')
    }

    return (
        <div className="bg-white shadow-sm border-b sticky top-0 z-50 h-16 px-3">
            <div className="flex justify-between container mx-auto h-full">
                <div className="flex items-center justify-start w-32">
                    <Link to="/">
                        <img className="object-contain" src={logo} alt="Logo de Okiniiri" />
                    </Link>
                </div>
                <div className="flex items-center justify-end">
                    {!user?.userId && <Button onClick={onLogin}>Iniciar sesión</Button>}
                    {user?.userId && <UserInfoNav user={user} logout={onLogout} />}
                </div>
            </div>
        </div>
    )
}

export default NavBar