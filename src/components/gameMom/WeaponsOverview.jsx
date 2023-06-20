import React, { useEffect, useReducer } from "react";
import { counterReducer, defaultCounter } from "../../reducers/counterReducer";
import { addCounterItem, clearCounters } from "../../actions/counterActions";
import ClickDescriptionCount from "../display/ClickDescriptionCount";
import alphabetizeKeys from "../../functions/alphabetizeKeys";


const WeaponsOverview = ({ characters, weapons, weaponGroups }) => {
    const [countedWeapons, dispatchCountedWeapons] = useReducer(counterReducer, defaultCounter)
    const [countedWeaponGroups, dispatchCountedWeaponGroups] = useReducer(counterReducer, defaultCounter)


    useEffect(() => {
        dispatchCountedWeapons(clearCounters())
        dispatchCountedWeaponGroups(clearCounters())

        characters.forEach(character => {
            character.weaponObjects.forEach(weapon => {
                dispatchCountedWeapons(addCounterItem({ key: weapon.wID, title: weapon.wTitle }))
            })
        });

        characters.forEach(character => {
            character.weaponGroupObjects.forEach(weaponGroup => {
                dispatchCountedWeaponGroups(addCounterItem({ key: weaponGroup.wgID, title: weaponGroup.wgTitle }))
            })
        });
    }, [characters])

    return (
        <div className="traitsOverview__container">
            {alphabetizeKeys({ objectArray: countedWeaponGroups.pairs, key: 'title' }).map(countedWeaponGroup => {
                const thisWeaponGroup = weaponGroups.find(weaponGroup => weaponGroup.wgID === countedWeaponGroup.key)
                return (
                    <ClickDescriptionCount
                        key={countedWeaponGroup.key}
                        title={thisWeaponGroup.wgTitle}
                        description={
                            <div>
                                {
                                    alphabetizeKeys({ objectArray: countedWeapons.pairs, key: 'title' }).map(countedWeapon => {
                                        const thisWeapon = weapons.find(weapon => (weapon.wID === countedWeapon.key && weapon.wType === thisWeaponGroup.wgType))
                                        if (thisWeapon) {
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
                                        }
                                    })
                                }
                            </div>
                        }
                        amount={countedWeaponGroup.amount}
                        increase={() => { }}
                        decrease={() => { }}
                    />
                )
            })}
        </div>
    )
}

export default WeaponsOverview





// weapons.filter(weapon => weapon.wType === thisWeaponGroup.wgType)


// return (
    // <ClickDescriptionCount
    //     key={countedWeapon.key}
    //     title={thisWeapon.wTitle}
    //     description={thisWeapon.wDescription}
    //     amount={countedWeapon.amount}
    //     increase={() => { }}
    //     decrease={() => { }}
    // />
// )




// <hr className="hr__brown" />
// {countedWeapons.pairs.map(countedWeapon => {
//     const thisWeapon = weapons.find(weapon => weapon.wID === countedWeapon.key)
//     return (
//         <ClickDescriptionCount
//             key={countedWeapon.key}
//             title={thisWeapon.wTitle}
//             description={thisWeapon.wDescription}
//             amount={countedWeapon.amount}
//             increase={() => { }}
//             decrease={() => { }}
//         />
//     )
// })}