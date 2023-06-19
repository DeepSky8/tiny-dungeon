import React, { useEffect, useReducer } from "react";
import { counterReducer, defaultCounter } from "../../reducers/counterReducer";
import { addCounterItem, clearCounters } from "../../actions/counterActions";
import ClickDescriptionCount from "../display/ClickDescriptionCount";


const WeaponsOverview = ({ characters, weapons }) => {
    const [countedWeapons, dispatchCountedWeapons] = useReducer(counterReducer, defaultCounter)

    useEffect(() => {
        dispatchCountedWeapons(clearCounters())

        characters.forEach(character => {
            character.weaponObjects.forEach(weapon => {
                console.log('weaponID', weapon.wID)
                dispatchCountedWeapons(addCounterItem(weapon.wID))
            })
        });
    }, [characters])

    return (
        <div className="traitsOverview__container">
            {countedWeapons.pairs.map(countedWeapon => {
                const thisWeapon = weapons.find(weapon => weapon.wID === countedWeapon.key)
                return (
                    <ClickDescriptionCount
                        key={countedWeapon.key}
                        title={thisWeapon.wTitle}
                        description={thisWeapon.wDescription}
                        amount={countedWeapon.amount}
                        increase={() => { }}
                        decrease={() => { }}
                    />
                )
            })}
        </div>
    )
}

export default WeaponsOverview




