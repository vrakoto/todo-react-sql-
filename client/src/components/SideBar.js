import '../css/sidebar.css'

import { useContext, useEffect, useState } from 'react';
import { faPlus, faListCheck, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

import Connected from './context/Connected';
import Todos from './context/Todos';

import Item from './SideBar/Item';
// import Priorite from './SideBar/Priorite';

import Reset from './SideBar/Reset';
import Deconnexion from './SideBar/Deconnexion';

function SideBar() {
    const [enableDropdown, setEnableDropdown] = useState(false)
    const lesTodos = useContext(Todos)
    const nbLesTodosImportantes = lesTodos.filter((leTodo) => leTodo.priorite.toLowerCase() === 'importante')
    const nbLesTodosMoyennes = lesTodos.filter((leTodo) => leTodo.priorite.toLowerCase() === 'moyenne')
    const nbLesTodosBasses = lesTodos.filter((leTodo) => leTodo.priorite.toLowerCase() === 'basse')

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
                    {(isConnected === true) ?
                        <>
                            <Item titre={`Mes TODOS (${lesTodos.length})`} redirect="/" icon={faListCheck} />
                            <Item titre="Créer un TODO" redirect="/createTodo" icon={faPlus} />

                            <Item titre="Priorité" icon={faScaleBalanced} onClick={triggerDropdown} />
                            <ul className={`dropdown ${!enableDropdown ? 'd-none' : ''}`}>
                                <Item titre={`Importante (${nbLesTodosImportantes.length})`} redirect="/prioritee-importante" />
                                <Item titre={`Moyenne (${nbLesTodosMoyennes.length})`} redirect="/prioritee-moyenne" />
                                <Item titre={`Basse (${nbLesTodosBasses.length})`} redirect="/prioritee-basse" />
                            </ul>

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