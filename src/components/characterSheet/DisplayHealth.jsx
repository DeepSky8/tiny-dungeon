import React, { useReducer } from "react";
import {
    decreaseCurrentArmor,
    decreaseCurrentHP,
    increaseCurrentArmor,
    increaseCurrentHP,
    setMaxArmor,
    startUpdateCurrentArmor,
    startUpdateCurrentHP,
    startUpdateMaxArmor
} from "../../actions/charActions";
import { charReducer } from "../../reducers/charReducer";
import { auth } from "../../api/firebase";

const DisplayHealth = ({ char, dispatchChar }) => {
    // const [local, dispatchLocal] = useReducer(charReducer, char)
    const { currentHP, hHP, tHP, maxArmor, currentArmor } = char
    const maxHP = parseInt(hHP) + parseInt(tHP)
    const lostHP = maxHP - parseInt(currentHP)
    const lostArmor = parseInt(maxArmor) - parseInt(currentArmor)

    // const decreaseCurrentArmor = () => {

    // }


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
        if (currentArmor - 1 >= 0) {
            // dispatchChar(decreaseCurrentArmor()) 
            startUpdateCurrentArmor({ uid: auth.currentUser.uid, charData: char, newArmor: (currentArmor - 1) })
        }
        if (currentArmor % 3 === 0 && lostArmor == 3) {
            // dispatchChar(setMaxArmor(char.maxArmor - 3))
            startUpdateMaxArmor({ uid: auth.currentUser.uid, charData: char, newArmor: (maxArmor - 3) })
        } else if (currentArmor - 1 <= 0) {
            // dispatchChar(setMaxArmor(0)) 
            startUpdateMaxArmor({ uid: auth.currentUser.uid, charData: char, newArmor: 0 })
        }
    }

    const increaseArmor = () => {
        if (currentArmor + 1 <= maxArmor) {
            // dispatchChar(increaseCurrentArmor()) 
            startUpdateCurrentArmor({ uid: auth.currentUser.uid, charData: char, newArmor: (currentArmor + 1) })
        }
        if (currentArmor + 1 > maxArmor) {
            // dispatchChar(setMaxArmor(char.maxArmor + 3)) 
            startUpdateMaxArmor({ uid: auth.currentUser.uid, charData: char, newArmor: (maxArmor + 3) })

        }
    }

    const reduceHP = () => {
        if (currentHP - 1 > -1) {
            // dispatchChar(decreaseCurrentHP()) 
            startUpdateCurrentHP({ uid: auth.currentUser.uid, charData: char, newHP: (currentHP - 1) })
        }
    }

    const increaseHP = () => {
        if (currentHP + 1 <= maxHP) {
            startUpdateCurrentHP({ uid: auth.currentUser.uid, charData: char, newHP: (currentHP + 1) })
        }
    }

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