import '../css/main.css'
import '../css/animation.css'
import SideBar from './SideBar/SideBar'

import toast, { Toaster } from 'react-hot-toast';
import Success from './context/Success';
import { useContext, useEffect } from 'react';
import RefreshData from './context/RefreshData';

function Body(props) {
    const { children } = props
    const { refresh } = useContext(RefreshData)
    const { success } = useContext(Success)

    useEffect(() => {
        if (success) {
            toast.success(success)
        }
    }, [refresh])

    return (
        <div>
            {success ? <Toaster /> : ''}
            <SideBar />
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Body