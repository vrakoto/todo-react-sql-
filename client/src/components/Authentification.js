import '../css/home.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

function Authentification() {
    const initialFormState = { identifiant: '', mdp: '' }
    const [user, setUser] = useState(initialFormState)
    const [message, setMessage] = useState({})

    const inscription = (e) => {
        e.preventDefault()
        addUser(user)
    }
    const addUser = async (u) => {
        axios.post('/inscription', u).then((msg) => {
            if (msg.data.error) {
                setMessage({ error: msg.data.error })
            } else if (msg.data.success) {
                setMessage({ success: "Compte enregistré !" });
            }
        }).catch(() => {
            setMessage({ error: "Probleme inscription" });
        })
    }


    async function connexion(e) {
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <form className='signup' method='POST' onSubmit={inscription}>
                <label htmlFor="chk" aria-hidden="true">Inscription</label>

                <input type="text" name="identifiant" onChange={handleChange} placeholder="Insérer un identifiant" autoFocus />

                <input type="password" name="mdp" onChange={handleChange} placeholder="Insérer un mot de passe" />

                <input type="password" name="mdp_c" onChange={handleChange} placeholder="Confirmer le mot de passe" />
                <button type="submit">S'inscrire</button>
            </form>

            <div className='login'>
                <label htmlFor="chk" aria-hidden="true">Connexion</label>
                <input type="text" name="identifiant" placeholder="Email" />
                <input type="password" name="mdp" placeholder="Password" />
                <button type="button" onClick={() => connexion()}>Se connecter</button>
            </div>
        </div>
    );
}

export default Authentification;