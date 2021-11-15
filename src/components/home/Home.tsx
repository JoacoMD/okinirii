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
        if (state.pages.findIndex(p => p.pageNumber === page) !== -1) {
            setAnimes(state.pages.find(p => p.pageNumber === page)?.content)
        } else {
            dispatch(fetchAnimes(page))
        }
        // eslint-disable-next-line
    }, [state, page])

    const onChangePage = (page) => {
        setPage(page)
    }

    return (
        <>
            <div className="flex items-center">
            </div>
            <PortadaGridList
                portadas={animes}
                title="Top Animes"
                onChangePage={onChangePage}
                isLoading={state.loading}
                favorites={state.favorites}
            ></PortadaGridList>
        </>
    )
}

export default Home