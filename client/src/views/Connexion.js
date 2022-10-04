import Api from "../components/Api"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Connected from "../components/context/Connected";

function Connexion() {
    const navigate = useNavigate()
    const { setIsConnected } = useContext(Connected);
    const [login, setLogin] = useState({utilisateur: ''})
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (login.utilisateur !== '') {
            Api.post('/connexion', login).then((message) => {
                if (message.data) {
                    setIsConnected(message.data)
                    return navigate('/createTodo')
                }
            }).catch((error) => {
                if (error) setError('Erreur interne')
            })
        } else {
            setError("Le nom de l'utilisateur est trop court")
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setLogin({ ...login, [name]: value })
    }


    return (
        <div className="container mt-5">

            {error ? (
                <div className="alert alert-danger">
                    {error}
                </div>
            ) : ''}

            <h1>Connectez-vous temporairement</h1>

            <form method="post" onSubmit={handleSubmit} >
                <input type="text" autoFocus className="form-control" name="utilisateur" onChange={handleChange} placeholder="Insérer un nom d'utilisateur" />
                <button type="submit" className="btn btn-success mt-2">Se connecter</button>
            </form>

        </div>
    )
}

export default Connexion