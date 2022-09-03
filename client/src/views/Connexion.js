import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Connexion() {
    const navigate = useNavigate();
    const initialFormState = { identifiant: '', mdp: '' }
    const [user, setUser] = useState(initialFormState)
    const [message, setMessage] = useState({})

    const connexion = async (e) => {
        e.preventDefault();
        axios.post('/connexion', user).then((msg) => {
            console.log(msg);
        }).catch((e) => {
            console.log(e);
            setMessage({ error: "Probleme connexion" });
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    return (
        <div className='center'>
            <div className='main'>
                <button type="button" onClick={() => navigate('/')}>Retour</button>
                {message.error ? message.error : ''}

                <form method='POST' onSubmit={connexion}>
                    <h1 className="titleCard">Mes Todos</h1>

                    <input type="text" name="identifiant" onChange={handleChange} placeholder="Identifiant" />
                    <input type="password" name="mdp" onChange={handleChange} placeholder="Mot de passe" />
                    <button type="submit" onClick={() => navigate('/todo')}>Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default Connexion;