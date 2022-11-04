import { useContext } from "react"
import Api from "../Api"
import Refresh from "../context/RefreshData"

function DeleteTodo({id, setError}) {
    const { setRefresh } = useContext(Refresh)

    const deleteTodo = async () => {
        Api.post('/user/deleteTodo', {leTodo: id}).then((msg) => {
            if (msg.status === 200) setRefresh(prev => prev + 1)
        }).catch((error) => {
            setError(error.request.response)
        })
    }

    return (
        <button type="button" className="btn btn-danger d-inline-block" onClick={deleteTodo}>Supprimer</button>
    )
}

export default DeleteTodo