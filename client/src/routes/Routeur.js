import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Body from '../components/Body'
import Authentification from '../views/Authentification'
import Connexion from '../views/Connexion';
import Inscription from '../views/Inscription';
import NotFound from '../views/NotFound'
import Todo from '../views/Todo'

function Routeur() {
    return (
        <BrowserRouter>
            <Body>
                <Routes>
                    <Route path="/" element={<Authentification />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/inscription" element={<Inscription />} />
                    <Route path="/todo" element={<Todo />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Body>
        </BrowserRouter>
    )
}

export default Routeur