import React, { useState } from "react";
import DisplayWeaponGroup from "./DisplayWeaponGroup";

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

    return (
        <div>
            {weaponGroups.map(wg => {
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