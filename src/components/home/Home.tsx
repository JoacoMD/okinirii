import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAnimes, selectAnimes } from '../../app/animeSlice';
import { useAppDispatch } from '../../app/hooks';
import PortadaGridList from '../app/PortadaGridList';

const Home = () => {

    const [animes, setAnimes] = useState<any>(undefined)
    const [page, setPage] = useState(1)
    const state = useSelector(selectAnimes)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAnimes(page))
        // eslint-disable-next-line
    }, [page])

    useEffect(() => {
        setAnimes(state.pages.find(p => p.pageNumber === page)?.content)
    }, [state, page])

    const onChangePage = (page) => {
        setPage(page)
    }

    return (
        <>
            <div className="flex items-center">
                <div className="flex w-96 mx-auto">
                    <Input
                        placeholder="Busca un anime"
                    />
                    <Button
                        type="primary"
                        className="mx-2">
                        Buscar
                    </Button>
                </div>
            </div>
            <PortadaGridList
                portadas={animes}
                title="Top Animes"
                onChangePage={onChangePage}
                isLoading={state.loading}
            ></PortadaGridList>
        </>
    )
}

export default Home