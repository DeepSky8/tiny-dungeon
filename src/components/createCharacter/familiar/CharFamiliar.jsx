import React, { useEffect, useReducer } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useOutletContext, useParams } from "react-router";
import { defaultFamiliar, familiarReducer } from "../../../reducers/familiarReducer";
import Field from "../../display/FieldPencil";
import DisplayRational from "../DisplayRational";
import {
    loadFamiliar,
    updateFDescription,
    updateFName
} from "../../../actions/familiarActions";
import { loadChar, startSaveFamiliar, updateFamiliar } from "../../../actions/charActions";
import { charReducer, defaultChar } from "../../../reducers/charReducer";
import { auth } from "../../../api/firebase";


const CharFamiliar = () => {
    const { charID } = useParams();
    // const [char, dispatchChar] = useOutletContext();
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)
    // const [localFamiliar, setLocalFamiliar] = useLocalStorageState('familiar', { defaultValue: defaultFamiliar })
    const [familiar, dispatchFamiliar] = useReducer(familiarReducer, defaultFamiliar)

    useEffect(() => {
        if (charID && charID !== 0) {
            onValue(ref(db, `characters/${charID}/familiar`), snapshot => {

                if (
                    snapshot.exists()
                    &&
                    snapshot.val().fCharID === auth.currentUser.uid
                ) {
                    // dispatchChar(loadChar(snapshot.val()))
                    dispatchFamiliar(loadFamiliar(snapshot.val()))
                }

            })
        }

        return (() => {

            if (charID && charID !== 0) {
                off(ref(db, `characters/${charID}/familiar`))
            }
        })
    }, [charID])

    const handleSaveFamiliar = () => {
        // if (familiar.fID === 0 && (familiar.fName || familiar.fDescription)) {

        // }
        const updatedFamiliar = { ...familiar, fID: charID, fCharID: charID }
        startSaveFamiliar({ uid: auth.currentUser.uid, charID: charID, familiar: updatedFamiliar })

        // dispatchChar(updateFamiliarID(familiar.fID))
        // setLocalFamiliar(familiar)
    }

    // useEffect(() => {
    //     if (familiar.fName && familiar.fDescription) {
    //         handleSaveFamiliar()
    //     }
    // }, [])

    return (
        <div className="charFamiliar__container">
            <div className="newC__title centered bold">
                Familiar
            </div>
            <div className="fieldContainer">
                <Field
                    label={'Name'}
                    id={`name` + familiar.fCharID}
                    type={'text'}
                    value={familiar.fName}
                    change={(e) => {
                        dispatchFamiliar(updateFName(e.target.value))
                    }}
                    blur={() => {
                        handleSaveFamiliar()
                    }}
                    theme={'title'}
                    placeholder={'Django'}
                />
                <Field
                    label={'Description'}
                    id={`description` + familiar.fCharID}
                    type={'textarea'}
                    value={familiar.fDescription}
                    change={(e) => {
                        dispatchFamiliar(updateFDescription(e.target.value))
                    }}
                    blur={() => {
                        handleSaveFamiliar()
                    }}
                    theme={''}
                    placeholder={'A feline-shaped shadow, surprisingly frisky'}
                />
            </div>

            <DisplayRational />
        </div>
    )
}

export default CharFamiliar