import React, { useReducer, useState } from "react";
import {
    closeOne,
    closeThree,
    closeTwo,
    openOne,
    openThree,
    openTwo
} from "../../actions/displayActions";
import { defaultDisplay, displayReducer } from "../../reducers/displayReducer";
import ClickDescription from "../display/ClickDescription";
import Field from "../display/FieldPencil";
import { updateTrade } from "../../actions/charActions";




const DisplayHeritage = ({ heritage, dispatchChar, trade }) => {
    const {
        hTitle,
        hDescription,
        hPhysical,
        hImageURL,
        hAltText
    } = heritage
    const [show, dispatch] = useReducer(displayReducer, defaultDisplay)
    const [localTrade, setLocalTrade] = useState(trade)

    const handleSaveBackstory = () => {
        dispatchChar(updateTrade(localTrade))
    }

    return (
        <div className="displayHeritage__container">
            <span className="displayHeritage__container--image">
                <img
                    className="displayHeritage__image"
                    src={hImageURL}
                    alt={hAltText}
                />
            </span>

            <span className="displayHeritage__container--text">


                <ClickDescription
                    show={show}
                    dispatch={dispatch}
                    displayKey={'display1'}
                    closeAction={closeOne}
                    openAction={openOne}
                    headerText={'Trade'}
                    bodyText={
                        <div className="displayHeritage__spacer--trade">
                            <Field
                                label={''}
                                id={`trade`}
                                type={'textarea'}
                                value={localTrade}
                                change={(e) => {
                                    setLocalTrade(e.target.value)
                                }}
                                blur={() => {
                                    handleSaveBackstory()
                                }}
                                theme={''}
                                placeholder={'Growing up, your character was exposed to a Family Trade. They picked up some knowledge of this craft and gain Advantage in situations where they can put it to use.'}
                            />
                        </div>
                    }
                />

                <ClickDescription
                    show={show}
                    dispatch={dispatch}
                    displayKey={'display2'}
                    closeAction={closeTwo}
                    openAction={openTwo}
                    headerText={'Description'}
                    bodyText={hDescription}
                />

                <ClickDescription
                    show={show}
                    dispatch={dispatch}
                    displayKey={'display3'}
                    closeAction={closeThree}
                    openAction={openThree}
                    headerText={'Physical Attributes'}
                    bodyText={hPhysical}
                />


            </span>

        </div>
    )
}

export default DisplayHeritage

// <ClickDescription
// show={show}
// dispatch={dispatch}
// displayKey={'display1'}
// closeAction={closeOne}
// openAction={openOne}
// headerText={'Trade'}
// bodyText={trade}
// />