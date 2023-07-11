import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { db } from "../../../api/firebase";
import StyledMenu from "../../display/StyledMenu";
import DisplayHeritage from "./DisplayHeritage";
import DisplayRational from "../DisplayRational";
import { setCurrentHP, setHeritageHP, updateHTraitID, updateHeritageID } from "../../../actions/charActions";

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

    const loadHeritage = (heritage) => {
        dispatchChar(updateHeritageID(heritage.hID))
        dispatchChar(updateHTraitID(heritage.hTraitIDs[0]))
        dispatchChar(setHeritageHP(parseInt(heritage.hHP)))
        dispatchChar(setCurrentHP(parseInt(heritage.hHP)))
    }


    return (
        <div
            className="charHeritage__container"
        >
            <div className="newC__title bold centered">Heritage</div>
            <StyledMenu
                menuID={'heritageMenu'}
                selectStatement={'--Select a Heritage--'}
                missingTitle={''}
                array={heritages}
                arrayIDRef={'hID'}
                arrayTitleRef={'hTitle'}
                state={char}
                stateIDRef={'heritageID'}
                onSelection={loadHeritage}
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