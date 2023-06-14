import React, { useEffect, useReducer, useState } from "react";
import { defaultHeritage, heritageReducer } from "../../reducers/heritageReducer";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
import {
    loadHeritage,
    removeHTraitID,
    startNewHeritageKey,
    updateHDescription,
    updateHHP,
    updateHPhysical,
    updateHTitle,
    updateHTraitIDs
} from "../../actions/heritageActions";
import Field from "../display/Field";
import Menu from "../display/Menu";
import BulletedRemove from "../display/BulletedRemove";

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
                    dispatchHeritage(updateHDescription(formatValue))
                }}
                theme={''}
            />

            <Field
                label={'Physical Description'}
                id={'hPhysical'}
                type={'textarea'}
                value={heritage.hPhysical}
                change={(e) => {
                    dispatchHeritage(updateHPhysical(e.target.value))
                }}
                blur={() => {
                    const formatValue = heritage.hPhysical.replace(/[\n\r]/gm, ' ');
                    dispatchHeritage(updateHPhysical(formatValue))
                }}
                theme={''}
            />

            <Field
                label={'Heritage HP'}
                id={'hHP'}
                type={'number'}
                value={heritage.hHP}
                change={(e) => {
                    dispatchHeritage(updateHHP(parseInt(e.target.value)))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <Menu
                label={'Heritage Trait'}
                id={'hTraitID'}
                change={(e) => {
                    dispatchHeritage(updateHTraitIDs(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
                selectObject={
                    {
                        tID: `menuDefault${Math.random()}`,
                        tTitle: `--Please select a Heritage Trait--`
                    }
                }
                array={hTraits}
                keyID={'tID'}
                displayID={'tTitle'}
            />

            <BulletedRemove
                objectArray={hTraits}
                IDArray={heritage.hTraitIDs}
                IDKey={'tID'}
                IDTitle={'tTitle'}
                IDDescription={'tDescription'}
                remove={handleRemoveHTrait}
            />

            <button
                onClick={handleSave}
            >Save</button>

        </div>
    )
}

export default CreateHeritage