import React, { useEffect, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
import DisplayScroll from "./DisplayScroll";

const DisplayScrolls = () => {
    const [scrolls, setScrolls] = useState([]);

    useEffect(() => {
        onValue(ref(db, 'scrolls'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(scroll => {

                    tempArray.push(scroll.val())

                })
                setScrolls(tempArray)
            }
        })

        return (() => {
            off(ref(db, 'scrolls'))
        })
    }, [])

    return (
        <div className="displayScrolls__container">
            {scrolls.length > 0
                &&
                scrolls.map(scroll => {
                    return (
                        <DisplayScroll
                            key={scroll.sID}
                            scrollData={scroll}
                        />
                    )
                })}
        </div>
    )
}

export default DisplayScrolls

