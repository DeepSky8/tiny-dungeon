import React, { useReducer, useState } from "react";
import { defaultWeaponMastered, weaponsMasteredReducer } from "../../reducers/weaponReducer";
import { updateWDescription } from "../../actions/weaponActions";
import Field from "../display/FieldPencil";
import { addWeaponObject } from "../../actions/charActions";
import ClickDescriptionCentered from "../display/ClickDescriptionCentered";

const DisplayWeapon = ({ weaponGroup: wG, char, dispatchChar }) => {
    const [wgName,] = useState(wG.wgTitle);
    const weaponMatch = (char.weaponObjects.find(wO => wO.wType === wG.wgType))
    const [weapon, dispatchWeapon] = useReducer(weaponsMasteredReducer, (weaponMatch === undefined ? defaultWeaponMastered : weaponMatch))
    const [show, setShow] = useState(false)

    const handleSaveWeapon = () => {
        dispatchChar(addWeaponObject(weapon))
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

    return (
        <div className="displayWeapon__container">
            <div className="displayWeapon__heading--clickable"
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
                    <div className="displayWeapon__container--spacer">
                        <div className="displayWeapon__container--title">
                            <Field
                                label={''}
                                id={'title'}
                                type={'text'}
                                placeholder="Weapon Name"
                                value={weapon.wTitle}
                                change={(e) => {
                                    dispatchWeapon(updateWTitle(e.target.value))
                                }}
                                blur={() => {
                                    handleSaveWeapon()
                                }}
                                theme={'bold'}
                            />


                            <div className="displayWeapon__container--description">
                                <Field
                                    label={''}
                                    id={'description'}
                                    type={'textarea'}
                                    placeholder="What does it look like?"
                                    value={weapon.wDescription}
                                    change={(e) => {
                                        dispatchWeapon(updateWDescription(e.target.value))
                                    }}
                                    blur={() => {
                                        handleSaveWeapon()
                                    }}
                                    theme={''}
                                />
                            </div>

                            <div className="centered">{wG.wgDamage} damage</div>
                            <div className="centered">Max {wG.wgAttackTurn} attacks/turn</div>

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

                        <div className="displayWeapon__container--weaponGroup">
                            <ClickDescriptionCentered
                                title={`About`}
                                description={wG.wgDescription}
                            />
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default DisplayWeapon

// {
//     !weapons.map(weapon => weapon.wID).includes(weapon.wID)
//     &&
//     <Field
//         label={'Weapon Name: '}
//         id={'title'}
//         type={'text'}
//         placeholder="Dagger? Poleaxe?"
//         value={weapon.wTitle}
//         change={(e) => {
//             dispatchWeapon(updateWTitle(e.target.value))
//         }}
//         blur={() => {
//             handleSaveWeapon()
//         }}
//         theme={''}
//     />
// }