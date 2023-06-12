import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import {
    setDefaultWeaponGroupObjects,
    addWeaponGroupObject,
    clearWeaponGroupObjects
} from "../../../actions/charActions";
import sortWGs from "../../../functions/sortWGs";
import ClickDescriptionSelect from "../../display/ClickDescriptionSelect";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../../api/firebase";
import DisplayRational from "../DisplayRational";


const CharWeaponGroup = () => {
    const [char, dispatchChar] = useOutletContext();
    const charTraitIDs = [char.hTraitID].concat(char.traitIDs)
    const [selectedTraits, setSelectedTraits] = useState([])
    const [allWeaponGroups, setAllWeaponGroups] = useState([])
    const [defaultWeaponGroups, setDefaultWeaponGroups] = useState([]);
    const [availWeaponGroups, setAvailWeaponGroups] = useState([]);

    // Get trait objects
    useEffect(() => {
        const tempArray = [];

        charTraitIDs.forEach(traitID => {
            onValue(ref(db, `traits/${traitID}`), snapshot => {
                if (snapshot.exists()) {
                    tempArray.push(snapshot.val())
                }
            }, {
                onlyOnce: true
            })
        })

        setSelectedTraits(tempArray)
        // return (() => {
        //     off(ref(db, 'weaponGroups'))
        // })
    }, [])

    // Get Weapon Group objects
    useEffect(() => {
        onValue(ref(db, 'weaponGroups'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(weaponGroup => {
                    tempArray.push(weaponGroup.val())
                })
                setAllWeaponGroups(tempArray)
            }
        }, {
            onlyOnce: true
        })

        // return (() => {
        //     off(ref(db, 'weaponGroups'))
        // })
    }, [])

    // Clear weapon group IDs on char
    // then use sortedWGs to evaluate weapon groups gained via trait
    // Add those weapon groups to char,
    // then provide the remaining weapon groups to the user to select one
    useEffect(() => {
        dispatchChar(clearWeaponGroupObjects())
        if (selectedTraits.length > 0 && allWeaponGroups.length > 0) {
            const sortedWGs = sortWGs(
                {
                    allTraits: selectedTraits,
                    weaponGroups: allWeaponGroups
                }
            )
            setDefaultWeaponGroups(sortedWGs.defaultWGs);
            dispatchChar(setDefaultWeaponGroupObjects(sortedWGs.defaultWGs))
            // sortedWGs
            //     .defaultWGs
            //     .forEach(wg => {
            //         dispatchChar(addWeaponGroupObject(wg))
            //     })

            setAvailWeaponGroups(sortedWGs.availWGs);
        }

    }, [selectedTraits, allWeaponGroups])

    const handleWGSelection = (wg) => {
        // Reset the default weapon group objects
        dispatchChar(setDefaultWeaponGroupObjects(defaultWeaponGroups))

        // Add the newly-selected weapon group object
        dispatchChar(addWeaponGroupObject(wg))
    }

    return (
        <div className="charWeaponGroup__container">

            {
                defaultWeaponGroups.length > 0
                &&
                <div className="charWeaponGroup__container--defaultWGs">
                    <div className="charWeaponGroup__text--explanation">
                        Your character can use the following weapon groups due to trait selection:
                    </div>
                    <div className="clickOpen__text--reminder">
                        Click to open
                    </div>
                    {defaultWeaponGroups.map(wg => {
                        return (
                            <ClickDescriptionSelect
                                key={wg.wgID}
                                itemID={wg.wgID}
                                title={wg.wgTitle}
                                description={wg.wgDescription}
                                changeHandler={() => {
                                    // Cannot be unselected
                                }}
                                isSelected={true}
                            />
                        )
                    })}
                </div>
            }
            <hr className="hr__brown" />
            {
                availWeaponGroups.length > 0
                &&
                <div className="charWeaponGroup__container--availWGs">
                    <div className="charWeaponGroup__text--explanation">
                        The following Weapon Groups are available for your character:
                    </div>
                    <div className="clickOpen__text--reminder">
                        Click to open
                    </div>
                    {availWeaponGroups.map(wg => {
                        return (
                            <ClickDescriptionSelect
                                key={wg.wgID}
                                itemID={wg.wgID}
                                title={wg.wgTitle}
                                description={wg.wgDescription}
                                changeHandler={() => {
                                    handleWGSelection(wg)
                                }}
                                isSelected={char.weaponGroupObjects.map(wgO => wgO.wgID).includes(wg.wgID)}
                            />
                        )
                    })}
                </div>
            }


            <DisplayRational />

        </div>
    )
}

export default CharWeaponGroup