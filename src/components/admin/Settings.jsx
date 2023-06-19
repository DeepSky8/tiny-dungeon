import React from "react";
import Footer from "../home/Footer";
import AuthCode from "../authenticate/AuthCode";
import { Link } from "react-router-dom";

const Settings = () => {
    return (
        <div>
            <AuthCode />
            <hr className="hr__brown" />
            <div className="centered brown">
                <Link to={'/admin'}>Admin</Link>
            </div>
            <Footer />
        </div>
    )
}

export default Settings