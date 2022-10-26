import '../../css/sidebar.css'
import { useNavigate } from 'react-router-dom'
import Api from '../Api';
import { useContext } from 'react';
import Connected from '../context/Connected';
import Item from './Item';
import RefreshData from '../context/RefreshData'
import Todos from '../context/Todos';

import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Reset({setError}) {
    const updatingData = useContext(RefreshData)
    const lesTodos = useContext(Todos)

    const reset = async () => {
        if (lesTodos.length > 0) { // evite le spam inutile par l'utilisateur
            Api.post('/user/resetTodos').then((msg) => {
                if (msg.data) {
                    updatingData(prevState => prevState + 1)
                }
            }).catch((error) => {
                setError("Erreur interne rencontrée lors de la tentative de réinitialisation des TODOS")
            })
        }
    };

    return <Item titre="Réinitialiser TODOS" onClick={reset} icon={faTrash} />
}

export default Reset