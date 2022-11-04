import './todo.css'
import { useState } from "react"
import DeleteTodo from './DeleteTodo'
import Input from '../Input'
import Api from '../Api'

function LeTodo({ leTodo, setError }) {
    const { id, titre, description, priorite } = leTodo
    const [enableEdit, setEnableEdit] = useState(false)

    const [editedValue, setEditedValue] = useState({})

    const [errorField, setErrorField] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (value.trim() !== '') {
            setEditedValue(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleVerification = async () => {
        Api.post('/user/editTodo', {id, champs: editedValue}).then((msg) => {
            const { success, error } = msg.data
            if (success) {
                setEditedValue({})
                setEnableEdit(false)
                console.log("edited !");
            } else if (error) {
                console.log(error);
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <div className="leTodo_container card mb-3">
            <div className="card-body d-flex align-items-center justify-content-between">
                {enableEdit ? (
                    <>
                        <div>
                            <Input type="text" variable="titre" error={errorField.titre} func={handleChange} placeholder="Insérer un titre" defaultValue={titre} />
                            <Input type="text" variable="description" error={errorField.description} func={handleChange} placeholder="Insérer une description" defaultValue={description} />
                        </div>
                        <div className="mb-3">
                            <select className="form-select form-select-lg" name="priorite" id="priorite" defaultValue={priorite} onChange={handleChange}>
                                <option value="importante">Importante</option>
                                <option value="moyenne">Moyenne</option>
                                <option value="basse">Basse</option>
                            </select>
                        </div>
                        <p>{priorite}</p>
                        {Object.keys(editedValue).length > 0 ? <button className="btn btn-success" onClick={handleVerification}>Mettre à jour</button> : ''}
                    </>
                ) :
                    <>
                        <div>
                            <h3 className="mb-0">{titre}</h3>
                            <p>{description}</p>
                        </div>
                        <p>{priorite}</p>
                        <button className="btn btn-primary" onClick={() => setEnableEdit(true)}>Modifier</button>
                    </>
                }

                <DeleteTodo id={id} setError={setError} />
            </div>
        </div>
    )
}

export default LeTodo