function Input({type, variable, error, func, placeholder}) {
    return (
        <>
            {error ? <small className="form-text text-danger">{error}</small> : ''}
            <input type={type} className={`form-control ${error ? 'border-danger' : ''}`} name={variable} placeholder={placeholder} onChange={func} />
        </>
    )
}

export default Input