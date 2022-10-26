import Api from "../components/Api"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Connected from "../components/context/Connected";
import Input from "../components/Input";

function Connexion() {
    const navigate = useNavigate()
    const { setIsConnected } = useContext(Connected);
    const [formVerification, setFormVerification] = useState({ identifiant: '', mdp: '' })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormVerification({ ...formVerification, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formVerification.identifiant.trim() !== '' && formVerification.mdp.trim() !== '') {
            Api.post('/connexion', formVerification).then((msg) => {
                const { success, error } = msg.data
                if (success) {
                    setIsConnected(true)
                    // return navigate('/createTodo')
                } else if (error) {
                    setError(error)    
                }
            }).catch((error) => {
                if (error) setError('Erreur interne')
            })
        } else {
            setError("Veuillez remplir tous les champs.")
        }
    }

    return (
        <div className="container mt-5">

            {error ? <div className="alert alert-danger">{error}</div> : ''}

            <h1 className="titlePage">Connectez-vous temporairement</h1>

            <form className="customForm form-group" method="post" onSubmit={handleSubmit} >
                <Input type="text" variable="identifiant" error={error.identifiant} placeholder="Insérez votre identifiant" func={handleChange} isFirst={true} />
                <Input type="password" variable="mdp" error={error.mdp} placeholder="Insérez votre mot de passe" func={handleChange} />
                <button type="submit" className="btn btn-success mt-2">Se connecter</button>
            </form>

        </div>
    )
}

export default Connexion