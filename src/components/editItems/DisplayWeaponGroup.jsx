import React, { useReducer } from "react";
import Field from "../display/Field";
import { weaponGroupReducer } from "../../reducers/weaponReducer";
import {
    removeWGDisRangeID,
    removeWGRangeID,
    startSaveWeaponGroup,
    updateWGAttackTurn,
    updateWGDamage,
    updateWGDescription,
    updateWGDisRangeIDs,
    updateWGHTrait,
    updateWGRangeIDs,
    updateWGTitle,
    updateWGTrait,
    updateWGType
} from "../../actions/weaponActions";
import Menu from "../display/Menu";
import BulletedRemove from "../display/BulletedRemove";

import { wgRange } from "../../objectsArrays/createObjectArrays/weaponGroupObjectArray";

const DisplayWeaponGroup = ({ weaponGroup }) => {
    const [wg, dispatchWG] = useReducer(weaponGroupReducer, weaponGroup)

    // wgAttackTurn,
    // wgDamage,
    // wgDescription,
    // wgHTrait,
    // wgID,
    // wgRangeIDs,
    // wgTitle,
    // wgTrait,
    // wgType,


    const handleRemoveWGroupRangeID = (id) => {
        dispatchWG(removeWGRangeID(id))
    }

    const handleRemoveWGroupDisRangeID = (id) => {
        dispatchWG(removeWGDisRangeID(id))
    }

    const saveWeaponGroup = () => {
        startSaveWeaponGroup({ ...wg })
    }

    return (
        <div className="displayWeaponGroup__container">
            <Field
                label={'Weapon Group Type'}
                id={'wgType'}
                type={'text'}
                value={wg.wgType}
                change={(e) => {
                    dispatchWG(updateWGType(e.target.value))
                }}
                blur={() => {
                    saveWeaponGroup()
                }}
                theme={''}
            />


            <Field
                label={'Weapon Group Title'}
                id={'wgTitle'}
                type={'text'}
                value={wg.wgTitle}
                change={(e) => {
                    dispatchWG(updateWGTitle(e.target.value))
                }}
                blur={() => {
                    saveWeaponGroup()
                }}
                theme={''}
            />

            <Field
                label={'Weapon Group Description'}
                id={'wgDescription'}
                type={'textarea'}
                value={wg.wgDescription}
                change={(e) => {
                    dispatchWG(updateWGDescription(e.target.value))
                }}
                blur={() => {
                    saveWeaponGroup()
                }}
                theme={''}
            />

            <Field
                label={'Weapon Group Damage'}
                id={'wgDamage'}
                type={'number'}
                value={wg.wgDamage}
                change={(e) => {
                    dispatchWG(updateWGDamage(e.target.value))
                }}
                blur={() => {
                    saveWeaponGroup()
                }}
                theme={''}
            />

            <Field
                label={'Weapon Group attacks per turn'}
                id={'wgAttackTurn'}
                type={'number'}
                value={wg.wgAttackTurn}
                change={(e) => {
                    dispatchWG(updateWGAttackTurn(e.target.value))
                }}
                blur={() => {
                    saveWeaponGroup()
                }}
                theme={''}
            />

            <Menu
                label={'Weapon Group Range'}
                id={'wgRangeIDs'}
                change={(e) => {
                    dispatchWG(updateWGRangeIDs(e.target.value))
                }}
                blur={() => {
                    saveWeaponGroup()
                }}
                theme={''}
                array={wgRange}
                keyID={'wgRangeID'}
                displayID={'wgRangeTitle'}
            />

            <BulletedRemove
                objectArray={wgRange}
                IDArray={wg.wgRangeIDs}
                IDKey={'wgRangeID'}
                IDTitle={'wgRangeTitle'}
                IDDescription={''}
                remove={handleRemoveWGroupRangeID}
            />

            <Menu
                label={'Weapon Group Disadvantage Range'}
                id={'wgDisRangeIDs'}
                change={(e) => {
                    dispatchWG(updateWGDisRangeIDs(e.target.value))
                }}
                blur={() => {
                    saveWeaponGroup()
                }}
                theme={''}
                array={wgRange}
                keyID={'wgRangeID'}
                displayID={'wgRangeTitle'}
            />

            <BulletedRemove
                objectArray={wgRange}
                IDArray={wg.wgDisRangeIDs}
                IDKey={'wgRangeID'}
                IDTitle={'wgRangeTitle'}
                IDDescription={''}
                remove={handleRemoveWGroupDisRangeID}
            />

            <Field
                label={'Acquired from Heritage Trait'}
                id={'wgHTrait'}
                type={'checkbox'}
                value={wg.wgHTrait}
                change={(e) => {
                    dispatchWG(updateWGHTrait(e.target.value))
                }}
                blur={() => {
                    saveWeaponGroup()
                }}
                theme={''}
            />

            <Field
                label={'Acquired from Trait'}
                id={'wgTrait'}
                type={'checkbox'}
                value={wg.wgTrait}
                change={(e) => {
                    dispatchWG(updateWGTrait(e.target.value))
                }}
                blur={() => {
                    saveWeaponGroup()
                }}
                theme={''}
            />
        </div>
    )
}

export default DisplayWeaponGroup