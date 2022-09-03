// import ErrorImg from '../img/error.png'

function Error() {
    return (
        <div className="error">
            <div className="error-text">
                <h1>Oups !</h1>
                <h3>La page que vous recherchez semble introuvable.</h3>
                <p>Code d'erreur: 404</p>
            </div>

            <div className="error-img">
                {/* <img src={ErrorImg} alt="404" /> */}
            </div>
        </div>
    )
}

export default Error