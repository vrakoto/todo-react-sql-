import Api from "../components/Api"
import { useState } from "react"
import Input from "../components/Input"
import {NavLink} from "react-router-dom"

function Todo() {
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [errorFormField, setErrorFormField] = useState({})
    const [formVerification, setFormVerification] = useState({ identifiant: '', mdp: '', mdp_c: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormVerification({ ...formVerification, [name]: value })
    }

    const handleVerification = async (e) => {
        e.preventDefault()
        let errors = {}

        if (formVerification.identifiant.length < 3) {
            errors["identifiant"] = "L'identifiant est trop court"
        }

        if (formVerification.mdp.length < 3) {
            errors["mdp"] = 'Le mot de passe est trop court'
        }

        if (formVerification.mdp_c !== formVerification.mdp) {
            errors["mdp_c"] = 'Les mots de passes ne correspondent pas'
        }

        if (Object.keys(errors).length === 0) {
            Api.post('/visitor/inscription', formVerification).then((msg) => {
                if (msg.status === 200) {
                    setSuccess("Compte créé !")
                }
            }).catch((error) => {
                setError(error.request.response)
            })
        } else {
            setErrorFormField(errors)
        }
    }

    return (
        <div className="container mt-5">

            {success ? (
                <div className="alert alert-success">
                    {success}
                </div>
            ) : error ? (
                <div className="alert alert-danger">
                    {error}
                </div>
            ) : ''}

            <h1 className="titlePage">Créer un compte</h1>
            <form className="customForm form-group" method="post" onSubmit={handleVerification}>
                <Input type="text" variable="identifiant" error={errorFormField.identifiant} placeholder="Insérez un identifiant" func={handleChange} />
                <Input type="password" variable="mdp" error={errorFormField.mdp} placeholder="Insérez un mot de passe" func={handleChange} />
                <Input type="password" variable="mdp_c" error={errorFormField.mdp_c} placeholder="Confirmez le mot de passe" func={handleChange} />
                {success ? <NavLink to="/" className="btn btn-primary">Se connecter</NavLink> : <button type="submit" className="btn btn-success">Valider</button>}
            </form>
        </div>
    )
}

export default Todo