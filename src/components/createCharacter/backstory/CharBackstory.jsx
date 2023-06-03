import React, { useState } from "react";
import DisplayRational from "../DisplayRational";
import Field from "../../display/Field";
import { useOutletContext } from "react-router";
import { updateBelief, updateCharName, updateTrade } from "../../../actions/charActions";

const CharBackstory = () => {
    const [char, dispatchChar] = useOutletContext();
    const [nameState, setName] = useState('');
    const [trade, setTrade] = useState('');
    const [belief, setBelief] = useState('');

    const handleSaveBackstory = () => {
        dispatchChar(updateCharName(nameState))
        dispatchChar(updateTrade(trade))
        dispatchChar(updateBelief(belief))
    }

    return (
        <div className="charBackstory__container">

            <Field
                label={'Character Name: '}
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
                placeholder={'Susie?'}
            />

            <Field
                label={'Trade: '}
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
                placeholder={'"Trade" explained below'}
            />

            <Field
                label={'Belief: '}
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
                placeholder={`There's no such thing as a free lunch`}
            />

            <DisplayRational />
        </div>
    )
}

export default CharBackstory