import { Button, Card, Divider, Form, Input, List, Typography } from 'antd/es'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { fetchAnime, fetchAnimePictures, ResultAnime } from '../../app/services/anime.service'
import { Picture } from '../../classes/picture'
import { getComentariosByAnimeId, saveComentario } from '../../app/services/db.service'
import { addFavorite, removeFavorite} from '../../app/animeSlice'
import ComentarioCard from './ComentarioCard'
import { UserContext } from '../../context/UserContext'
import { Comentario } from '../../classes/comentario'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Space, Tooltip } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { selectAnimes } from '../../app/animeSlice'

const { Title } = Typography

const AnimeDetail = () => {

    const { user } = useContext(UserContext)
    const { favorites } = useSelector(selectAnimes)
    const { id } = useParams()
    const [anime, setAnime] = useState<ResultAnime>()
    const [pictures, setPictures] = useState<Picture[]>()
    const [comentarios, setComentarios] = useState<Comentario[]>([])
    const [isInFavorites, setInFavorites] = useState(false)
    const [formComentario] = useForm()
    const [isEnviandoComentario, setEnviandoComentario] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(id)
         // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        setInFavorites(favorites.findIndex(a => a.animeId === +id) !== -1)
    }, [favorites, id])

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
    }

    const addToMyFavorites = () => anime && user?.userId && dispatch(addFavorite({animeId: anime?.mal_id, image: anime?.image_url, title: anime?.title}))

    const removeFromFavorites = () => user?.userId && dispatch(removeFavorite(+id))

    const onAgregarComentario = ({ message }) => {
        formComentario.validateFields().then(() => {
            setEnviandoComentario(true)
            saveComentario({
                message,
                user,
                animeId: +id,
                date: new Date()
            })
                .then(() => {
                    fetchComentarios(id)
                    formComentario.resetFields()
                })
                .finally(() => setEnviandoComentario(false))
        })
    }

    return (
        <div className="grid grid-rows-6 grid-flow-col gap-4">
            <div className="row-span-6 max-w-xs">
                <img className="mx-auto shadow-md w-full" src={anime?.image_url} alt={`Portada de ${anime?.title}`}></img>
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
                        {user?.userId && <div className="my-3">
                            <Space>
                                {
                                    isInFavorites ?
                                        <Tooltip title="Remover de favoritos">
                                            <Button
                                                danger
                                                type="primary"
                                                shape="circle"
                                                icon={<HeartFilled />}
                                                onClick={removeFromFavorites} />
                                        </Tooltip>
                                        :
                                        <Tooltip title="Agregar a favoritos">
                                            <Button
                                                danger
                                                icon={<HeartOutlined />}
                                                shape="circle"
                                                onClick={addToMyFavorites} />
                                        </Tooltip>
                                }
                            </Space>
                        </div>}   </div>
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
                    {user?.userId &&
                        <Form
                            onFinish={onAgregarComentario}
                            form={formComentario}
                        >
                            <Card>
                                <Form.Item
                                    name="message"
                                    rules={[
                                        { required: true, message: 'Debe escribir el comentario antes de enviarlo.' },
                                        { min: 5, message: 'El comentario debe tener al menos 5 caracteres' }
                                    ]}
                                >
                                    <Input.TextArea minLength={3} placeholder="Escribe un comentario..." />
                                </Form.Item>
                                <Button
                                    disabled={isEnviandoComentario}
                                    htmlType="submit"
                                    type="primary"
                                    className="mt-2">
                                    Agregar comentario
                                </Button>
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
                </div>
            </div>
        </div>
    )
}

export default AnimeDetail