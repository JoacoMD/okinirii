import { Card } from "antd"
import { HeartFilled, EllipsisOutlined } from '@ant-design/icons';

const { Meta } = Card

const PortadaAnime = ({anime}) => {
    return (
        <Card
            hoverable
            key={anime.mal_id}
            cover={<img className="h-80 object-cover" src={anime.image_url} alt={`Portada de ${anime.title}`}/>}
            className="shadow-xl hover:bg-gray-200"
            actions={[
                <HeartFilled key="fav"/>,
                <EllipsisOutlined key="more" />,
            ]}
            >
            <Meta title={anime.title}/>
        </Card>
    )
}

export default PortadaAnime