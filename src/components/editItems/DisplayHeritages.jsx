import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import DisplayHeritage from "./DisplayHeritage";

const DisplayHeritages = () => {
    const [heritages, setHeritages] = useState([])
    const [hTraits, setHTraits] = useState([])


    useEffect(() => {

        onValue(ref(db, 'heritages'), snapshot => {
            const tempHeritages = []
            if (snapshot.exists()) {
                snapshot
                    .forEach(snap => {
                        tempHeritages.push(snap.val())
                    })
            }
            setHeritages(tempHeritages)
        })

        return () => {
            off(ref(db, 'heritages'))
        }
    }, [])

    useEffect(() => {

        onValue(ref(db, 'traits'), snapshot => {
            const tempHTraits = []
            if (snapshot.exists()) {
                snapshot
                    .forEach(snap => {
                        snap.val().tHTrait
                            ?
                            tempHTraits.push(snap.val())
                            :
                            ''
                    })
            }
            setHTraits(tempHTraits)
        }, {
            onlyOnce: true
        })

        return () => {
            off(ref(db, 'traits'))
        }
    }, [])

    return (
        <div className="displayHeritages__container">
            {heritages.length > 0 &&
                (heritages.map(heritage => {
                    return (
                        <DisplayHeritage
                            key={heritage.hID}
                            heritageData={heritage}
                            hTraitData={hTraits}
                        />
                    )
                }))
            }
        </div>
    )
}

export default DisplayHeritages