import React from "react";
import Footer from "../home/Footer";
import AuthCode from "../authenticate/AuthCode";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { startClearCharData } from "../../actions/charActions";


const Settings = () => {
    let navigate = useNavigate()
    const [, , { removeItem: removeLocalChar }] = useLocalStorageState('localChar')
    const [, , { removeItem: removeLocalFamiliar }] = useLocalStorageState('familiar')
    const [localCode,] = useLocalStorageState('localCode')
    // const [localCID,] = useLocalStorageState('localCID')



    const clearCharData = () => {
        removeLocalChar()
        removeLocalFamiliar()
        // setLocalChar('')
        // setLocalFamiliar('')
        // startClearCharData({ gameCode: localCode, charID: localCID })
        navigate('/')
    }

    return (
        <div>
            <AuthCode />

            <hr className="hr__brown" />
            <div className="centered brown">
                <Link to={'/admin'}>Admin</Link>
            </div>
            <div className="centered topMargin">
                <button
                    className="authCode__button--submit"
                    onClick={clearCharData}
                >Delete Character Data</button>
            </div>
            <Footer />
        </div>
    )
}

export default Settings