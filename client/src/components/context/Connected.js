import { createContext } from 'react'

const Connected = createContext({
    isConnected: '',
    setIsConnected: () => {}
});

export default Connected