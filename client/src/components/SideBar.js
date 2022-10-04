import '../css/sidebar.css'
import { useNavigate, NavLink } from 'react-router-dom'
import Api from './Api';
import { useContext, useEffect, useState } from 'react';
import Connected from './context/Connected';
import RefreshData from './context/RefreshData';
import Todos from './context/Todos';

function SideBar() {
    const updatingData = useContext(RefreshData)
    const nbTodos = useContext(Todos)

    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { isConnected, setIsConnected } = useContext(Connected);

    const Item = ({ titre, redirect }) => (
        <NavLink to={redirect} className={`item ${(isActive) => (isActive ? 'active' : '')}`}>{titre}</NavLink>
    )

    const reset = async () => {
        if (nbTodos.length > 0) { // evite le spam inutile par l'utilisateur
            Api.post('/user/resetTodos').then((msg) => {
                if (msg.data) {
                    updatingData(prevState => prevState + 1)
                }
            }).catch((error) => {
                setError("Erreur interne rencontrée lors de la tentative de réinitialisation des TODOS")
            })
        }
    };

    const deconnexion = async () => {
        Api.post('/user/logoutaing').then((msg) => {
            if (msg) {
                setIsConnected('')
                return navigate('/')
            }
        }).catch((error) => {
            setError("Erreur interne rencontrée lors de la tentative de déconnexion")
        })
    };

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

                {(isConnected === '') ?
                    <Item titre="Connexion" redirect="/" />
                :
                    <>
                        <Item titre="Créer un TODO" redirect="/createTodo" />
                        <Item titre={`Mes TODOS (${nbTodos.length})`} redirect="/mesTodos" />

                        <hr />

                        <h5 className="item">Priorités</h5>
                        <ul className="dropdown">
                            <li>Importante</li>
                            <li>Moyenne</li>
                            <li>Basse</li>
                        </ul>

                        <hr />

                        <div onClick={reset}>Réinitialiser</div>
                        <div onClick={deconnexion}>Déconnexion</div>

                        <hr />
                    </>
                }

                <i className="mt-5">{(isConnected === '') ? '' : `Connecté en tant que : ${isConnected}`}</i>

                {error ? (
                    <div className="mt-3 alert alert-danger text-center">{error}</div>
                ) : ''}
            </aside>
        </>
    )
}

export default SideBar