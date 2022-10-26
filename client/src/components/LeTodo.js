import '../css/leTodo.css'
import { useState } from "react"
import DeleteTodo from './LeTodo/DeleteTodo'
import EditTodo from './LeTodo/EditTodo'

function LeTodo({ leTodo, setError }) {
    const [enableEdit, setEnableEdit] = useState(false)
    const [field, setField] = useState({})
    const { id, titre, description, priorite } = leTodo

    const lesChamps = { id, titre: (field.titre ? field.titre : titre), description: (field.description ? field.description : description), priorite: (field.priorite ? field.priorite : priorite) }

    const handleChange = (e) => {
        const { name, value } = e.target
        setField(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            {enableEdit ? (
                <EditTodo setError={setError} enableEdit={enableEdit} setEnableEdit={setEnableEdit} field={lesChamps} />
            ) : ''}
            <div className="leTodo_container card mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                    <div>
                        <h3 className="mb-0">{titre}</h3>
                        <p>{description}</p>
                    </div>
                    <p>{priorite}</p>

                    <button className="btn btn-primary" onClick={() => setEnableEdit(true)}>Modifier</button>
                    <DeleteTodo id={id} setError={setError} />
                </div>
            </div>
        </>
    )
}

export default LeTodo