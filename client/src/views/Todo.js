import axios from "axios"
import { useEffect, useState } from "react"
import PrioriteSelector from "../components/PrioriteSelector"
import '../css/todo.css'

function Todo() {
    const [highlight, setHighlight] = useState(false)
    const [todo, setTodo] = useState({ titre: '', description: '', priorite: '' })
    const [refreshData, setRefreshData] = useState(0)

    // State pour consultation et modification d'un TODO
    const [dt, setDT] = useState({})
    const [currentTodo, setCurrentTodo] = useState({})

    const [mesTodos, setMesTodos] = useState([])
    const [message, setMessage] = useState({})

    useEffect(() => {
        axios.get('/user/todos').then((response) => {
            setMesTodos(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [refreshData])

    useEffect(() => {
        if (refreshData != 0) {
            setHighlight(true)
            setTimeout(() => {
                setHighlight(false)
            }, 800);
        }
    }, [refreshData])

    const BlinkingComponent = ({ highlighting }) => (
        <div className={`element ${highlighting ? " highlight" : ""}`}>Watch Me</div>
    );

    const editTodo = async () => {
        axios.post('/user/modifierTodo', { id: dt.id, currentTodo }).then(() => {
            setRefreshData(oldKey => oldKey + 1)
        }).catch((err) => {
            console.log(err);
            setMessage({ error: "Probleme modification todo" });
        })
    }


    const addTodo = (e) => {
        e.preventDefault();

        if (todo.titre !== '' && todo.description !== '' && todo.priorite !== '') {
            axios.post('/user/todo', todo).then((msg) => {
                if (msg.data.error) {
                    setMessage({ error: msg.data.error })
                } else if (msg.data.success) {
                    setRefreshData(oldKey => oldKey + 1)
                    setMessage({ success: "Todo créé !" });
                }
            }).catch((err) => {
                setMessage({ error: "Probleme création todo" });
            })
        } else {
            setMessage({ error: "Le formulaire est invalide" });
        }
    }

    const supprimer = async (id) => {
        axios.post('/user/deleteTodo', { id }).then((msg) => {
            if (msg.data.success) {
                setDT({})
                setRefreshData(oldKey => oldKey + 1)
            }
        }).catch((err) => {
            setMessage({ error: "Probleme suppression todo" });
        })
    }

    const detailTodo = async (id) => {
        axios.get('/user/todo', { params: { id: id } }).then((datas) => {
            setDT(datas.data)
        }).catch((err) => {
            setMessage({ error: "Probleme récupération todo" });
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setTodo({ ...todo, [name]: value })
    }

    const handleChangeEditTodo = (e) => {
        const { name, value } = e.target
        setCurrentTodo({ ...currentTodo, [name]: value })
    }

    return (
        <>
            <div className="center">
                <div className="main">

                    <form method='POST' onSubmit={addTodo}>
                        {message.success ? message.success
                            : message.error ? message.error
                                : ''}
                        <h1 className="titleCard">TODO</h1>

                        <input type="text" name="titre" onChange={handleChange} placeholder="Insérer un titre" autoFocus />
                        <input type="text" name="description" onChange={handleChange} placeholder="Insérer une description (falcultatif)" />

                        <PrioriteSelector nameFunction={handleChange} />
                        <BlinkingComponent highlighting={highlight} />

                        <button type="submit">Ajouter</button>
                    </form>
                </div>

                <div className="main">
                    <h1 className="titleCard">Mes TODO</h1>
                    <div className="lesTodos">
                        {mesTodos.map((value, key) => (
                            <div className="leTodo" key={key} onClick={() => detailTodo(value.id)}>
                                <h3>{value.id}</h3>
                                <h3>{value.titre}</h3>
                                <h3 className="priorite">{value.priorite}</h3>
                                <h3 onClick={() => supprimer(value.id)}>Supprimer</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {dt && Object.keys(dt).length > 0 ? (
                <div className="center" key={dt.id}>
                    <div className="main">
                        <h1 className="titleCard">TODO N°{dt.id}</h1>

                        <input type="text" defaultValue={dt.titre} name="titre" onChange={handleChangeEditTodo} />
                        <textarea defaultValue={dt.description} name="description" onChange={handleChangeEditTodo}></textarea>
                        <PrioriteSelector nameFunction={handleChangeEditTodo} defaultSelection={dt.priorite} />

                        <button type="button" onClick={() => editTodo()}>Modifier</button>
                    </div>
                </div>
            ) : ''}
        </>
    )
}

export default Todo