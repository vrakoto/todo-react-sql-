import { useContext } from "react"
import Api from "../Api"
import RefreshData from "../context/RefreshData"

function DeleteTodo({id, setError}) {
    const updatingData = useContext(RefreshData)

    const deleteTodo = async () => {
        Api.post('/user/deleteTodo', {leTodo: id}).then((msg) => {
            if (msg.data) updatingData(prev => prev + 1)
        }).catch((error) => {
            setError("Erreur interne rencontrée lors de la tentative de suppression d'un todo")
        })
        console.log(id);
    }

    return (
        <button type="button" className="btn btn-danger d-inline-block" onClick={deleteTodo}>Supprimer</button>
    )
}

export default DeleteTodo