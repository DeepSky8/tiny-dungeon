import React, { useReducer } from "react";
import { defaultWeaponGroup, weaponGroupReducer } from "../../reducers/weaponReducer";
import Field from "../display/Field";
import Menu from "../display/Menu";
import BulletedRemove from "../display/BulletedRemove";
import {
    loadWG,
    removeWGDisRangeID,
    removeWGRangeID,
    startNewWeaponGroupKey,
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
import { wgRange, wgTypes } from "../../objectsArrays/createObjectArrays/weaponGroupObjectArray";


const CreateWeaponGroup = () => {
    const [wGroup, dispatchWGroup] = useReducer(weaponGroupReducer, defaultWeaponGroup)

    const handleRemoveWGroupRangeID = (id) => {
        dispatchWGroup(removeWGRangeID(id))
    }

    const handleRemoveWGroupDisRangeID = (id) => {
        dispatchWGroup(removeWGDisRangeID(id))
    }

    const handleSave = () => {
        startNewWeaponGroupKey({ wGroupData: wGroup })
            .then(() => {
                dispatchWGroup(loadWG(defaultWeaponGroup))
            })
    }

    return (
        <div className="createWeaponGroup__container">

            <Menu
                label={'Weapon Group Type'}
                id={'wgType'}
                change={(e) => {
                    dispatchWGroup(updateWGType(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
                selectObject={
                    {
                        wgTypeID: `menuDefault${wGroup.wgID}`,
                        wgTypeTitle: "--Please select a weapon group--"
                    }
                }
                array={wgTypes}
                keyID={'wgTypeID'}
                displayID={'wgTypeTitle'}
            />


            <Field
                label={'Weapon Group Title'}
                id={'wgTitle'}
                type={'text'}
                value={wGroup.wgTitle}
                change={(e) => {
                    dispatchWGroup(updateWGTitle(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <Field
                label={'Weapon Group Description'}
                id={'wgDescription'}
                type={'textarea'}
                value={wGroup.wgDescription}
                change={(e) => {
                    dispatchWGroup(updateWGDescription(e.target.value))
                }}
                blur={() => {
                    const formatValue = wGroup.wgDescription.replace(/[\n\r]/gm, ' ');
                    dispatchWGroup(updateWGDescription(formatValue))
                }}
                theme={''}
            />

            <Field
                label={'Weapon Group Damage'}
                id={'wgDamage'}
                type={'number'}
                value={wGroup.wgDamage}
                change={(e) => {
                    dispatchWGroup(updateWGDamage(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <Field
                label={'Weapon Group attacks per turn'}
                id={'wgAttackTurn'}
                type={'number'}
                value={wGroup.wgAttackTurn}
                change={(e) => {
                    dispatchWGroup(updateWGAttackTurn(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <Menu
                label={'Weapon Group Range'}
                id={'wgRangeIDs'}
                change={(e) => {
                    dispatchWGroup(updateWGRangeIDs(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
                array={wgRange}
                keyID={'wgRangeID'}
                displayID={'wgRangeTitle'}
            />

            <BulletedRemove
                objectArray={wgRange}
                IDArray={wGroup.wgRangeIDs}
                IDKey={'wgRangeID'}
                IDTitle={'wgRangeTitle'}
                IDDescription={''}
                remove={handleRemoveWGroupRangeID}
            />

            <Menu
                label={'Weapon Group Disadvantage Range'}
                id={'wgDisRangeIDs'}
                change={(e) => {
                    dispatchWGroup(updateWGDisRangeIDs(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
                array={wgRange}
                keyID={'wgRangeID'}
                displayID={'wgRangeTitle'}
            />

            <BulletedRemove
                objectArray={wgRange}
                IDArray={wGroup.wgDisRangeIDs}
                IDKey={'wgRangeID'}
                IDTitle={'wgRangeTitle'}
                IDDescription={''}
                remove={handleRemoveWGroupDisRangeID}
            />

            <Field
                label={'Acquired from Heritage Trait'}
                id={'wgHTrait'}
                type={'checkbox'}
                value={wGroup.wgHTrait}
                change={(e) => {
                    dispatchWGroup(updateWGHTrait(e.target.value))
                }}
                blur={() => {

                }}
                theme={''}
            />

            <Field
                label={'Acquired from Trait'}
                id={'wgTrait'}
                type={'checkbox'}
                value={wGroup.wgTrait}
                change={(e) => {
                    dispatchWGroup(updateWGTrait(e.target.value))
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

export default CreateWeaponGroup