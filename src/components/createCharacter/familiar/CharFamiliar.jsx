import React, { useEffect, useReducer } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useOutletContext } from "react-router";
import { defaultFamiliar, familiarReducer } from "../../../reducers/familiarReducer";
import Field from "../../display/Field";
import DisplayRational from "../DisplayRational";
import {
    loadFamiliar,
    updateFCharID,
    updateFDescription,
    updateFID,
    updateFName
} from "../../../actions/familiarActions";
import { updateFamiliarID } from "../../../actions/charActions";


const CharFamiliar = () => {
    const [char, dispatchChar] = useOutletContext();
    const [localFamiliar, setLocalFamiliar] = useLocalStorageState('familiar', { defaultValue: defaultFamiliar })
    const [familiar, dispatchFamiliar] = useReducer(familiarReducer, localFamiliar)

    const handleSaveFamiliar = () => {
        console.log('familiar', familiar)
        dispatchChar(updateFamiliarID(familiar.fID))
        setLocalFamiliar(familiar)
    }

    return (
        <div className="charFamiliar__container">
            <Field
                label={'Familiar Name: '}
                id={`name` + familiar.fID}
                type={'text'}
                value={familiar.fName}
                change={(e) => {
                    dispatchFamiliar(updateFName(e.target.value))
                }}
                blur={() => {
                    handleSaveFamiliar()
                }}
                theme={'title'}
                placeholder={'Django?'}
            />
            <Field
                label={'Description: '}
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
            <DisplayRational />
        </div>
    )
}

export default CharFamiliar