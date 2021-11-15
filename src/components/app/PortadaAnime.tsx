import { Card, Tooltip } from "antd"
import { HeartFilled, EllipsisOutlined } from '@ant-design/icons'
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { addFavorite, removeFavorite } from "../../app/animeSlice"
import { useDispatch } from "react-redux"

const { Meta } = Card

const PortadaAnime = ({ anime, isFavorite }) => {

    const { user } = useContext(UserContext)
    const dispatch = useDispatch()

    const addOrRemoveFromFavorites = (e) => {
        e.preventDefault()
        user?.userId && dispatch(
            isFavorite ?
                removeFavorite(anime.mal_id)
                : addFavorite({ animeId: anime.mal_id, title: anime.title, image: anime.image_url }))
    }

    return (
        <Card
            hoverable
            key={anime.mal_id}
            cover={<img className="h-80 object-cover" src={anime.image_url} alt={`Portada de ${anime.title}`} />}
            className="shadow-xl hover:bg-gray-200"
            actions={[
                <Tooltip title={isFavorite ? "Remover de favoritos" : "Agregar a favoritos"}>
                    <HeartFilled style={isFavorite ? {color: 'red'} : {}} className="text-red-500" onClick={addOrRemoveFromFavorites} key="fav" />
                </Tooltip>,
                <Tooltip title="Ver informacion">
                    <EllipsisOutlined key="more" />,
                </Tooltip>
            ]}
        >
            <Meta title={anime.title} />
        </Card>
    )
}

export default PortadaAnime