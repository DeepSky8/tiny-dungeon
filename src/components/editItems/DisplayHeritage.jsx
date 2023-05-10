import React, { useReducer } from "react";
import { heritageReducer } from "../../reducers/heritageReducer";
import {
    removeHTraitID,
    startSaveHeritage,
    updateHDescription,
    updateHHP,
    updateHPhysical,
    updateHTitle,
    updateHTraitIDs
} from "../../actions/heritageActions";
import Field from "../createItems/Field";
import Menu from "../createItems/Menu";

const DisplayHeritage = ({ heritageData, hTraitData }) => {
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, heritageData)

    const handleSave = () => {
        startSaveHeritage({ ...heritage })
    }

    const handleRemoveHTrait = (id) => {
        dispatchHeritage(removeHTraitID(id))
    }

    return (
        <div className="displayHeritage__container">
            <Field
                label={'Heritage Title'}
                id={'hTitle'}
                type={'text'}
                value={heritage.hTitle}
                change={(e) => {
                    dispatchHeritage(updateHTitle(e.target.value))
                }}
                blur={handleSave}
                theme={''}
            />

            <Field
                label={'Heritage Description'}
                id={'hDescription'}
                type={'textarea'}
                value={heritage.hDescription}
                change={(e) => {
                    const formatValue = e.target.value.replace(/[\n\r]/gm, ' ');
                    dispatchHeritage(updateHDescription(formatValue))
                }}
                blur={handleSave}
                theme={''}
            />

            <Field
                label={'Physical Description'}
                id={'hPhysical'}
                type={'textarea'}
                value={heritage.hPhysical}
                change={(e) => {
                    const formatValue = e.target.value.replace(/[\n\r]/gm, ' ');
                    dispatchHeritage(updateHPhysical(formatValue))
                }}
                blur={handleSave}
                theme={''}
            />

            <Field
                label={'Heritage HP'}
                id={'hHP'}
                type={'number'}
                value={heritage.hHP}
                change={(e) => {
                    dispatchHeritage(updateHHP(e.target.value))
                }}
                blur={handleSave}
                theme={''}
            />

            <Menu
                label={'Heritage Trait'}
                id={'hTraitID'}
                change={(e) => {
                    dispatchHeritage(updateHTraitIDs(e.target.value))
                }}
                blur={handleSave}
                theme={''}
                array={hTraitData}
            />

            {
                heritage.hTraitIDs.length > 0 &&
                <ul>
                    {
                        hTraitData
                            .filter(htObject =>
                                heritage
                                    .hTraitIDs
                                    .includes(htObject.tID)
                            ).map(
                                hTrait => {
                                    return (
                                        <li
                                            key={hTrait.tID}
                                        >
                                            {hTrait.tTitle} - {hTrait.tDescription}
                                            <button
                                                onClick={() => {
                                                    handleRemoveHTrait(hTrait.tID)
                                                }}
                                            >Remove</button>
                                        </li>
                                    )

                                })
                    }
                </ul>
            }

            <button
                onClick={handleSave}
            >Save</button>

        </div>
    )
}

export default DisplayHeritage

// <Field
// label={''}
// id={ }
// type={ }
// value={ }
// change={ }
// blur={ }
// theme={''}
// />

// <Field
// label={'Heritage Name'}
// id={'hName'}
// type={'text'}
// value={heritage.hName}
// change={(e) => {
//     dispatchHeritage(updateHName(e.target.value))
// }}
// blur={''}
// theme={''}
// />