import React, { useEffect, useReducer, useState } from "react";
import { defaultDisplay, displayReducer } from "../../../reducers/displayReducer";
import {
    closeOne,
    closeThree,
    closeTwo,
    openOne,
    openThree,
    openTwo
} from "../../../actions/displayActions";
import ClickDescription from "../../display/ClickDescription";
import BulletedSelect from "../../display/BulletedSelect";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../../api/firebase";


const DisplayHeritage = ({ heritages, heritageID, dispatchCharHeritageID, hTraitID }) => {
    const {
        hTitle,
        hDescription,
        hPhysical,
        hHP,
        hTraitIDs,
        hImageURL,
        hAltText
    } = heritages.filter(selected => selected.hID === heritageID)[0]
    const [traits, setTraits] = useState([])
    const [show, dispatch] = useReducer(displayReducer, defaultDisplay)
    const clickFor = 'Click for '


    useEffect(() => {
        onValue(ref(db, 'traits'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(trait => {
                    if (trait.val().tHTrait) {
                        tempArray.push(trait.val())
                    }
                })
                setTraits(tempArray)
            }
        }, {
            onlyOnce: true
        })

        return (() => {
            off(ref(db, 'traits'))
        })
    }, [])

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
                    headerText={'Description'}
                    bodyText={hDescription}
                />

                <ClickDescription
                    show={show}
                    dispatch={dispatch}
                    displayKey={'display2'}
                    closeAction={closeTwo}
                    openAction={openTwo}
                    headerText={'Physical Attributes'}
                    bodyText={hPhysical}
                />

                <div
                    className="clickDescription__heading"
                    onClick={() => {
                        show.display3 ?
                            dispatch(closeThree())
                            :
                            dispatch(openThree())
                    }}
                >{show.display3 ? "" : clickFor}Stats</div>

                <div className="clickDescription__container--description">
                    {show.display3 &&
                        <div>
                            <span className="clickDescription--stats">
                                <div>Hit points: {hHP}</div>
                                <div>Heritage Trait:</div>
                            </span>
                            <BulletedSelect
                                objectArray={traits}
                                IDArray={hTraitIDs}
                                IDKey={'tID'}
                                IDTitle={'tTitle'}
                                IDDescription={'tDescription'}
                                selectText={'Select '}
                                dispatchCharHeritageID={dispatchCharHeritageID}
                                selectedHTraitID={hTraitID}
                            />
                        </div>

                    }
                </div>

            </span>

        </div>
    )
}

export default DisplayHeritage


