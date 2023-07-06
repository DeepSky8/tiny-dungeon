import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import {
    loadChar,
    startSetDefaultWeaponGroupObjects,
    startSetWeaponGroupObjects
} from "../../../actions/charActions";
import sortWGs from "../../../functions/sortWGs";
import ClickDescriptionSelect from "../../display/ClickDescriptionSelect";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../../api/firebase";
import DisplayRational from "../DisplayRational";
import TapOpen from "../../TapOpen";
import { charReducer, defaultChar } from "../../../reducers/charReducer";


const CharWeaponGroup = () => {
    const { charID } = useParams()
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)
    const [selectedTraits, setSelectedTraits] = useState([])
    const [allWeaponGroups, setAllWeaponGroups] = useState([])
    const [defaultWeaponGroups, setDefaultWeaponGroups] = useState([]);
    const [availWeaponGroups, setAvailWeaponGroups] = useState([]);

    useEffect(() => {
        console.log('char', char)
    }, [char])

    useEffect(() => {
        if (charID && charID !== 0) {
            onValue(ref(db, `characters/${charID}`), snapshot => {

                if (
                    snapshot.exists()
                    &&
                    snapshot.val().userID === auth.currentUser.uid
                ) {
                    dispatchChar(loadChar(snapshot.val()))
                }

            })
        }

        return (() => {

            if (charID && charID !== 0) {
                off(ref(db, `characters/${charID}`))
            }
        })
    }, [charID])

    useEffect(() => {
        const charTraitIDs = [char.hTraitID].concat(char.traitIDs)

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
    }, [char.traitIDs])

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

    // Use sortedWGs to evaluate weapon groups gained via trait
    // Add those weapon groups to char,
    // then provide the remaining weapon groups to the user to select one
    useEffect(() => {

        if (selectedTraits.length > 0 && allWeaponGroups.length > 0) {
            const sortedWGs = sortWGs(
                {
                    selectedTraits: selectedTraits,
                    weaponGroups: allWeaponGroups
                }
            )
            setDefaultWeaponGroups(sortedWGs.defaultWGs);
            startSetDefaultWeaponGroupObjects({ uid: auth.currentUser.uid, charID: charID, defaultWGs: sortedWGs.defaultWGs })
            console.log('set default weapons',)
            setAvailWeaponGroups(sortedWGs.availWGs);
        }

    }, [selectedTraits, allWeaponGroups])

    const handleWGSelection = (wg) => {

        if (char.weaponGroupObjects.filter(wgO => wgO.wgType === wg.wgType).length > 0) {
            const filteredWGOs = (char.weaponGroupObjects.filter(wgO => wgO.wgType !== wg.wgType))
            startSetWeaponGroupObjects({ uid: auth.currentUser.uid, charID: charID, weaponGroups: filteredWGOs })

        } else {
            const newWGOs = defaultWeaponGroups.concat(wg)
            startSetWeaponGroupObjects({ uid: auth.currentUser.uid, charID: charID, weaponGroups: newWGOs })
        }

    }

    return (
        <div className="charWeaponGroup__container">
            <div className="newC__title bold centered">
                Weapon Groups
            </div>
            {
                defaultWeaponGroups.length > 0
                &&
                <div className="charWeaponGroup__container--defaultWGs">
                    <div className="charWeaponGroup__text--explanation centered">
                        Your adventurer can use the following weapon groups due to trait selection
                    </div>
                    <TapOpen />
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
                    <hr className="hr__brown" />
                </div>
            }
            {
                availWeaponGroups.length > 0
                &&
                <div className="charWeaponGroup__container--availWGs">
                    <div className="charWeaponGroup__text--explanation centered">
                        The following Weapon Groups are available for your adventurer
                    </div>
                    <TapOpen />
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