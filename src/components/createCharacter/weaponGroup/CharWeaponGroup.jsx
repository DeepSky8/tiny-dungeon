import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import {
    clearWeaponGroupIDObjects,
    addRemoveWeaponGroupIDObject,
    removeWeaponIDObject
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
    const [selectedWGObject, setSelectedWGObject] = useState({ wgID: '', wgType: '' })

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
        dispatchChar(clearWeaponGroupIDObjects())
        if (selectedTraits.length > 0 && allWeaponGroups.length > 0) {
            const sortedWGs = sortWGs(
                {
                    allTraits: selectedTraits,
                    weaponGroups: allWeaponGroups
                }
            )
            setDefaultWeaponGroups(sortedWGs.defaultWGs);
            sortedWGs
                .defaultWGs
                .forEach(wg => {
                    dispatchChar(addRemoveWeaponGroupIDObject({ wgID: wg.wgID, wgType: wg.wgType }))
                })

            setAvailWeaponGroups(sortedWGs.availWGs);
        }

    }, [selectedTraits, allWeaponGroups])

    const handleWGSelection = (wgID, wgType) => {
        // If the currently-selected optional weapon group was clicked
        if (wgID === selectedWGObject.wgID) {
            // remove it from char.weaponGroupIDs
            dispatchChar(addRemoveWeaponGroupIDObject(selectedWGObject))
            // and remove the associated weapon (if any) from char.weaponIDObjects 
            dispatchChar(removeWeaponIDObject(selectedWGObject.wgType))
            // and reset the object to default
            setSelectedWGObject({ wgID: '', wgType: '' })

            // Otherwise:
        } else {
            // Set the new weapon group and type in temporary storage
            setSelectedWGObject({ wgID, wgType })
            // and add it to the char object
            dispatchChar(addRemoveWeaponGroupIDObject({ wgID, wgType }))
        }
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
                                    handleWGSelection(wg.wgID, wg.wgType)
                                }}
                                isSelected={char.weaponGroupIDObjects.map(wgIDO => wgIDO.wgID).includes(wg.wgID)}
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