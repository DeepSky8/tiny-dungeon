import React, { useReducer } from "react";
import Field from "../display/Field";
import Menu from "../display/Menu";
import { defaultWeaponMastered, weaponsMasteredReducer } from "../../reducers/weaponReducer";
import {
    startNewWeaponKey,
    startSaveWeapon,
    updateWDescription,
    updateWHTrait,
    updateWTitle,
    updateWTrait,
    updateWType
} from "../../actions/weaponActions";
import { wgTypes } from "../../objectsArrays/createObjectArrays/weaponGroupObjectArray";



const DisplayWeapon = ({ weaponData }) => {
    const [weapon, dispatchWeapon] = useReducer(weaponsMasteredReducer, weaponData)

    const handleSave = () => {
        startSaveWeapon({ ...weapon })
    }

    return (
        <div className="createWeapon__container">

            <Field
                label={'Weapon Group'}
                id={'wType'}
                type={'text'}
                value={weapon.wType}
                change={(e) => {
                    dispatchWeapon(updateWType(e.target.value))
                }}
                blur={() => {
                    handleSave()

                }}
                theme={''}
            />

            <Field
                label={'Weapon Title'}
                id={'wTitle'}
                type={'text'}
                value={weapon.wTitle}
                change={(e) => {
                    dispatchWeapon(updateWTitle(e.target.value))
                }}
                blur={() => {
                    handleSave()

                }}
                theme={''}
            />

            <Field
                label={'Weapon Description'}
                id={'wDescription'}
                type={'textarea'}
                value={weapon.wDescription}
                change={(e) => {
                    dispatchWeapon(updateWDescription(e.target.value))
                }}
                blur={() => {
                    const formatValue = wGroup.wgDescription.replace(/[\n\r]/gm, ' ');
                    dispatchWeapon(updateWDescription(formatValue))
                }}
                theme={''}
            />

            <Field
                label={'Acquired from Heritage Trait'}
                id={'wHTrait'}
                type={'checkbox'}
                value={weapon.wHTrait}
                change={(e) => {
                    dispatchWeapon(updateWHTrait(e.target.value))
                }}
                blur={() => {
                    handleSave()

                }}
                theme={''}
            />

            <Field
                label={'Acquired from Trait'}
                id={'wTrait'}
                type={'checkbox'}
                value={weapon.wTrait}
                change={(e) => {
                    dispatchWeapon(updateWTrait(e.target.value))
                }}
                blur={() => {
                    handleSave()

                }}
                theme={''}
            />

            <hr />
        </div>
    )
}

export default DisplayWeapon