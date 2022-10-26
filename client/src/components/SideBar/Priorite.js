import '../../css/sidebar.css'
import Item from './Item';

import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

function Priorite({children}) {
    const [enable, enableDropDown] = useState(false)

    const triggerDropdown = async () => {
        
    };

    return <Item titre="Prioriées" onClick={() => enableDropDown(true)} icon={faScaleBalanced} />
}

export default Priorite