import React, {
    useEffect,
    useState
} from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";


const Home = () => {
    const [sessionCodes, setSessionCodes] = useState([])

    useEffect(() => {
        onValue(ref(db, 'sessions'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => { tempArray.push(snap.val()) })
            }
            setSessionCodes(tempArray)
        })


        return (() => {
            off(ref(db, 'sessions'))
        })
    }, [])

    return (
        <div className="home__container">
            <Header />
            <div className="home__spacer--desktop">
                <Outlet context={[sessionCodes]} />
            </div>
        </div>
    )
}

export default Home