import React from "react";
import ClickDescriptionMultiple from "../display/ClickDescriptionMultiple";

const DisplayTraits = ({ heritageTrait, traits }) => {
    const sortedTraits = traits.sort((a, b) => {
        if (a.tTitle < b.tTitle) { return -1 }
        if (a.tTitle > b.tTitle) { return 1 }
        return 0
    });

    return (
        <div className="displayTraits__container">
        
            <div className="displayTraits__section">
                <label
                    className="label__centered"
                    htmlFor="heritageTrait"
                >Heritage Trait</label>
                <ClickDescriptionMultiple
                    id='heritageTrait'
                    title={heritageTrait.tTitle}
                    description={heritageTrait.tDescription}
                />
            </div>

            <div className="displayTraits__section">

                <label className="label__centered"
                >Selected Traits</label>
                {sortedTraits.map(trait => {
                    return (
                        <ClickDescriptionMultiple
                            key={trait.tID}
                            title={trait.tTitle}
                            description={trait.tDescription}
                        />
                    )
                })}
            </div>

            <div className="displayTraits__text--reminder">
                Click to open
            </div>
        </div>
    )
}

export default DisplayTraits
