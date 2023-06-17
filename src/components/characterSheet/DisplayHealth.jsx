import React from "react";
import {
    decreaseCurrentArmor,
    decreaseCurrentHP,
    increaseCurrentArmor,
    increaseCurrentHP,
    setMaxArmor
} from "../../actions/charActions";

const DisplayHealth = ({ char, dispatchChar }) => {
    const { currentHP, hHP, tHP, maxArmor, currentArmor } = char
    const maxHP = parseInt(hHP) + parseInt(tHP)
    const lostHP = maxHP - parseInt(currentHP)
    const lostArmor = parseInt(maxArmor) - parseInt(currentArmor)


    const displayHearts = (number, iconName, cssFlag) => {
        const elements = [];
        for (let i = 1; i <= number; i++) {
            elements.push(
                <span
                    key={i}
                    className={`material-symbols-outlined ${cssFlag}`}>
                    {iconName}
                </span>
            );
        }
        return elements;
    }

    const reduceArmor = () => {
        if (currentArmor - 1 > -1) { dispatchChar(decreaseCurrentArmor()) }
        if (currentArmor % 3 === 0) {
            dispatchChar(setMaxArmor(char.maxArmor - 3))
        } else if (currentArmor - 1 <= -1) { dispatchChar(setMaxArmor(0)) }
    }

    const increaseArmor = () => {
        if (currentArmor + 1 <= maxArmor) { dispatchChar(increaseCurrentArmor()) }
        if (currentArmor + 1 > maxArmor) { dispatchChar(setMaxArmor(char.maxArmor + 3)) }
    }

    const reduceHP = () => { if (currentHP - 1 > -1) { dispatchChar(decreaseCurrentHP()) } }

    const increaseHP = () => { if (currentHP + 1 <= maxHP) { dispatchChar(increaseCurrentHP()) } }

    return (
        <div className="displayHealth__container">
        <div className="charSheet__display--title centered bold">Health</div>

            <div className="displayHealth__container--section" id="displayHealth__container--armor">
                <div className="displayHealth__container--plusMinus">
                    <label className="displayHealth__armor--label" htmlFor="displayHealth__container--armor">Armor</label>

                    <button
                        onClick={reduceArmor}
                        className="displayHealth__plusMinus--button">
                        <span className="material-symbols-outlined empty" >gpp_bad</span>
                    </button>

                    <button
                        onClick={increaseArmor}
                        className="displayHealth__plusMinus--button">
                        <span className="material-symbols-outlined filled" >add_moderator</span>
                    </button>

                </div>

                <div className="displayHealth__symbols">
                    {displayHearts(currentArmor, 'shield_with_heart', 'filled')}
                    {displayHearts(lostArmor, 'shield_with_heart', 'empty faded')}
                </div>
            </div>

            <div className="displayHealth__container--section" id="displayHealth__container--hp">
                <div className="displayHealth__container--plusMinus">
                    <label className="displayHealth__hp--label" htmlFor="displayHealth__container--hp">Health</label>

                    <button
                        onClick={reduceHP}
                        className="displayHealth__plusMinus--button">
                        <span
                            className="material-symbols-outlined empty" >heart_minus</span>
                    </button>

                    <button
                        onClick={increaseHP}
                        className="displayHealth__plusMinus--button">
                        <span
                            className="material-symbols-outlined filled" >heart_plus</span>
                    </button>

                </div>

                <div className="displayHealth__symbols">
                    {displayHearts(currentHP, 'favorite', 'filled')}
                    {displayHearts(lostHP, 'favorite', 'empty faded')}
                </div>
            </div>



        </div>
    )
}

export default DisplayHealth

// material-symbols-outlined