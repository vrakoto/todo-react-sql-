import { useContext } from 'react';
import Api from '../Api';
import Item from './Item';
import Refresh from '../context/RefreshData'
import Success from "../context/Success"

import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Reset({setError}) {
    const { setSuccess } = useContext(Success)
    const { setRefresh } = useContext(Refresh)

    const reset = async () => {
        Api.post('/user/resetTodos').then((msg) => {
            if (msg.status === 200) {
                setRefresh(prev => prev + 1) 
                setSuccess('Vos TODOS ont bien été supprimé !')
            }
        }).catch((error) => {
            setError(error.request.response)
        })
    };

    return <Item titre="Réinitialiser TODOS" onClick={reset} icon={faTrash} />
}

export default Reset