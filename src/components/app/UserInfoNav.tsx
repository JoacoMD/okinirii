import { Avatar, Menu } from "antd"
import SubMenu from "antd/lib/menu/SubMenu"
import { Link } from 'react-router-dom'

const UserInfoNav = ({ user, logout }) => {
    return (
        <div className="flex">
            <p className="my-auto">{user?.name}</p>
            <Menu mode="horizontal" style={{border: 'none'}} selectable={false}>
                <SubMenu key="userInfo" title={<Avatar src={user?.picture}></Avatar>}>
                    <Menu.Item key="userInfo.profile">
                        <Link to="/user">Ir a mi perfil</Link>
                    </Menu.Item>
                    <Menu.Item key="userInfo.logout" onClick={logout}>
                        Cerrar sesión
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}

export default UserInfoNav