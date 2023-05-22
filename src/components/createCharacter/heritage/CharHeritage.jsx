import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { db } from "../../../api/firebase";
import StyledMenu from "../../display/StyledMenu";
import DisplayHeritage from "./DisplayHeritage";
import DisplayRational from "../DisplayRational";
import { updateHTraitID } from "../../../actions/charActions";

const CharHeritage = () => {
    const [char, dispatchChar] = useOutletContext();
    const [heritages, setHeritages] = useState([]);

    useEffect(() => {
        console.log('char', char)
    }, [char])

    useEffect(() => {
        console.log('heritages', heritages)
    }, [heritages])


    useEffect(() => {
        if (char.heritageID && heritages.length > 0) {
            const currentHeritage = heritages.filter(heritage => heritage.hID === char.heritageID)[0]
            dispatchChar(updateHTraitID(currentHeritage.hTraitIDs[0]))
        }
    }, [char.heritageID, heritages])

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

// 'charHeritage__text'
// 'displayHeritage__container',
// "displayHeritage__image",
// "displayHeritage__container--text"

// <div
// className="spacer"
// ></div>

// <p>Choosing a Heritage first helps give you a sense of where your adventurer fits in the world.</p>


// <Menu
// label={''}
// aria={'Heritage Menu'}
// id={'heritageMenu'}
// change={(e) => {
//     dispatchChar(updateHeritageID(e.target.value))
// }}
// blur={() => {

// }}
// theme=''
// selectObject={
//     {
//         hID: 'menuDefault',
//         hTitle: "--Please select a heritage--"
//     }
// }
// array={heritages}
// keyID={'hID'}
// displayID={'hTitle'}
// />


// <span
// className="charHeritage__text"
// id="charHeritage__text"
// >When you choose a Heritage, you gain abilities that are particular to that Heritage, as well as giving your Adventurer a starting point for their worldview.
// </span>