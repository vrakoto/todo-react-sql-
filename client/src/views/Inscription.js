import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Connexion() {
    const navigate = useNavigate();
    const initialFormState = { identifiant: '', mdp: '', mdp_c: '' }
    const [user, setUser] = useState(initialFormState)
    const [message, setMessage] = useState({})

    const inscription = (e) => {
        e.preventDefault()
        if (user.identifiant !== '' && user.mdp !== '' && user.mdp_c !== '' && (user.mdp === user.mdp_c)) {
            addUser(user)
        } else {
            setMessage({ error: "Formulaire invalide" })
        }
    }
    const addUser = async (u) => {
        axios.post('/inscription', u).then((msg) => {
            if (msg.data.error) {
                setMessage({ error: msg.data.error })
            } else if (msg.data.success) {
                setMessage({ success: "Compte enregistré ! Connectez-vous." });
            }
        }).catch(() => {
            setMessage({ error: "Probleme inscription" });
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

                <form className='signup' method='POST' onSubmit={inscription}>
                    
                    <h1 className="titleCard">Inscription</h1>

                    {message.error ? message.error
                        : message.success ? message.success
                            : ""}

                    <input type="text" name="identifiant" onChange={handleChange} placeholder="Insérer un identifiant" autoFocus />

                    <input type="password" name="mdp" onChange={handleChange} placeholder="Insérer un mot de passe" />

                    <input type="password" name="mdp_c" onChange={handleChange} placeholder="Confirmer le mot de passe" />
                    <button type="submit">S'inscrire</button>
                    {message.success ? (
                        <button type="submit" onClick={() => navigate('/connexion')}>Se connecter</button>
                    ) : ''}
                </form>
            </div>
        </div>
    );
}

export default Connexion;