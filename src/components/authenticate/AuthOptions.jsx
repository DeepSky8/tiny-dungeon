import React, { useEffect, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
import JoinSession from "./JoinSession";
import AuthPage from "./AuthPage";
import { Outlet, useOutletContext, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Footer from "../home/Footer";

const AuthOptions = () => {
    const [sessionCodes] = useOutletContext();
    const links = ['joinSession', 'authPage']
    const { back = '' } = useParams();
    const useBack = links.includes(back) ? '' : back;
    // const [sessions, setSessionCodes] = useState([])

    const access = 'You may access Tiny Dungeon either by joining a session, or by signing in to a Tiny Dungeon account'

    // useEffect(() => {
    //     console.log('sessions', sessions)
    // }, [sessions])

    // useEffect(() => {
    //     onValue(ref(db, 'sessions'), snapshot => {
    //         const tempArray = []
    //         if (snapshot.exists()) {
    //             snapshot.forEach(snap => { tempArray.push(snap.val()) })
    //         }
    //         setSessionCodes(tempArray)
    //     })


    //     return (() => {
    //         off(ref(db, 'sessions'))
    //     })
    // }, [])


    return (
        <div className="authOptions__container">
            <div className="authOptions__text">
                {access}
            </div>

            <div className="authOptions__menu">
                <NavLink
                    to={`/authenticate/joinSession/${useBack}`}
                    className={
                        ({ isActive }) =>
                            ('navLink' + (isActive ? ' active' : ''))
                    }
                >Join Session</NavLink>

                <NavLink
                    to={`/authenticate/signIn/${useBack}`}
                    className={
                        ({ isActive }) =>
                            ('navLink' + (isActive ? ' active' : ''))
                    }
                >Account</NavLink>
            </div>

            <Outlet context={[sessionCodes]} />

            <Footer />
        </div>
    )
}

export default AuthOptions