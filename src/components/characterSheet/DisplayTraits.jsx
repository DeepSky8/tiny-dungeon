import React from "react";
import ClickDescriptionCentered from "../display/ClickDescriptionCentered";
import TapOpen from "../TapOpen";
import DisplayRational from "../createCharacter/DisplayRational";

const DisplayTraits = ({ heritageTrait, traits }) => {
    const sortedTraits = traits.sort((a, b) => {
        if (a.tTitle < b.tTitle) { return -1 }
        if (a.tTitle > b.tTitle) { return 1 }
        return 0
    });

    return (
        <div className="displayTraits__container">
        <div className="charSheet__display--title centered bold">Traits</div>

            <div className="displayTraits__section--top">
                <label
                    className="label__centered"
                    htmlFor="heritageTrait"
                >Heritage</label>
                <ClickDescriptionCentered
                    id='heritageTrait'
                    title={heritageTrait.tTitle}
                    description={heritageTrait.tDescription}
                />
            </div>
            <TapOpen />

            <div className="displayTraits__section--bottom">

                <label className="label__centered"
                >Selected Traits</label>
                {sortedTraits.map(trait => {
                    return (
                        <ClickDescriptionCentered
                            key={trait.tID}
                            title={trait.tTitle}
                            description={trait.tDescription}
                        />
                    )
                })}
            </div>

            <DisplayRational
                stage="traits"
            />
        </div>
    )
}

export default DisplayTraits
