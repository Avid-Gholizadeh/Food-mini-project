import {useRouteError} from 'react-router-dom'
import Header from '../components/Header'
import NotFound from '../components/NotFound'
import {Error} from '../components/Error'

export default function ErrorBlock() {
    const error = useRouteError()

    let content
    if (error.status === 404) {
        content = <NotFound />
    } else {
        content = <Error />
    }

    return (
        <>
            <Header />
            {content}
        </>
    )
}
