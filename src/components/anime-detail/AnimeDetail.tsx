import { Button, Card, Divider, Form, Input, List, Typography } from 'antd/es'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { fetchAnime, fetchAnimePictures, ResultAnime } from '../../app/services/anime.service'
import { Picture } from '../../classes/picture'
import { addFavorite, getComentariosByAnimeId, saveComentario } from '../../app/services/db.service'
import ComentarioCard from './ComentarioCard'
import { UserContext } from '../../context/UserContext'
import { Comentario } from '../../classes/comentario'
import moment from 'moment'
import { HeartFilled, HeartOutlined, PlusCircleFilled, PlusOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

const { Title } = Typography

const AnimeDetail = () => {

    const { user, lists } = useContext(UserContext)
    const { id } = useParams()
    const [anime, setAnime] = useState<ResultAnime>()
    const [pictures, setPictures] = useState<Picture[]>()
    // const [news, setNews] = useState<any>()
    const [comentarios, setComentarios] = useState<Comentario[]>([])
    const [isInFavorites, setInFavorites] = useState(false)
    const [isInList, setInList] = useState(false)

    useEffect(() => {
        fetch(id)
    }, [id])

    useEffect(() => {
        console.log(lists)
        if (lists) {
            setInFavorites(lists.favorites.findIndex(a => a.animeId === +id) !== -1)
            setInList(lists.list.findIndex(a => a.animeId === +id) !== -1)
        }
    }, [lists])

    const fetchComentarios = async (id) => {
        const comentarios = await getComentariosByAnimeId(id)
        setComentarios(comentarios)
    }

    const fetch = async (id: number) => {
        const response = await fetchAnime(id);
        setAnime(response.data)
        fetchAnimePictures(id).then(({ data }) => {
            setPictures(data.pictures)
            console.log(data)
        })
        fetchComentarios(id)
        // fetchAnimeNews(id).then(({ data }) => {
        // setNews(data)
        // console.log(data)
        // });
    }

    const addToMyFavorites = () => {
        if (user?.userId) {
            addFavorite(user.userId, anime)
                .then()
        }
    }

    const onAgregarComentario = ({ message }) => {
        saveComentario({
            message,
            user,
            animeId: +id,
            date: new Date()
        })
            .then(() => fetchComentarios(id))
    }

    return (
        <div className="grid grid-rows-6 grid-flow-col gap-4">
            <div className="row-span-6 max-w-xs">
                <img className="mx-auto shadow-md w-full" src={anime?.image_url} alt={`Portada de ${anime?.title}`}></img>
                {user?.userId && <div className="my-3">
                    {
                        isInFavorites ?
                            <Tooltip title="Remover de favoritos">
                                <Button icon={<HeartFilled className="text-red-500" />} shape="circle" />
                            </Tooltip>
                            :
                            <Tooltip title="Agregar a favoritos">
                                <Button icon={<HeartOutlined className="text-red-500" />} shape="circle" onClick={addToMyFavorites} />
                            </Tooltip>
                    }
                    {
                        isInList ?
                            <Tooltip title="Remover de mi lista">
                                <Button icon={<PlusCircleFilled className="bg-red-500" />} shape="circle" />
                            </Tooltip>
                            :
                            <Tooltip title="Agregar a mi lista">
                                <Button icon={<PlusOutlined className="text-red-500" />} shape="circle" onClick={addToMyFavorites} />
                            </Tooltip>
                    }
                </div>}
                <Divider orientation="left">Informacion</Divider>
                <p><b>Tipo:</b> {anime?.type}</p>
                <p><b>Episodios:</b> {anime?.episodes}</p>
                <p><b>Estado:</b> {anime?.status}</p>
                <p><b>Estreno:</b> {anime?.premiered}</p>
                <p><b>Productores:</b> {anime?.producers.map(p => p.name)}</p>
                <p><b>Estudios:</b> {anime?.type}</p>
                <p><b>Fuente:</b> {anime?.source}</p>
                <p><b>Genero:</b> {anime?.genres.map(g => g.name)}</p>
                <p><b>Duracion:</b> {anime?.duration}</p>
                <p><b>Rating:</b> {anime?.rating}</p>
            </div>
            <div className="col-span-10 row-span-2 max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-6xl">
                <Typography>
                    <Title>{anime?.title}</Title>
                    <div className="flex flex-row space-x-4 my-4">
                        <div className="box-content w-16 h-16 relative">
                            <h4 className="absolute px-2 py-1">Score</h4>
                            <h3 className="absolute px-2">{anime?.score}</h3>
                        </div>
                        <div className="box-content w-16 h-16 relative">
                            <h4 className="absolute px-2 py-1">Rank</h4>
                            <h3 className="absolute px-2">#{anime?.rank}</h3>
                        </div>
                    </div>
                    <Divider type="horizontal" orientation="left">Synopsis</Divider>
                    <Typography.Paragraph className="px-4">{anime?.synopsis}</Typography.Paragraph>
                </Typography>
                <Divider type="horizontal" orientation="left">Imagenes</Divider>
                <div className="grid grid-flow-col overflow-x-auto space-x-3 w-full">
                    {pictures?.map(p => (
                        <div className="w-60">
                            <img src={p.small} alt="Imagen del anime" />
                        </div>
                    ))}

                </div>
                <Divider type="horizontal" orientation="left">Comentarios</Divider>
                <div>
                    {user?.userId && <Form onFinish={onAgregarComentario}>
                        <Card>
                            <Form.Item
                                name="message">
                                <Input.TextArea placeholder="Escribe un comentario..." />
                            </Form.Item>
                            <Button htmlType="submit" type="primary" className="mt-2">Agregar comentario</Button>
                        </Card>
                    </Form>}
                    <List
                        header={`${comentarios?.length} comentarios`}
                        itemLayout="horizontal"
                        dataSource={comentarios}
                        renderItem={comentario => (
                            <li>
                                <ComentarioCard comentario={comentario} />
                            </li>
                        )}
                    />
                    {/* {comentarios && comentarios?.length > 0 && comentarios?.map(comentario => ( */}
                    {/* <ComentarioCard comentario={comentario} /> */}
                    {/* ))} */}
                    {/* {(!comentarios || comentarios?.length === 0) && <p>No hay comentarios.</p>} */}
                </div>
            </div>
        </div>
    )
}

export default AnimeDetail