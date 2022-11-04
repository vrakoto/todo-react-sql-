import { useContext, useEffect, useState } from "react"
import Api from "../components/Api"
import Refresh from "../components/context/RefreshData"
import Todo from "../components/LeTodo/Todo"

function MesTodos() {
    const [error, setError] = useState('')
    const { refresh } = useContext(Refresh)

    async function getTodos() {
        Api.get('/user/todos').then((datas) => {
            if (datas.status === 200) {
                setLesTodos(datas.data)
            }
        }).catch((error) => {
            if (error.request.status !== 401) {
                console.log(error);
            }
        })
    }

    const [lesTodos, setLesTodos] = useState(() => getTodos())

    const triage = (e) => {
        const { value } = e.target
        let concatedData = [].concat(lesTodos)
        const sorted = (value === "anciennete") ? concatedData.sort((a, b) => a.id > b.id ? 1 : -1) : concatedData.sort((a, b) => a.id > b.id ? -1 : 1)

        setLesTodos(sorted)
    }

    useEffect(() => {
        getTodos();
    }, [refresh])

    return (
        <div className="container mt-5">
            {error ? (
                <div className="text-center alert alert-danger">
                    {error}
                </div>
            ) : ''}

            <h1 className="titlePage">Mes Todos</h1>
            <div className="mb-3 mt-2">
                <select className="form-select" name="triage" onChange={triage} defaultValue="nouveaute">
                    <option value="nouveaute">Trier par: nouveauté</option>
                    <option value="anciennete">Trier par: ancienneté</option>
                </select>
            </div>

            <hr />

            <div className="todos_recents">
                {Object.keys(lesTodos).length > 0 && lesTodos.map((leTodo, id) =>
                    <Todo key={id} leTodo={leTodo} setError={setError} />
                )}
            </div>
        </div>
    )
}

export default MesTodos