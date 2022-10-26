import Api from "../components/Api"
import { useState, useContext } from "react"
import RefreshData from "../components/context/RefreshData"

function Todo() {
    const updatingData = useContext(RefreshData)

    const [msg, setMsg] = useState({})
    const [todoVerification, setTodoVerification] = useState({ titre: '', description: '', priorite: 'Moyenne', opened: false })

    const handleChange = (e) => {
        const { name, value } = e.target
        setTodoVerification({ ...todoVerification, [name]: value })
    }

    const handleVerification = async (e) => {
        e.preventDefault()

        if (todoVerification.titre !== '') {
            Api.post('/user/todo', todoVerification).then((msg) => {
                if (msg.data) {
                    updatingData(prev => prev + 1)
                    setMsg({success: 'TODO ajouté !'})
                }
            }).catch((error) => {
                setMsg({error: "Erreur interne"})
            })
        } else {
            setMsg({error: "Le titre est vide"})
        }
    }

    return (
        <div className="container mt-5">

            {msg.error ? (
                <div className="alert alert-danger">
                    {msg.error}
                </div>

            ) : msg.success ? (
                <div className="alert alert-success">
                    {msg.success}
                </div>

            ) : ''}

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
                        <option value="Importante">Importante</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Basse">Basse</option>
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