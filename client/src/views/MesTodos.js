import Api from "../components/Api"
import { useContext, useState } from "react"
import RefreshData from "../components/context/RefreshData"
import Todos from "../components/context/Todos"

function MesTodos() {
    const lesTodos = useContext(Todos)
    const updatingData = useContext(RefreshData)

    const [error, setError] = useState('')

    const deleteTodo = async (todoKey) => {
        Api.post('/user/deleteTodoe', {leTodo: todoKey}).then((msg) => {
            if (msg.data) updatingData(prev => prev + 1)
        }).catch((error) => {
            setError("Erreur interne rencontrée lors de la tentative de suppression d'un todo")
        })
    }

    /* const checkingTodo = (todoKey) => {
        const newState = todo.map((obj, key) => {
            if (key === todoKey) {
                const trigger = ((obj.opened) ? false : true)
                return { ...obj, opened: trigger };
            }
            return obj;
        });

        setTodo(newState)
    } */

    return (
        <div className="container mt-5">

            {error ? (
                <div className="text-center alert alert-danger">
                    {error}
                </div>
            ) : ''}

            <h1>Mes Todos</h1>

            <div className="todos_recents">
                {Object.keys(lesTodos).length > 0 && lesTodos.map((leTodo, key) => (
                    <div key={key} className="card mb-3">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <h3 className="mb-0">{leTodo.titre}</h3>
                                <p>{leTodo.description}</p>
                            </div>
                            <p>{leTodo.priorite}</p>
                            <button type="button" className="btn btn-danger d-inline-block" onClick={() => deleteTodo(key)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MesTodos