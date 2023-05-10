import React, { useEffect, useReducer } from "react";
import { defaultTrait, traitReducer } from "../../reducers/traitReducer";
import fieldPopulator from "../../functions/fieldPopulator";
import traitObjectArray from "../../objectsArrays/createObjectArrays/traitObjectArray";
import { loadTrait, startSaveTrait } from "../../actions/traitActions";
import Field from "../createItems/Field";

const DisplayTrait = ({ traitData }) => {
    const [traitState, dispatchTraitState] = useReducer(traitReducer, defaultTrait)

    useEffect(() => {
        dispatchTraitState(loadTrait(traitData))
    }, [])

    const fieldArray = fieldPopulator(
        {
            state: traitState,
            dispatchState: dispatchTraitState,
            objectArray: traitObjectArray
        }
    )

    const saveHandler = () => {
        startSaveTrait({ ...traitState })
    }

    return (
        <div className="displayTrait__container">
            {traitState.tID !== undefined &&
                fieldArray.map((fieldObject) => {
                    return (
                        <Field
                            key={fieldObject.id}
                            {...fieldObject}
                            theme={''}
                            blur={saveHandler}
                        />
                    )
                })}
            <hr />
        </div>
    )
}

export default DisplayTrait