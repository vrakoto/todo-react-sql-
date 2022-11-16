import './sidebar.css'

import { useContext, useEffect, useState } from 'react';
import { faPlus, faListCheck } from "@fortawesome/free-solid-svg-icons";

import Connected from '../context/Connected';

import Item from './Item';

import Reset from './Reset';
import Deconnexion from './Deconnexion';

function SideBar() {
    const [fixedTop, setFixedTop] = useState(false)

    const [error, setError] = useState('')
    const { isConnected } = useContext(Connected);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }, [error])

    const fixingTop = e => {
        if (window.scrollY > 10) {
            setFixedTop(true)
        } else {
            setFixedTop(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', fixingTop)
    }, [])

    return (
        <div className="text-center">
            <nav className={fixedTop ? 'fixed-top mt-0' : ''}>
                {(isConnected) ?
                    <>
                        {/* <a>{`Connecté en tant que : ${isConnected}`}</a> */}
                        <Item titre="Créer un TODO" redirect="/createTodo" icon={faPlus} />
                        <Item titre={`Mes TODOS`} redirect="/" icon={faListCheck} />
                        <Reset setError={setError} />
                        <Deconnexion setError={setError} />
                    </>
                    :
                    <>
                        <Item titre="Connexion" redirect="/" />
                        <Item titre="Inscription" redirect="/inscription" />
                    </>
                }
            </nav>
        </div>
    )
}

export default SideBar