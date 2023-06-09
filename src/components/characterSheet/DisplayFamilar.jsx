import React, { useEffect, useReducer } from "react";
import useLocalStorageState from "use-local-storage-state";
import Field from "../display/FieldPencil";
import { updateFamiliarID } from "../../actions/charActions";
import { defaultFamiliar, familiarReducer } from "../../reducers/familiarReducer";
import { updateFDescription, updateFName } from "../../actions/familiarActions";


const DisplayFamiliar = ({ char, dispatchChar }) => {
    const [localFamiliar, setLocalFamiliar] = useLocalStorageState('familiar', { defaultValue: defaultFamiliar })
    const [familiar, dispatchFamiliar] = useReducer(familiarReducer, localFamiliar)

    const handleSaveFamiliar = () => {
        dispatchChar(updateFamiliarID(familiar.fID))
        setLocalFamiliar(familiar)
    }

    useEffect(() => {
        if (familiar.fName && familiar.fDescription) {
            handleSaveFamiliar()
        }
    }, [])

    return (
        <div className="charFamiliar__container">
            <Field
                label={''}
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
                placeholder={'Django'}
            />

            <Field
                label={''}
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
    )
}

export default DisplayFamiliar