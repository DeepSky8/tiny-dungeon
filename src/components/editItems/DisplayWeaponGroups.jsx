import React, { useEffect, useState } from "react";
import DisplayWeaponGroup from "./DisplayWeaponGroup";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";

const DisplayWeaponGroups = () => {
    const [weaponGroups, setWeaponGroups] = useState([]);

    useEffect(() => {
        onValue(ref(db, 'weaponGroups'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(weaponGroup => {

                    tempArray.push(weaponGroup.val())

                })
                setWeaponGroups(tempArray)
            }
        })

        return (() => {
            off(ref(db, 'weaponGroups'))
        })
    }, [])

    useEffect(() => {
        console.log('weaponGroups', weaponGroups)
    }, [weaponGroups])

    return (
        <div>
            {weaponGroups.length > 0
                &&
                weaponGroups.map(wg => {
                    return (
                        <DisplayWeaponGroup
                            key={wg.wgID}
                            weaponGroup={wg}
                        />
                    )
                })}
        </div>
    )
}

export default DisplayWeaponGroups

