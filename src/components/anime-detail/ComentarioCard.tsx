import { Comment, Avatar, Card } from "antd"
import moment from "moment"

const ComentarioCard = ({ comentario }) => {
    return (
        <div className="my-2">
            {/* <Card
                key={comentario.id}
            >
                <p>{comentario.message}</p>
                <Card.Meta
                    avatar={<Avatar src={comentario.user.picture} />}
                    description={`${comentario.user.name} - ${moment(comentario.date.toMillis()).format('DD/MM/yyyy HH:mm')}`}
                />
            </Card> */}
<Comment 
                                    author={comentario.user.name}
                                    datetime={moment(comentario.date.toMillis()).format('DD/MM/yyyy HH:mm')}
                                    content={<p>{comentario.message}</p>}
                                />
        </div>
    )
}

export default ComentarioCard