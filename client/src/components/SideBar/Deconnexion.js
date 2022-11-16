import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Api from '../Api';
import Connected from '../context/Connected';
import RefreshData from '../context/RefreshData';
import Success from '../context/Success';

import Item from './Item';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Deconnexion({setError}) {
    const navigate = useNavigate();
    const { setIsConnected } = useContext(Connected);
    const { setRefresh } = useContext(RefreshData)
    const { setSuccess } = useContext(Success)

    const deconnexion = async () => {
        Api.post('/user/logout').then((msg) => {
            if (msg.data) {
                setIsConnected('')
                setRefresh(prev => prev + 1)
                setSuccess('Merci et à bientôt !')
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