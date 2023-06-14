import React from "react";
import { defaultDisplay, displayReducer } from "../../reducers/displayReducer";
import ModuleDisplay from "./ModuleDisplay";
import { useReducer } from "react";

const Display = ({ menuObjects, fadeArray = [], maxPerRow = 3, theme = '' }) => {
    const [show, dispatchShow] = useReducer(displayReducer, defaultDisplay)
    const splitMenuObjects = []

    
    if (menuObjects.length > maxPerRow) {
        for (let index = 0; index < menuObjects.length; index += maxPerRow) {
            const row = menuObjects.slice(index, index + maxPerRow)
            splitMenuObjects.push(row)
        }
    } else {
        splitMenuObjects.push(menuObjects)
    }

    const accessible = (object) => {
        return !fadeArray.includes(object.title)
    }

    return (
        <div className="moduleHeader__container">
            {
                splitMenuObjects.map(objectRow => {
                    const spacing = objectRow.length === maxPerRow ? 'space-between' : 'space-around'
                    return (
                        <div
                            key={Math.random()}
                            className={`moduleHeader__row ${spacing}`}
                        >
                            {
                                objectRow.map(object => {
                                    return (
                                        <span
                                            key={object.displayKey}
                                            className={(accessible(object) ? '' : 'fade') + `${theme} moduleHeader__button ` + show[`${object.displayKey}`]}
                                            onClick={() => {
                                                if (accessible(object)) {
                                                    show[object.displayKey] ?
                                                        dispatchShow(object.close())
                                                        :
                                                        dispatchShow(object.open())
                                                }
                                            }}>{object.title}</span>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <hr className="hr__brown" />

            {
                menuObjects.map(object => {
                    return (
                        <ModuleDisplay
                            key={object.displayKey}
                            jsx={object.display}
                            visibleState={show[`${object.displayKey}`]}
                        />

                    )
                })
            }

        </div>
    )
}

export default Display