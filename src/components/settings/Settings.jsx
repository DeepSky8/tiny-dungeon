import React, { useEffect, useState } from "react";
import Footer from "../home/Footer";
import { Link, NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { startClearCharData } from "../../actions/charActions";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";


const Settings = () => {
    const [sessionCodes] = useOutletContext();
    let navigate = useNavigate()

    const [localUser] = useLocalStorageState('localUser')
    // const [, , { removeItem: removeLocalFamiliar }] = useLocalStorageState('familiar')





    // const clearCharData = () => {
    //     removeLocalChar()
    //     removeLocalFamiliar()
    //     // setLocalChar('')
    //     // setLocalFamiliar('')
    //     // startClearCharData({ gameCode: localCode, charID: localCID })
    //     navigate('/')
    // }

    return (
        <div className="settings__container">


            <div className="settings__menu">
                <NavLink
                    to={'/settings'}
                    className={
                        ({ isActive }) =>
                            ('navLink' + (isActive ? ' active' : ''))
                    }
                >Session</NavLink>

                <NavLink
                    to={'/settings/selectAdventurer'}
                    className={
                        ({ isActive }) =>
                            ('navLink' + (isActive ? ' active' : ''))
                    }
                >Adventurer</NavLink>
            </div>


            <Outlet context={[sessionCodes]} />

            <Footer />
        </div>
    )
}

export default Settings

// <div className="centered brown">
// <Link to={'/admin'}>Admin</Link>
// </div>
// <div className="centered topMargin">
// <button
//     className="authCode__button--submit"
//     onClick={clearCharData}
// >Delete Character Data</button>
// </div>

// <hr className="hr__brown" />
