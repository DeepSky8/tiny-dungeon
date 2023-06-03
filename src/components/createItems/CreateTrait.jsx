import React, { useReducer } from "react";
import { defaultTrait, traitReducer } from "../../reducers/traitReducer";
import fieldPopulator from "../../functions/fieldPopulator";
import traitObjectArray from "../../objectsArrays/createObjectArrays/traitObjectArray";
import Field from "../display/Field";
import { loadTrait, startNewTraitKey } from "../../actions/traitActions";

const CreateTrait = () => {
    const [trait, dispatchTrait] = useReducer(traitReducer, defaultTrait)
    const fieldArray = fieldPopulator({ state: trait, dispatchState: dispatchTrait, objectArray: traitObjectArray })

    const saveHandler = () => {
        startNewTraitKey({ traitData: trait })
            .then(() => {
                dispatchTrait(loadTrait(defaultTrait))
            })
    }

    return (
        <div className="createTrait__container">
            {fieldArray.map((fieldObject) => {
                return (
                    <Field
                        key={fieldObject.id}
                        {...fieldObject}
                        theme={''}
                    />
                )
            })}
            <button
                onClick={saveHandler}
            >Save</button>

        </div>
    )
}

export default CreateTrait