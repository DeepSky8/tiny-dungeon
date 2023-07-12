import React, { useReducer } from "react";
import Field from "../display/FieldPencil";
import { familiarReducer } from "../../reducers/familiarReducer";
import { updateFDescription, updateFName } from "../../actions/familiarActions";
import DisplayRational from "../createCharacter/DisplayRational";
import { startUpdateFamiliar } from "../../actions/charActions";
import { auth } from "../../api/firebase";


const DisplayFamiliar = ({ char }) => {
    const [familiar, dispatchFamiliar] = useReducer(familiarReducer, char.familiar)

    const handleSaveFamiliar = () => {
        startUpdateFamiliar({ uid: auth.currentUser.uid, charData: { ...char, familiar: { ...familiar } } })
    }

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