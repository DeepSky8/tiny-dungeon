import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import DisplayTrait from "./DisplayTrait";

const DisplayTraits = () => {
    const [traits, setTraits] = useState([])

    useEffect(() => {

        onValue(ref(db, 'traits'), snapshot => {
            const tempTraits = []
            if (snapshot.exists()) {
                snapshot
                    .forEach(snap => {
                        tempTraits
                            .push(
                                {
                                    ...snap.val(),
                                    tID: snap.key
                                }
                            )
                    }
                    )
            }
            setTraits(tempTraits)
        })

        return () => {
            off(ref(db, 'traits'))
        }
    }, [])

    return (
        <div className="displayTraits__container--create">
            {traits.length > 0 &&
                (traits.map(trait => {
                    return (
                        <DisplayTrait
                            key={trait.tID}
                            traitData={trait}
                        />
                    )
                }))
            }
        </div>
    )
}

export default DisplayTraits