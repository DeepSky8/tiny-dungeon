import React, { useEffect, useState } from "react";
import { auth, db } from "../../api/firebase";
import useLocalStorageState from "use-local-storage-state";
import { useNavigate } from "react-router-dom";
import saveAsNewChar from "../../functions/saveAsNewChar";
import { off, onValue, ref } from "firebase/database";
import { defaultChar } from "../../reducers/charReducer";
import { startClearCharID, startSelectCharID } from "../../actions/userActions";
import ClickDescriptionSelect from "../display/ClickDescriptionSelect";
import CharacterSummary from "../gameMom/CharacterSummary";
import alphabetizeKeys from "../../functions/alphabetizeKeys";

const SelectAdventurer = () => {
    const navigate = useNavigate()
    const [characters, setCharacters] = useState([])
    const [localChar, setLocalChar, { removeItem: removeLocalChar }] = useLocalStorageState('localChar')
    const [selectedChar, setSelectedChar] = useState(localChar.charID ? localChar : defaultChar)
    const [anonymous, setAnonymous] = useState(true)
    const [heritages, setHeritages] = useState([])
    const [traits, setTraits] = useState([])

    const noUserAccount = 'To create more than one Tiny Dungeon adventurer, please create a Tiny Dungeon account'


    useEffect(() => {
        if (auth.currentUser && !auth.currentUser.isAnonymous) {
            setAnonymous(false)
            onValue(ref(db, `characters`), snapshot => {
                const tempArray = []
                if (snapshot.exists()) {
                    snapshot.forEach(snap => {
                        if (snap.val().userID === auth.currentUser.uid) {
                            tempArray.push(snap.val())
                        }
                    })
                }
                setCharacters(tempArray)
            })

        } else {
            setAnonymous(true)
        }

        return (() => {
            if (!anonymous) {
                off(ref(db, `characters`))
            }
        })

    }, [auth.currentUser])

    useEffect(() => {
        if (!anonymous) {

            onValue(ref(db, 'heritages'), snapshot => {
                const tempArray = []
                if (snapshot.exists()) {
                    snapshot.forEach(snap => { tempArray.push(snap.val()) })
                }
                const sortedArray = alphabetizeKeys({ objectArray: tempArray, key: 'hTitle' })
                setHeritages(sortedArray.length > 0 ? sortedArray : tempArray)
            })
        }

        return (() => {
            off(ref(db, 'heritages'))
        })
    }, [anonymous])

    useEffect(() => {
        if (!anonymous) {

            onValue(ref(db, 'traits'), snapshot => {
                const tempArray = []
                if (snapshot.exists()) {
                    snapshot.forEach(snap => { tempArray.push(snap.val()) })
                }
                const sortedArray = alphabetizeKeys({ objectArray: tempArray, key: 'tTitle' })
                setTraits(sortedArray.length > 0 ? sortedArray : tempArray)
            })
        }

        return (() => {
            off(ref(db, 'traits'))
        })
    }, [anonymous])

    const brandNewAdventurer = () => {
        if (!anonymous) {
            const charIDs = characters.map(char => char.charID)
            if (
                (localChar.charID !== 0)
                &&
                (!charIDs.includes(localChar.charID))
            ) {
                saveAsNewChar({ localChar })
            }
            removeLocalChar()
            startClearCharID({ uid: auth.currentUser.uid })
            navigate('/newCharacter/heritage')
        }
    }

    const loadAdventurer = () => {
        if (!anonymous && (selectedChar.charID !== 0)) {
            setLocalChar(selectedChar)
            startSelectCharID({ uid: auth.currentUser.uid, charID: selectedChar.charID })
                .then(() => {
                    navigate('/characterSheet')
                })
        }
    }

    return (
        <div className="selectAdventurer__container selectAdventurer__spacer">
            <hr className="hr__brown" />
            {
                anonymous
                &&
                <div className="centered">
                    {noUserAccount}
                </div>
            }

            <div className="selectAdventurer__container--menu">

                <button
                    className={`selectAdventurer__brandNew` + (anonymous ? ` faded` : "")}
                    onClick={() => { brandNewAdventurer() }}
                >Create New Adventurer</button>

            </div>

            {
                !anonymous
                &&
                characters.length > 0
                &&
                <div className="selectAdventurer__container--list">
                    {characters.map((char) => {

                        return (
                            <ClickDescriptionSelect
                                key={char.charID}
                                itemID={char.charID}
                                title={char.charName}
                                description={
                                    <CharacterSummary
                                        charData={char}
                                        heritageData={heritages}
                                        traitData={traits}
                                    />
                                }
                                changeHandler={() => {
                                    setSelectedChar(char)
                                }}
                                isSelected={selectedChar.charID === char.charID}
                            />
                        )
                    })}
                </div>
            }

            <div className="selectAdventurer__container--menu">

                <button
                    className={`selectAdventurer__brandNew` + (anonymous ? ` faded` : "")}
                    onClick={() => { loadAdventurer() }}
                >Load Selected Adventurer</button>

            </div>
        </div>
    )
}

export default SelectAdventurer