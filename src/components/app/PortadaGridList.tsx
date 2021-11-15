import { Pagination, Spin, Typography } from "antd"
import PortadaAnime from "./PortadaAnime"
import { Link } from 'react-router-dom'

const { Title } = Typography

const PortadaGridList = ({ portadas, title, onChangePage, isLoading }) => {

    return (
        <>
            <Typography className="mx-3">
                <Title>{title}</Title>
            </Typography>
            {isLoading ?
                <Spin></Spin> :
                <div className="px-5 my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 space-x-4 space-y-2">
                    {
                        portadas && portadas.map(anime => (
                            <Link to={`/animes/${anime.mal_id}`}>
                                <PortadaAnime anime={anime} />
                            </Link>
                        ))
                    }
                </div>
            }
            <Pagination
                pageSize={50}
                total={5000}
                onChange={onChangePage}
                showSizeChanger={false}
            ></Pagination>
        </>
    )
}

export default PortadaGridList