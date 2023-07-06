import React from "react";
import Footer from "../home/Footer";
import EnterSession from "../authenticate/EnterSession";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { startClearCharData } from "../../actions/charActions";


const Settings = () => {
    const [context] = useOutletContext();
    let navigate = useNavigate()


    const clearCharData = () => {
        startClearCharData({ charID: context.user.currentCharID })
        navigate('/')
    }

    return (
        <div>
            <EnterSession />

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