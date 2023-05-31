import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { db } from "../../../api/firebase";
import StyledMenu from "../../display/StyledMenu";
import DisplayHeritage from "./DisplayHeritage";
import DisplayRational from "../DisplayRational";
import { clearTraitIDs, updateHTraitID, updateHeritageID } from "../../../actions/charActions";

const CharHeritage = () => {
    const [char, dispatchChar] = useOutletContext();
    const [heritages, setHeritages] = useState([]);

    // Get a list of heritages from firebase
    useEffect(() => {
        onValue(ref(db, 'heritages'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(heritage => {
                    tempArray.push(heritage.val())
                })
                setHeritages(tempArray)
            }
        }, {
            onlyOnce: true
        })

        return (() => {
            off(ref(db, 'heritages'))
        })
    }, [])

    // When the heritageID is updated, update char with the
    // corresponding heritage trait
    useEffect(() => {
        if (char.heritageID && heritages.length > 0) {
            const currentHeritage = heritages.filter(heritage => heritage.hID === char.heritageID)[0]
            dispatchChar(updateHTraitID(currentHeritage.hTraitIDs[0]))
            dispatchChar(clearTraitIDs())
        }
    }, [char.heritageID])


    return (
        <div
            className="charHeritage__container"
            id="charHeritage__container"
        >
            <title>Select a Heritage</title>
            <StyledMenu
                menuID={'heritageMenu'}
                selectStatement={'--Select a Heritage--'}
                array={heritages}
                arrayIDRef={'hID'}
                arrayTitleRef={'hTitle'}
                state={char}
                dispatchState={dispatchChar}
                dispatchAction={updateHeritageID}
                stateIDRef={'heritageID'}
                closeMenuArrayIDs={
                    [
                        "displayHeritage__image"
                    ]
                }
            />

            {
                (
                    heritages
                        .map(heritage => heritage.hID)
                        .includes(char.heritageID)
                )
                &&
                <DisplayHeritage
                    heritages={heritages}
                    heritageID={char.heritageID}
                    dispatchCharHeritageID={dispatchChar}
                    hTraitID={char.hTraitID}
                />
            }
            <DisplayRational />
        </div>
    )
}

export default CharHeritage