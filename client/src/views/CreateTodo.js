import { useState, useContext } from "react"

import Api from "../components/Api"

import Success from "../components/context/Success"
import RefreshData from "../components/context/RefreshData"

function Todo() {
    const { setSuccess } = useContext(Success)
    const { setRefresh } = useContext(RefreshData)

    const [todoVerification, setTodoVerification] = useState({ titre: '', description: '', priorite: 'moyenne' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setTodoVerification({ ...todoVerification, [name]: value })
    }

    const handleVerification = async (e) => {
        e.preventDefault()

        if (todoVerification.titre !== '') {
            Api.post('/user/todo', todoVerification).then((msg) => {
                if (msg.status === 200) {
                    setRefresh(prev => prev + 1)
                    setSuccess('TODO créé !')
                }
            }).catch((error) => {
                // setMsg({ title: "Erreur 500 Serveur", error: error.request.response })
            })
        } else {
            // setMsg({ title: "Erreur Formulaire", error: "Le titre est vide" })
        }
    }

    return (
        <div className="container mt-5">

            {/* {msg.error ? (
                <div className="alert alert-danger">
                    {msg.error}
                </div>

            )} */}

            <h1 className="titlePage">Créer un TODO</h1>

            <form className="customForm form-group" method="post" onSubmit={handleVerification}>
                <div className="mt-3">
                    <input type="text" autoFocus name="titre" className="form-control" id="titre" placeholder="Insérer un titre" onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <input type="text" name="description" className="form-control" id="description" placeholder="Insérer une description" onChange={handleChange} />
                </div>

                <div className="mt-3">
                    <label htmlFor="priorite" className="form-label mb-0">Sélectionnez une prioritée</label>
                    <select className="form-control" defaultValue="Moyenne" name="priorite" id="priorite" onChange={handleChange}>
                        <option value="importante">Importante</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="basse">Basse</option>
                    </select>
                </div>

                <div className="mt-3">
                    <button type="submit" className="btn btn-success">Créer</button>
                </div>

            </form>

        </div>
    )
}

export default Todo