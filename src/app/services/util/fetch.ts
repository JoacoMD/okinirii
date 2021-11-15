import axios, { AxiosRequestConfig } from "axios";


interface CustomRequestConfig extends AxiosRequestConfig {
    onSuccess: Function | undefined,
    onError: Function | undefined,
    onFinally: Function | undefined
}
export const doAxios = (config: CustomRequestConfig) => axios.request({
    url: config.url,
    params: config.params,
    data: config.data
})
    .then(response => config.onSuccess && config.onSuccess(response))
    .catch(error => {
        console.error(error)
        config.onError && config.onError(error)
    })
    .finally(() => config.onFinally && config.onFinally())