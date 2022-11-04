import './sidebar.css'

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Api from '../Api';
import Connected from '../context/Connected';
import Item from './Item';

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
function Deconnexion({setError}) {
    const navigate = useNavigate();
    const { setIsConnected } = useContext(Connected);

    const deconnexion = async () => {
        Api.post('/user/logout').then((msg) => {
            if (msg.data) {
                setIsConnected('')
                return navigate('/')
            }
        }).catch((error) => {
            console.log(error);
            setError("Erreur interne rencontrée lors de la tentative de déconnexion")
        })
    };

    return <Item titre="Déconnexion" onClick={deconnexion} icon={faRightFromBracket} />
}

export default Deconnexion