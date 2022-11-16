import React, {useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.bundle'

import Body from '../components/Body'

import Connexion from '../views/Connexion'
import Inscription from '../views/Inscription'

import CreateTodo from '../views/CreateTodo'
import MesTodos from '../views/MesTodos'

import NotFound from '../views/NotFound'

import Api from '../components/Api'
import Success from '../components/context/Success';
import Connected from '../components/context/Connected';
import RefreshData from '../components/context/RefreshData'

function Routeur() {
    const [refresh, setRefresh] = useState(0)
    const [success, setSuccess] = useState('')

    const [isConnected, setIsConnected] = useState(async () => {
        function getLogin() {
            Api.get('/login').then((datas) => {
                if (datas.status === 200) {
                    setIsConnected(datas.data)
                }
            }).catch((error) => {
                if (error.request.status !== 403) {
                    console.log(error);
                }
            })
        }
        getLogin()
    })

    const connection = useMemo(() =>
        ({ isConnected, setIsConnected }),
        [isConnected]
    )

    const updatingData = useMemo(() =>
        ({ refresh, setRefresh }),
        [refresh]
    )

    const successMSG = useMemo(() =>
        ({ success, setSuccess }),
        [success]
    )

    return (
        <BrowserRouter>
            <Success.Provider value={successMSG}>
                <Connected.Provider value={connection} >
                    <RefreshData.Provider value={updatingData}>
                        <Body>
                            <Routes>
                                {(isConnected) ? (
                                    <>
                                        <Route path="/" element={<MesTodos />} />
                                        <Route path="/createTodo" element={<CreateTodo />} />
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
                    </RefreshData.Provider>
                </Connected.Provider>
            </Success.Provider>
        </BrowserRouter>
    )
}

export default Routeur