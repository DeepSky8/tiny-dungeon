import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useReducer, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { auth, db } from "../../../api/firebase";
import StyledMenu from "../../display/StyledMenu";
import DisplayHeritage from "./DisplayHeritage";
import DisplayRational from "../DisplayRational";
import {
    loadChar,
    setCurrentHP,
    setHeritageHP,
    startUpdateHeritageData,
    startUpdateHeritageTraitID,
    updateHTraitID,
    updateHeritageID
} from "../../../actions/charActions";
import { charReducer, defaultChar } from "../../../reducers/charReducer";

const CharHeritage = () => {
    const { charID } = useParams();

    // const [charData] = useOutletContext();
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)
    const [heritages, setHeritages] = useState([]);

    useEffect(() => {
        // console.log('charData', charData)
        console.log('char', char)
    }, [char])

    useEffect(() => {
        if (charID && charID !== 0) {
            onValue(ref(db, `characters/${charID}`), snapshot => {

                if (
                    snapshot.exists()
                    &&
                    snapshot.val().userID === auth.currentUser.uid
                ) {
                    dispatchChar(loadChar(snapshot.val()))
                }

            })
        }
        //  else {
        //     startNewCharKey().then((newKey) => {
        //         startUpdateCharID({ uid: auth.currentUser.uid, currentCharID: newKey })
        //         updateIDs({ uid: auth.currentUser.uid, charID: newKey })
        //     })
        // }

        return (() => {

            if (charID && charID !== 0) {
                off(ref(db, `characters/${charID}`))
            }
        })
    }, [charID])

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

    const selectHeritage = (heritage) => {
        // dispatchChar(updateHeritageID(heritage.hID))
        // dispatchChar(updateHTraitID(heritage.hTraitIDs[0]))
        // dispatchChar(setHeritageHP(parseInt(heritage.hHP)))
        // dispatchChar(setCurrentHP(parseInt(heritage.hHP)))
        startUpdateHeritageData({ uid: char.userID, charID: char.charID, heritage })
    }

    const selectHeritageTrait = (hTraitID) => {
        // dispatchChar(updateHTraitID(hTraitID))
        startUpdateHeritageTraitID({ uid: char.userID, charID: char.charID, hTraitID })
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
                onSelection={selectHeritage}
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
                    dispatchCharHeritageID={selectHeritageTrait}
                    hTraitID={char.hTraitID}
                />
            }
            <DisplayRational />
        </div>
    )
}

export default CharHeritage