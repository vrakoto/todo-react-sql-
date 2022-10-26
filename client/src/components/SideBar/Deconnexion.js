import '../../css/sidebar.css'
import { useNavigate } from 'react-router-dom'
import Api from '../Api';
import { useContext } from 'react';
import Connected from '../context/Connected';
import Item from './Item';

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Deconnexion({setError}) {
    const navigate = useNavigate();
    const { setIsConnected } = useContext(Connected);

    const deconnexion = async () => {
        Api.post('/user/logout').then((msg) => {
            if (msg.data) {
                setIsConnected(false)
                return navigate('/')
            }
        }).catch((error) => {
            setError("Erreur interne rencontrée lors de la tentative de déconnexion")
        })
    };

    return <Item titre="Déconnexion" onClick={deconnexion} icon={faRightFromBracket} />
}

export default Deconnexion