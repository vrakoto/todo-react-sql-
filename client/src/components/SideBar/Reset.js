import './sidebar.css'
import Api from '../Api';
import { useContext } from 'react';
import Item from './Item';
import Refresh from '../context/RefreshData'

import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Reset({setError}) {
    const { setRefresh } = useContext(Refresh)

    const reset = async () => {
        Api.post('/user/resetTodos').then((msg) => {
            if (msg.status === 200) setRefresh(prev => prev + 1)
        }).catch((error) => {
            setError(error.request.response)
        })
    };

    return <Item titre="Réinitialiser TODOS" onClick={reset} icon={faTrash} />
}

export default Reset