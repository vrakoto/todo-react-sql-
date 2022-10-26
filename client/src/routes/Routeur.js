import React, {useState, useMemo, useEffect, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import Body from '../components/Body'

import Connexion from '../views/Connexion'
import Inscription from '../views/Inscription'

import CreateTodo from '../views/CreateTodo'
import MesTodos from '../views/MesTodos'
import Prioriter from '../views/Prioriter'

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
                setIsConnected(false)
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
                                {(isConnected === true) ? (
                                    <>
                                        <Route path="/" element={<MesTodos />} />
                                        <Route path="/createTodo" element={<CreateTodo />} />

                                        <Route path="/prioritee-importante" element={<Prioriter type="importante" />} />
                                        <Route path="/prioritee-moyenne" element={<Prioriter type="moyenne" />} />
                                        <Route path="/prioritee-basse" element={<Prioriter type="basse" />} />
                                    </>
                                ) :
                                    <>
                                        <Route path="/" element={<Connexion />} />
                                        <Route path="/inscription" element={<Inscription />} />
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