import { Avatar, Menu } from "antd"
import SubMenu from "antd/lib/menu/SubMenu"
import { Link } from 'react-router-dom'

const UserInfoNav = ({ user, logout }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <SubMenu key="userInfo" title={<Avatar src={user?.picture}></Avatar>}>
                    <Menu.Item key="userInfo.profile">
                        <Link to="user">Ir a mi perfil</Link>
                    </Menu.Item>
                    <Menu.Item key="userInfo.logout" onClick={logout}>
                        Cerrar sesi&oacute;n
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}

export default UserInfoNav