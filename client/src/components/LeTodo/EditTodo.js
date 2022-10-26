import Api from "../Api"
import { useContext, useState } from "react"
import RefreshData from "../context/RefreshData"

function EditTodo({ setError, enableEdit, setEnableEdit, field }) {
    const updatingData = useContext(RefreshData)

    return (
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modalEdit modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modifier TODO</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="customForm modal-body">
                        {/* <div className="mt-3">
                            <input type="text" defaultValue={titre} autoFocus name="titre" className="form-control" id="titre" placeholder="Insérer un titre" onChange={handleChange} />
                        </div>

                        <div className="mt-2">
                            <input type="text" defaultValue={description} name="description" className="form-control" id="description" placeholder="Insérer une description" onChange={handleChange} />
                        </div>

                        <div className="mt-2">
                            <input type="text" name="priorite" defaultValue={priorite} className="form-control" onChange={handleChange} placeholder="Insérer une prioritée" />
                        </div> */}

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTodo
/* const editing = async () => {
    Api.post('/user/editTodo', field).then((msg) => {
        if (msg.data) {
            updatingData(prev => prev + 1)
            setEnableEdit(false)
        }
    }).catch((error) => {
        console.log(error);
        setError("Erreur interne rencontrée lors de la tentative de suppression d'un todo")
    })
} */