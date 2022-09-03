import { useNavigate } from 'react-router-dom';

function Authentification() {
    const navigate = useNavigate();
    return (
        <div className='center'>
            <div className="main">
                <h1 className="titleCard">Authentification</h1>

                <button type="button" onClick={() => navigate('inscription')}>S'inscrire</button>
                <button type="button" onClick={() => navigate('connexion')}>Se connecter</button>
            </div>
        </div>
    );
}

export default Authentification;