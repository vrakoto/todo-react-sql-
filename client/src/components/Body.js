import '../css/main.css'
import '../css/animation.css'
import SideBar from './SideBar'

function Body(props) {
    const { children } = props
    return (
        <div className="d-flex">
            <SideBar />
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Body