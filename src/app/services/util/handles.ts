import {message} from 'antd'

export const handleError = (error: Error) => {
    console.error(error)
    message.error(error.message)
}