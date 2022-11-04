import './sidebar.css'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Item({ titre, redirect = null, icon = null, onClick = null }) {
    const setIcon = (icon !== null) ? <FontAwesomeIcon icon={icon} /> : ''

    return (
        <>
            { redirect !== null ? (
                <NavLink to={redirect} className={`item ${(isActive) => (isActive ? 'active' : '')}`}>{setIcon} {titre}</NavLink>
            ) :
                <div className="item" onClick={onClick}>{setIcon} {titre}</div>
            }
        </>
    )
}

export default Item