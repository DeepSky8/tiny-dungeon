import React, { useReducer, useState } from "react";
import { defaultWeaponMastered, weaponsMasteredReducer } from "../../../reducers/weaponReducer";
import {
    loadWeapon,
    updateWDescription,
    updateWTitle,
} from "../../../actions/weaponActions";
import Field from "../../display/FieldPencil";
import { addWeaponObject } from "../../../actions/charActions";
import StyledMenu from "../../display/StyledMenu";

const DisplayMagicRanged = ({ weaponGroup: wG, weapons, char, dispatchChar }) => {
    const [wgName,] = useState(wG.wgTitle);
    const weaponMatch = (char.weaponObjects.find(wO => wO.wType === wG.wgType))
    const [newWeapon, dispatchNewWeapon] = useReducer(weaponsMasteredReducer, (weaponMatch === undefined ? defaultWeaponMastered : weaponMatch))
    const [show, setShow] = useState(false)

    const magicAttack = {
        wID: `custom${wG.wgType}`,
        wCharID: char.charID,
        wType: wG.wgType,       // Corresponds to weaponGroup letter
        wTitle: '',             // User-defined text
        wDescription: '',       // User-defined text
        wDepletion: 99,          // Interact with depletion counters in later update, set initial depletion counters by wType object
        wHTrait: wG.wgHTrait,   // Set by Heritage
        wTrait: wG.wgTrait,     // Set by Trait
    }

    const handleSaveWeapon = (weapon = newWeapon) => {
        if (weapon.wTitle.length > 0 && weapon.wDescription.length > 0) {
            dispatchChar(addWeaponObject(weapon))
        }
    }

    const rangeName = (range) => {
        switch (range) {
            case 'c':
                return 'Close';
            case 'n':
                return 'Near';
            case 'f':
                return 'Far';
            default:
                break;
        }
    }

    const selectWeapon = (weapon) => {
        if (weapons.map(weapon => weapon.wID).includes(weapon.wID)) {
            dispatchNewWeapon(loadWeapon(weapon))
        } else if (weapon.wID === magicAttack.wID) {
            dispatchNewWeapon(loadWeapon(magicAttack))
        }
        handleSaveWeapon(weapon)
    }

    return (
        <div className="displayWeapon__container">
            <div
                className="displayWeapon__heading--clickable"
                onClick={() => {
                    setShow(!show)
                }}
            >
                <div
                    className="displayWeapon__heading--title"
                >
                    {wgName}
                </div>
            </div>

            <div className="displayWeapon__container--body">
                {show &&
                    <div className="displayWeapon__container--pick">

                        {
                            !wG.wgHTrait
                            &&
                            <StyledMenu
                                menuID={'weaponMenu'}
                                selectStatement={'--Select Magical Attack--'}
                                missingTitle={'Add your own'}
                                array={weapons.filter(weapon => !weapon.wHTrait).concat([magicAttack])}
                                arrayIDRef={'wID'}
                                arrayTitleRef={'wTitle'}
                                state={newWeapon}
                                stateIDRef={'wID'}
                                onSelection={selectWeapon}
                            />
                        }

                        {
                            wG.wgHTrait
                            &&
                            <div className="sMenu__container">
                                <div className="sMenu__button">
                                    {newWeapon.wTitle}
                                </div>
                            </div>
                        }

                        {newWeapon.wID &&
                            <div className="displayWeapon__container--edit">
                                {
                                    !weapons.map(weapon => weapon.wID).includes(newWeapon.wID)
                                    &&
                                    <Field
                                        label={'Attack Name'}
                                        id={'title'}
                                        type={'text'}
                                        placeholder="Stun Spore"
                                        value={newWeapon.wTitle}
                                        change={(e) => {
                                            dispatchNewWeapon(updateWTitle(e.target.value))
                                        }}
                                        blur={() => {
                                            handleSaveWeapon()
                                        }}
                                        theme={''}
                                    />
                                }
                                <div className="displayWeapon__container--spacer">
                                    <Field
                                        label={'Description'}
                                        id={'description'}
                                        type={'textarea'}
                                        placeholder="What does it look like?"
                                        value={newWeapon.wDescription}
                                        change={(e) => {
                                            dispatchNewWeapon(updateWDescription(e.target.value))
                                        }}
                                        blur={() => {
                                            handleSaveWeapon()
                                        }}
                                        theme={''}
                                    />

                                    <div className="clickOpen__text--reminder">
                                        Tap text to edit
                                    </div>

                                    <div className="displayWeapon__container--range">
                                        <div className="displayWeapon__range--regular">
                                            <div className="displayWeapon__range--title">
                                                Normal Attack Range:
                                            </div>

                                            <ul className="displayWeapon__range--body">
                                                {wG.wgRangeIDs.map((range) => {
                                                    return (
                                                        <li
                                                            key={range + Math.random()}
                                                        >
                                                            {rangeName(range)}
                                                        </li>
                                                    )
                                                })}
                                            </ul>

                                        </div>
                                        {
                                            wG.wgDisRangeIDs
                                            &&
                                            (
                                                <div className="displayWeapon__range--disadvantage">
                                                    <div className="displayWeapon__range--title">
                                                        Disadvantaged Range:
                                                    </div>

                                                    <ul className="displayWeapon__range--body">
                                                        {wG.wgDisRangeIDs.map((range) => {
                                                            return (
                                                                <li
                                                                    key={range + Math.random()}
                                                                >
                                                                    {rangeName(range)}
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                        <hr className="hr__brown" />
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayMagicRanged