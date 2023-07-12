import React, { useEffect, useState } from "react";
import { auth, db } from "../../api/firebase";
import useLocalStorageState from "use-local-storage-state";
import { useNavigate } from "react-router-dom";
import saveAsNewChar from "../../functions/saveAsNewChar";
import { off, onValue, ref } from "firebase/database";
import { defaultChar } from "../../reducers/charReducer";
import { startSelectCharID } from "../../actions/userActions";

const SelectAdventurer = () => {
    const navigate = useNavigate()
    const [characters, setCharacters] = useState([])
    const [selectedChar, setSelectedChar] = useState(defaultChar)
    const [localChar, setLocalChar, { removeItem: removeLocalChar }] = useLocalStorageState('localChar')
    const [anonymous, setAnonymous] = useState(true)

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
                <button
                    className={`selectAdventurer__brandNew` + (anonymous ? ` faded` : "")}
                    onClick={() => { loadAdventurer() }}
                >Load Selected Adventurer</button>
            </div>
        </div>
    )
}

export default SelectAdventurer