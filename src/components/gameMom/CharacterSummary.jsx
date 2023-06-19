import React from "react";
import ClickDescriptionMultiple from "../display/ClickDescriptionMultiple";
import ClickDescriptionCount from "../display/ClickDescriptionCount";


const CharacterSummary = ({ charData, heritageData, traitData }) => {

    const heritage = heritageData.find(heritage => heritage.hID === charData.heritageID)
    const hTrait = traitData.find(trait => charData.hTraitID === trait.tID)
    const traits = traitData.filter(trait => charData.traitIDs.includes(trait.tID))


    return (
        <div className="characterSummary__container">

            <div className="charSum__body">
                <div className="italic centered">{charData.belief}</div>
                <div className="charSum__line">
                    <div>{heritage.hTitle}</div>
                    {
                        traits.map(trait => trait.tFamiliar).includes(true)
                        &&
                        <div>Has Familiar</div>
                    }
                </div>
                <div className="charSum__line">
                    <div>{`Armor: ${charData.currentArmor}`}</div>
                    <div>{`Health: ${charData.currentHP}`}</div>
                </div>

                <div>
                    <ClickDescriptionMultiple
                        title={hTrait.tTitle}
                        description={hTrait.tDescription}
                    />
                    {traits.map(trait => {
                        return (
                            <ClickDescriptionMultiple
                                key={trait.tID}
                                title={trait.tTitle}
                                description={trait.tDescription}
                            />
                        )
                    })}
                </div>
                <hr className="hr__brown" />

                <div>
                    {charData.weaponObjects.map(weapon => {
                        return (
                            <ClickDescriptionMultiple
                                key={Math.random()}
                                title={weapon.wTitle}
                                description={weapon.wDescription}
                            />
                        )
                    })}
                </div>
                <hr className="hr__brown" />

                {
                    traits.map(trait => trait.tScroll).includes(true)
                    &&
                    <div className="charSum__scrolls">
                        {charData.scrolls.map(scroll => {
                            return (
                                <ClickDescriptionCount
                                    key={scroll.sID}
                                    title={scroll.sTitle}
                                    description={scroll.sDescription}
                                    amount={scroll.sAmount}
                                    increase={() => { }}
                                    decrease={() => { }}
                                />
                            )
                        })}
                    </div>
                }


            </div>

            <hr className="hr__brown" />

        </div>
    )
}

export default CharacterSummary