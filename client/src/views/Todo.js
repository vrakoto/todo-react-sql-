import axios from "axios"
import { useEffect, useState } from "react"
import PrioriteSelector from "../components/PrioriteSelector"
import '../css/todo.css'

function Todo() {
    const [highlight, setHighlight] = useState(false)
    const [newTodo, setNewTodo] = useState({ titre: '', description: '', priorite: '' })
    const [refreshData, setRefreshData] = useState(0)

    // State pour consultation et modification d'un TODO
    const [leTodo, setLeTodo] = useState({})
    const [edititingTodo, setEditingTodo] = useState({})

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
        if (refreshData !== 0) {
            setHighlight(true)
            setTimeout(() => {
                setHighlight(false)
            }, 800);
        }
    }, [refreshData])

    useEffect(() => {
        if (leTodo) {
            console.log();
        }
    }, [leTodo])

    const BlinkingComponent = ({ highlighting }) => (
        <div className={`element ${highlighting ? " highlight" : ""}`}>Watch Me</div>
    );

    const addTodo = (e) => {
        e.preventDefault();

        if (newTodo.titre !== '' && newTodo.description !== '' && newTodo.priorite !== '') {
            axios.post('/user/todo', newTodo).then((msg) => {
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

    const editTodo = async () => {
        axios.post('/user/modifierTodo', { id: leTodo.datas.id, edititingTodo }).then(() => {
            setRefreshData(oldKey => oldKey + 1)
        }).catch((err) => {
            console.log(err);
            setMessage({ error: "Probleme modification todo" });
        })
    }

    const supprimer = async (id) => {
        axios.post('/user/deleteTodo', { id }).then((msg) => {
            if (msg.data.success) {
                setLeTodo({})
                setRefreshData(oldKey => oldKey + 1)
            }
        }).catch((err) => {
            setMessage({ error: "Probleme suppression todo" });
        })
    }

    const detailTodo = async (id, e) => {
        const currentCard = e.currentTarget
        axios.get('/user/todo', { params: { id: id } }).then((datas) => {
            setLeTodo({currentCard, datas: datas.data})
        }).catch((err) => {
            setMessage({ error: "Probleme récupération todo" });
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewTodo({ ...newTodo, [name]: value })
    }

    const handleChangeEditTodo = (e) => {
        const { name, value } = e.target
        setEditingTodo({ ...edititingTodo, [name]: value })
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
                            <div className={`leTodo ${leTodo.datas.id === value.id ? " selectedTodo" : ""}`} name={value.id} key={key} onClick={(e) => detailTodo(value.id, e)}>
                                <h3>{value.id}</h3>
                                <h3>{value.titre}</h3>
                                <h3 className="priorite">{value.priorite}</h3>
                                <h3 onClick={() => supprimer(value.id)}>Supprimer</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {leTodo.datas && Object.keys(leTodo).length > 0 ? (
                <div className="center" key={leTodo.datas.id}>
                    <div className="main">
                        <h1 className="titleCard">TODO N°{leTodo.datas.id}</h1>

                        <input type="text" defaultValue={leTodo.datas.titre} name="titre" onChange={handleChangeEditTodo} />
                        <textarea defaultValue={leTodo.datas.description} name="description" onChange={handleChangeEditTodo}></textarea>
                        <PrioriteSelector nameFunction={handleChangeEditTodo} defaultSelection={leTodo.datas.priorite} />

                        <button type="button" onClick={() => editTodo()}>Modifier</button>
                    </div>
                </div>
            ) : ''}
        </>
    )
}

export default Todo