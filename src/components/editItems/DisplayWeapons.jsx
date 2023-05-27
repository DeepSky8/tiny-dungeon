import React, { useEffect, useState } from "react";
import DisplayWeapon from "./DisplayWeapon";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";

const DisplayWeapons = () => {
    const [weapons, setWeapons] = useState([]);

    useEffect(() => {
        onValue(ref(db, 'weapons'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(weapon => {
                    console.log('weapon', weapon.val())

                    tempArray.push(weapon.val())

                })
            }
            setWeapons(tempArray)
        })

        return (() => {
            off(ref(db, 'weapons'))
        })
    }, [])

    return (
        <div>
            {weapons.map(weapon => {
                return (
                    <DisplayWeapon
                        key={weapon.wID}
                        weaponData={weapon}
                    />
                )
            })}
        </div>
    )
}

export default DisplayWeapons