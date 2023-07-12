import React, { useEffect, useReducer } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useOutletContext } from "react-router";
import { defaultFamiliar, familiarReducer } from "../../../reducers/familiarReducer";
import Field from "../../display/FieldPencil";
import DisplayRational from "../DisplayRational";
import {
    updateFDescription,
    updateFID,
    updateFName
} from "../../../actions/familiarActions";
import { updateFamiliar } from "../../../actions/charActions";
// import { updateFamiliarID } from "../../../actions/charActions";


const CharFamiliar = () => {
    const [char, dispatchChar] = useOutletContext();
    // const [localChar, setLocalChar] = useLocalStorageState('localChar')

    // const [localFamiliar, setLocalFamiliar] = useLocalStorageState('familiar', { defaultValue: defaultFamiliar })
    const [familiar, dispatchFamiliar] = useReducer(familiarReducer, char.familiar)

    const handleSaveFamiliar = () => {
        dispatchChar(updateFamiliar(familiar))
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
                    id={`name` + familiar.fID}
                    type={'text'}
                    value={familiar.fName}
                    change={(e) => {
                        dispatchFamiliar(updateFName(e.target.value));
                    }}
                    blur={() => {
                        handleSaveFamiliar()
                    }}
                    theme={'title'}
                    placeholder={'Django'}
                />
                <Field
                    label={'Description'}
                    id={`description` + familiar.fID}
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