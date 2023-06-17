import React, { useState } from "react";
import DisplayRational from "../DisplayRational";
import Field from "../../display/FieldPencil";
import { useOutletContext } from "react-router";
import { updateBelief, updateCharName, updateTrade } from "../../../actions/charActions";

const CharBackstory = () => {
    const [char, dispatchChar] = useOutletContext();
    const [nameState, setName] = useState(char.charName);
    const [trade, setTrade] = useState(char.trade);
    const [belief, setBelief] = useState(char.belief);

    const placeholder = {
        name: 'Character Name',
        character: 'Character',
        belief: "'s personal creed",
        trade: "'s family trade",
    }

    const handleSaveBackstory = () => {
        dispatchChar(updateCharName(nameState))
        dispatchChar(updateTrade(trade))
        dispatchChar(updateBelief(belief))
    }

    return (
        <div className="charBackstory__container">

            <div className="newC__title centered bold">
                Backstory
            </div>
            <div className="fieldContainer">
                <Field
                    label={placeholder.name}
                    id={`name` + char.charID}
                    type={'text'}
                    value={nameState}
                    change={(e) => {
                        setName(e.target.value)
                    }}
                    blur={() => {
                        handleSaveBackstory()
                    }}
                    theme={''}
                    placeholder={placeholder.name}
                />

                <Field
                    label={'Belief'}
                    id={`belief` + char.charID}
                    type={'textarea'}
                    value={belief}
                    change={(e) => {
                        setBelief(e.target.value)
                    }}
                    blur={() => {
                        handleSaveBackstory()
                    }}
                    theme={''}
                    placeholder={(char.charName ? char.charName : placeholder.character) + placeholder.belief}
                />

                <Field
                    label={'Family Trade'}
                    id={`trade` + char.charID}
                    type={'textarea'}
                    value={trade}
                    change={(e) => {
                        setTrade(e.target.value)
                    }}
                    blur={() => {
                        handleSaveBackstory()
                    }}
                    theme={''}
                    placeholder={'See below for details'}
                />
            </div>

            <DisplayRational />
        </div>
    )
}

export default CharBackstory