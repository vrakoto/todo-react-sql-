function PrioriteSelector({nameFunction, defaultSelection = 'none'}) {
    return (
        <select name="priorite" defaultValue={defaultSelection} onChange={nameFunction}>
            <option value="none" disabled>Sélectionnez une priorité</option>
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
        </select>
    )
}

export default PrioriteSelector