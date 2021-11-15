import { Comment } from "antd"
import moment from "moment"

const ComentarioCard = ({ comentario }) => {
    return (
        <div className="my-2">
            <Comment
                key={comentario.id}
                avatar={comentario.user.picture}
                author={comentario.user.name}
                datetime={moment(comentario.date.toMillis()).format('DD/MM/yyyy HH:mm')}
                content={<p>{comentario.message}</p>}
            />
        </div>
    )
}

export default ComentarioCard