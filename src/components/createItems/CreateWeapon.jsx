import React, { useReducer } from "react";
import Field from "../display/Field";
import Menu from "../display/Menu";
import { defaultWeaponMastered, weaponsMasteredReducer } from "../../reducers/weaponReducer";
import {
    clearWeapon,
    startNewWeaponKey,
    updateWDescription,
    updateWHTrait,
    updateWTitle,
    updateWTrait,
    updateWType
} from "../../actions/weaponActions";
import { wgTypes } from "../../objectsArrays/createObjectArrays/weaponGroupObjectArray";



const CreateWeapon = () => {
    const [weapon, dispatchWeapon] = useReducer(weaponsMasteredReducer, defaultWeaponMastered)

    const handleSave = () => {
        startNewWeaponKey({ weaponData: weapon })
            .then(
                dispatchWeapon(clearWeapon())
            )
    }

    return (
        <div className="createWeapon__container">

            <Menu
                label={'Weapon Group Type'}
                id={'wType'}
                change={(e) => {
                    dispatchWeapon(updateWType(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
                selectObject={
                    {
                        wgTypeID: `menuDefault${weapon.wID}`,
                        wgTypeTitle: "--Please select a weapon group--"
                    }
                }
                array={wgTypes}
                keyID={'wgTypeID'}
                displayID={'wgTypeTitle'}
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
                    const formatValue = weapon.wDescription.replace(/[\n\r]/gm, ' ');
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
                    dispatchWeapon(updateWHTrait(!weapon.wHTrait))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <Field
                label={'Acquired from Trait'}
                id={'wTrait'}
                type={'checkbox'}
                value={weapon.wTrait}
                change={(e) => {
                    dispatchWeapon(updateWTrait(!weapon.wTrait))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <button
                onClick={handleSave}
            >Save</button>
        </div>
    )
}

export default CreateWeapon