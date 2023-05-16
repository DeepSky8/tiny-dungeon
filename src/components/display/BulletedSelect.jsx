import React, { useEffect } from "react";
import { updateHTraitID } from "../../actions/charActions";

const BulletedSelect = (
    {
        objectArray,    // Select from these list items
        IDArray,        // Match on these IDs
        IDKey,          // What is the object ID identifier (hID, charID, etc.)
        IDTitle,        // What is the address of the title in the ID (hTitle, charName)
        IDDescription,  // what is the address of the description (hDescription, tDescription)
        selectText,     // What does the button say?
        dispatchCharHeritageID,   // function passed down to choose a heritage ID
        selectedHTraitID,          // char.field passed down to display chosen heritage ID
    }
) => {
    const canSelect = IDArray.length > 1
    const filteredArray = objectArray.filter(object => IDArray.includes(object[`${IDKey}`]))

    return (

        <div className="bulletedSelect__container">
            {
                filteredArray.map(
                    object => {

                        const notSelected = object[`${IDKey}`] !== selectedHTraitID ? 'notSelected' : ''
                        return (
                            <div
                                key={object[`${IDKey}`]}
                            >
                                {!canSelect &&
                                    <div className="bulletedSelect__container--text">
                                        <div className="bulletedSelect__header">
                                            {object[`${IDTitle}`]}
                                        </div>
                                        <div>
                                            {object[`${IDDescription}`]}
                                        </div>
                                    </div>
                                }

                                {canSelect &&

                                    <div className="bulletedSelect__container--display">
                                        <div className={`bulletedSelect__container--text ${notSelected}`}>
                                            <div className="bulletedSelect__header">
                                                {object[`${IDTitle}`]}
                                            </div>
                                            <div>
                                                {object[`${IDDescription}`]}
                                            </div>                                        </div>
                                        <div className="bulletedSelect__container--button">
                                            <button
                                                className="bulletedSelect__button"
                                                onClick={() => {
                                                    dispatchCharHeritageID(
                                                        updateHTraitID(
                                                            object[`${IDKey}`]))
                                                }}
                                            >{selectText + object[`${IDTitle}`]}</button>
                                        </div>
                                    </div>

                                }

                            </div>
                        )

                    })
            }
        </div>

    )
}

export default BulletedSelect