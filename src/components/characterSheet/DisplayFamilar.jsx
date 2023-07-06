import React, { useEffect, useReducer } from "react";
import useLocalStorageState from "use-local-storage-state";
import Field from "../display/FieldPencil";
import { defaultFamiliar, familiarReducer } from "../../reducers/familiarReducer";
import { updateFDescription, updateFName } from "../../actions/familiarActions";
import DisplayRational from "../createCharacter/DisplayRational";


const DisplayFamiliar = ({ char, dispatchChar }) => {
    const [localFamiliar, setLocalFamiliar] = useLocalStorageState('familiar', { defaultValue: defaultFamiliar })
    const [familiar, dispatchFamiliar] = useReducer(familiarReducer, localFamiliar)

    const handleSaveFamiliar = () => {
        // dispatchChar(updateFamiliarID(familiar.fID))
        // setLocalFamiliar(familiar)
    }

    useEffect(() => {
        if (familiar.fName && familiar.fDescription) {
            handleSaveFamiliar()
        }
    }, [])

    return (
        <div className="displayFamiliar__container">
            <div className="charSheet__display--title centered bold">Familiar</div>
            <div className="fieldContainer">
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
                    theme={'title bold'}
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

            <DisplayRational
                stage="familiar"
            />
        </div>
    )
}

export default DisplayFamiliar