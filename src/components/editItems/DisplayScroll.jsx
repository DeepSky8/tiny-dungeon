import React, { useReducer } from "react";
import Field from "../display/Field";
import { scrollReducer } from "../../reducers/scrollReducer";
import { startSaveScroll, updateSAmount, updateSDescription, updateSTitle } from "../../actions/scrollActions";

const DisplayScroll = ({ scrollData }) => {
    const [scroll, dispatchScroll] = useReducer(scrollReducer, scrollData)

    const handleSave = () => {
        startSaveScroll(scroll)
    }

    return (
        <div className="displayScrolls__container--create">
            <Field
                label={'Scroll Name'}
                id={'sTitle'}
                type={'text'}
                value={scroll.sTitle}
                change={(e) => {
                    dispatchScroll(updateSTitle(e.target.value))
                }}
                blur={() => {
                    handleSave()
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
                    handleSave()
                }}
                theme={''}
            />

            <Field
                label={'Initial Count'}
                id={'sAmount'}
                type={'number'}
                value={scroll.sAmount}
                change={(e) => {
                    dispatchScroll(updateSAmount(parseInt(e.target.value)))
                }}
                blur={() => {
                    handleSave()
                }}
                theme={''}
            />

            <hr />
        </div>
    )
}

export default DisplayScroll