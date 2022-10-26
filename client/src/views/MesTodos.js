import { useContext, useState } from "react"
import Todos from "../components/context/Todos"
import LeTodo from "../components/LeTodo"

function MesTodos() {
    const lesTodos = useContext(Todos)

    const [error, setError] = useState('')

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

            <h1 className="titlePage">Mes Todos</h1>

            <div className="todos_recents">
                {Object.keys(lesTodos).length > 0 && lesTodos.map((leTodo, id) => 
                    <LeTodo key={id} leTodo={leTodo} setError={setError} />
                )}
            </div>
        </div>
    )
}

export default MesTodos