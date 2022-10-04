import '../css/main.css'
import SideBar from './SideBar'

function Body(props) {
    const { children } = props
    return (
        <div className="d-flex">
            <SideBar />
            {children}
        </div>
    )
}

export default Body