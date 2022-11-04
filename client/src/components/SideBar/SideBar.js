import './sidebar.css'

import { useContext, useEffect, useState } from 'react';
import { faPlus, faListCheck } from "@fortawesome/free-solid-svg-icons";

import Connected from '../context/Connected';

import Item from './Item';

import Reset from './Reset';
import Deconnexion from './Deconnexion';

function SideBar() {
    const [enableDropdown, setEnableDropdown] = useState(false)

    const [error, setError] = useState('')
    const { isConnected } = useContext(Connected);

    const triggerDropdown = () => {
        if (enableDropdown) {
            setEnableDropdown(false)
        } else {
            setEnableDropdown(true)
        }
    }

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }, [error])

    return (
        <>
            <aside>
                <div className="menu">
                    {(isConnected) ?
                        <>
                            <Item titre={`Mes TODOS`} redirect="/" icon={faListCheck} />
                            <Item titre="Créer un TODO" redirect="/createTodo" icon={faPlus} />

                            <div className="bottom">
                                <Reset setError={setError} />
                                <Deconnexion setError={setError} />
                                <i className="mt-5">{`Connecté en tant que : ${isConnected}`}</i>
                            </div>
                        </>
                        :
                        <>
                            <Item titre="Connexion" redirect="/" />
                            <Item titre="Inscription" redirect="/inscription" />
                        </>
                    }
                </div>

                {error ? (
                    <div className="mt-3 alert alert-danger text-center">{error}</div>
                ) : ''}
            </aside>
        </>
    )
}

export default SideBar