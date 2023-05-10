import React, { useEffect, useReducer, useState } from "react";
import { defaultHeritage, heritageReducer } from "../../reducers/heritageReducer";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
import Field from "./Field";
import {
    loadHeritage,
    removeHTraitID,
    startNewHeritageKey,
    updateHDescription,
    updateHHP,
    updateHTitle,
    updateHTraitIDs
} from "../../actions/heritageActions";
import Menu from "./Menu";

const CreateHeritage = () => {
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, defaultHeritage)
    const [hTraits, setHTraits] = useState([])

    useEffect(() => {

        onValue(ref(db, 'traits'), snapshot => {
            const tempHTraits = []
            if (snapshot.exists()) {
                snapshot
                    .forEach(snap => {
                        snap.val().tHTrait
                            ?
                            tempHTraits.push(snap.val())
                            :
                            ''
                    })
            }
            setHTraits(tempHTraits)
        }, {
            onlyOnce: true
        })

        return () => {
            off(ref(db, 'traits'))
        }
    }, [])

    const handleSave = () => {
        startNewHeritageKey({ heritageData: heritage })
            .then(() => {
                dispatchHeritage(loadHeritage(defaultHeritage))
            })
    }

    const handleRemoveHTrait = (id) => {
        dispatchHeritage(removeHTraitID(id))
    }

    return (
        <div className="createHeritage__container">
            <Field
                label={'Heritage Title'}
                id={'hTitle'}
                type={'text'}
                value={heritage.hTitle}
                change={(e) => {
                    dispatchHeritage(updateHTitle(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <Field
                label={'Heritage Description'}
                id={'hDescription'}
                type={'textarea'}
                value={heritage.hDescription}
                change={(e) => {
                    dispatchHeritage(updateHDescription(e.target.value))
                }}
                blur={() => {
                    const formatValue = heritage.hDescription.replace(/[\n\r]/gm, ' ');
                    dispatchState(updateHDescription(formatValue))
                }}
                theme={''}
            />

            <Field
                label={'Heritage HP'}
                id={'hHP'}
                type={'number'}
                value={heritage.hHP}
                change={(e) => {
                    dispatchHeritage(updateHHP(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <Menu
                label={'Heritage Trait'}
                id={'hTraitID'}
                change={(e) => {
                    console.log('', e.target.value)
                    dispatchHeritage(updateHTraitIDs(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
                array={hTraits}
            />

            {
                heritage.hTraitIDs.length > 0 &&
                <ul>
                    {
                        hTraits
                            .filter(htObject =>
                                heritage
                                    .hTraitIDs
                                    .includes(htObject.tID)
                            ).map(
                                hTrait => {
                                    return (
                                        <li
                                            key={hTrait.tID}
                                        >
                                            {hTrait.tTitle}
                                            <button
                                                onClick={() => {
                                                    handleRemoveHTrait(hTrait.tID)
                                                }}
                                            >Remove</button>
                                        </li>
                                    )

                                })
                    }
                </ul>
            }

            <button
                onClick={handleSave}
            >Save</button>

        </div>
    )
}

export default CreateHeritage

// <Field
// label={''}
// id={ }
// type={ }
// value={ }
// change={ }
// blur={ }
// theme={''}
// />

// <Field
// label={'Heritage Name'}
// id={'hName'}
// type={'text'}
// value={heritage.hName}
// change={(e) => {
//     dispatchHeritage(updateHName(e.target.value))
// }}
// blur={''}
// theme={''}
// />