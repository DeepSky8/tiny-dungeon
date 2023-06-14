import React from "react";
import { updateHTraitID } from "../../actions/charActions";

const BulletedSelect = (
    {
        objectArray,    // Select from these list items
        IDArray,        // Match on these IDs
        IDKey,          // What is the object ID identifier (hID, charID, etc.)
        IDTitle,        // What is the address of the title in the ID (hTitle, charName)
        IDDescription,  // What is the address of the description (hDescription, tDescription)
        selectedText,   // When selected, what is the button text modifier?
        unselectedText, // When unselected, what is the button text modifier?
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
                                            </div>
                                        </div>
                                        <div className="bulletedSelect__container--button">
                                            <button
                                                className={`bulletedSelect__button ${notSelected}`}
                                                onClick={() => {
                                                    dispatchCharHeritageID(
                                                        updateHTraitID(
                                                            object[`${IDKey}`]))
                                                }}
                                            >
                                                {
                                                    (!notSelected)
                                                        ?
                                                        (object[`${IDTitle}`] + selectedText)
                                                        :
                                                        (unselectedText + object[`${IDTitle}`])
                                                }
                                            </button>
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