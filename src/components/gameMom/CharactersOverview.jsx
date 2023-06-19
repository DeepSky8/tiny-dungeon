import React, { useReducer, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { auth, db } from "../../api/firebase";
import { off, onValue, ref } from "firebase/database";
import { defaultDisplay, displayReducer } from "../../reducers/displayReducer";
import ClickDescriptionMultiple from "../display/ClickDescriptionMultiple";
import CharacterSummary from "./CharacterSummary";


const CharactersOverview = () => {
    const [localCode] = useLocalStorageState('localCode')
    const [localAdmin] = useLocalStorageState('localAdmin')
    const [authCodes, setAuthCodes] = useState([])
    const [adminCodes, setAdminCodes] = useState([])
    // const [heritages, setHeritages] = useState([])
    // const [traits, setTraits] = useState([])

    const [characters, setCharacters] = useState([])
    // const [show, dispatch] = useReducer(displayReducer, defaultDisplay)


    useEffect(() => {
        onValue(ref(db, 'authCodes'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => tempArray.push(snap.val()))
            }
            setAuthCodes(tempArray)
        })

        return (() => {
            off(ref(db, 'authCodes'))
        })
    }, [])

    useEffect(() => {
        onValue(ref(db, 'adminCodes'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => tempArray.push(snap.val()))
            }
            setAdminCodes(tempArray)
        })

        return (() => {
            off(ref(db, 'adminCodes'))
        })
    }, [])

    // useEffect(() => {
    //     onValue(ref(db, 'heritages'), snapshot => {
    //         const tempArray = []
    //         if (snapshot.exists()) {
    //             snapshot.forEach(snap => tempArray.push(snap.val()))
    //         }
    //         setHeritages(tempArray)
    //     })

    //     return (() => {
    //         off(ref(db, 'heritages'))
    //     })
    // }, [])

    // useEffect(() => {
    //     onValue(ref(db, 'traits'), snapshot => {
    //         const tempArray = []
    //         if (snapshot.exists()) {
    //             console.log('snapshot trait', snapshot.val())
    //             snapshot.forEach(snap => tempArray.push(snap.val()))
    //         }
    //         setTraits(tempArray)
    //     })

    //     return (() => {
    //         off(ref(db, 'traits'))
    //     })
    // }, [])


    useEffect(() => {
        // if (auth.currentUser && adminCodes.includes(localAdmin)) {
        onValue(ref(db, `gameSessions/${localCode}`), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => tempArray.push(snap.val()))
            }
            setCharacters(tempArray)
        })
        // }

        return (() => {
            off(ref(db, `gameSessions/${localCode}`))
        })
    }, [auth, localCode])

    return (
        <div className="charactersOverview__container">
            {characters.map(character => {
                return (
                    <ClickDescriptionMultiple
                        key={character.charID}
                        title={character.charName}
                        description={
                            <CharacterSummary
                                charData={character}
                            />
                        }
                    />
                )
            })}


        </div>
    )
}

export default CharactersOverview
