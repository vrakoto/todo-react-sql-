import Api from "../components/Api"
import { useState, useContext } from "react"

import Connected from "../components/context/Connected";
import Input from "../components/Input";
import Success from "../components/context/Success";
import RefreshData from "../components/context/RefreshData";

function Connexion() {
    const { setRefresh } = useContext(RefreshData)
    const { setSuccess } = useContext(Success)
    const { setIsConnected } = useContext(Connected);
    const [formVerification, setFormVerification] = useState({ identifiant: '', mdp: '' })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormVerification({ ...formVerification, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formVerification.identifiant.trim() !== '' && formVerification.mdp.trim() !== '') {
            Api.post('/visitor/connexion', formVerification).then((msg) => {
                const { success, error } = msg.data
                if (success) {
                    setIsConnected(success)
                    setRefresh(prev => prev + 1)
                    setSuccess(`Bienvenue ${success} !`)
                } else if (error) {
                    setError(error)
                }
            }).catch((error) => {
                if (error) setError(error.request.response)
            })
        } else {
            setError("Veuillez remplir tous les champs.")
        }
    }

    return (
        <div className="container mt-5">

            <h1 className="titlePage">{error ? "Erreur formulaire" : "Connectez-vous temporairement"}</h1>

            <form className="customForm form-group" method="post" onSubmit={handleSubmit} >
                <Input type="text" variable="identifiant" error={error.identifiant} placeholder="Insérez votre identifiant" func={handleChange} isFirst={true} />
                <Input type="password" variable="mdp" error={error.mdp} placeholder="Insérez votre mot de passe" func={handleChange} />
                <button type="submit" className="btn btn-success mt-2">Se connecter</button>
            </form>

        </div>
    )
}

export default Connexion