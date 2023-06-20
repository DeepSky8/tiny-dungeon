import React, { useReducer } from "react";
import Field from "../display/Field";
import { defaultScroll, scrollReducer } from "../../reducers/scrollReducer";
import { clearScroll, startNewScrollKey, updateSDescription, updateSTitle } from "../../actions/scrollActions";

const BuildScroll = () => {
    const [scroll, dispatchScroll] = useReducer(scrollReducer, defaultScroll)

    const handleSave = () => {
        startNewScrollKey({ scrollData: scroll })
            .then(
                dispatchScroll(clearScroll())
            )
    }

    return (
        <div className="createScroll__container">
            <Field
                label={'Scroll Name'}
                id={'sTitle'}
                type={'text'}
                value={scroll.sTitle}
                change={(e) => {
                    dispatchScroll(updateSTitle(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <Field
                label={'Description'}
                id={'sDescription'}
                type={'textarea'}
                value={scroll.sDescription}
                change={(e) => {
                    dispatchScroll(updateSDescription(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <button
                onClick={handleSave}
            >Save</button>
        </div>
    )
}

export default BuildScroll