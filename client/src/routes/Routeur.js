import React, {useState, useMemo, useEffect, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import Body from '../components/Body'

import Connexion from '../views/Connexion'
import CreateTodo from '../views/CreateTodo'
import MesTodos from '../views/MesTodos'

import NotFound from '../views/NotFound'

import Api from '../components/Api'
import Connected from '../components/context/Connected';
import Todos from '../components/context/Todos'
import RefreshData from '../components/context/RefreshData'

function Routeur() {
    const [isConnected, setIsConnected] = useState(async () => {
        function getLogin() {
            Api.get('/login').then((datas) => {
                setIsConnected(datas.data)
            }).catch((error) => {
                console.log(error);
                setIsConnected('')
            })
        }
        getLogin()
    })

    const connection = useMemo(() =>
        ({ isConnected, setIsConnected }),
        [isConnected]
    )

    const [refresh, setRefresh] = useState(0)
    const [todos, setTodos] = useState([])

    useEffect(() => {
        async function getTodos() {
            Api.get('/user/todos').then((datas) => {
                setTodos(datas.data)
            }).catch((error) => {
                console.log(error);
            })
        }
        getTodos()
    }, [refresh])

    return (
        <BrowserRouter>
            <Connected.Provider value={connection} >
                <RefreshData.Provider value={setRefresh}>
                    <Todos.Provider value={todos}>
                        <Body>
                            <Routes>
                                {(isConnected === '') ? (
                                    <Route path="/" element={<Connexion />} />
                                ) :
                                <>
                                    <Route path="/createTodo" element={<CreateTodo />} />
                                    <Route path="/mesTodos" element={<MesTodos />} />
                                </>
                                }
                                
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Body>
                    </Todos.Provider>
                </RefreshData.Provider>
            </Connected.Provider>
        </BrowserRouter>
    )
}

export default Routeur