import { HeartFilled } from "@ant-design/icons"
import { Card, Col, Row } from "antd"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { selectAnimes } from "../../app/store/animeSlice"
import { UserContext } from "../../context/UserContext"

const UserPage = () => {

    const { user } = useContext(UserContext)
    const { favorites } = useSelector(selectAnimes)
    return (
        <>
            <div className="container">
                <Row>
                    <Col span={5}>
                        <div className="bg-gray-700 rounded p-5">
                            <img src={'https://yt3.ggpht.com/yti/APfAmoFY74G8nBu5oJSDbD-8VWUH23fSRs7l26vD69og7A=s88-c-k-c0x00ffffff-no-rj-mo'} className="border-2 border-white border-solid rounded-full mx-auto" />
                            <h2 className="text-white font-bold text-center">{user?.name}</h2>
                            <h2 className="text-gray-200 text-center">{user?.email}</h2>
                        </div>
                    </Col>
                    <Col span={18} offset={1}>
                        <h1 className="text-2xl">Mis favoritos <HeartFilled /></h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 space-x-4 ">
                            {favorites.map(f => (
                                <Card
                                    cover={<img className="h-80 object-cover" src={f.image} alt={`Portada de ${f.title}`} />}
                                >
                                    <Card.Meta
                                        title={f.title}
                                    ></Card.Meta>
                                </Card>
                            ))}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default UserPage