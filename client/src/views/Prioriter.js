import { useContext, useState } from "react"
import Todos from "../components/context/Todos"
import LeTodo from "../components/LeTodo"

function Prioriter(props) {
    const { type } = props
    const lesTodos = useContext(Todos)

    const [error, setError] = useState('')

    return (
        <div className="container mt-5">
            <h1 className="titlePage">Mes prioritées {type}</h1>

            <div className="lesTodos">
                {Object.keys(lesTodos).length > 0 && lesTodos.map((leTodo, key) => {
                    if (leTodo.priorite.toLowerCase() === type) {
                        return <LeTodo key={key} leTodo={leTodo} setError={setError} />
                    }
                })}
            </div>

        </div>
    )
}

export default Prioriter