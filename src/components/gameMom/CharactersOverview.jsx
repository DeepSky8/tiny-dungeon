import React, { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { auth, db } from "../../api/firebase";
import { off, onValue, ref } from "firebase/database";
import ClickDescriptionMultiple from "../display/ClickDescriptionMultiple";
import CharacterSummary from "./CharacterSummary";
import TraitsOverview from "./TraitsOverview";
import alphabetizeNames from "../../functions/alphabetizeNames";
import WeaponsOverview from "./WeaponsOverview";


const CharactersOverview = () => {
    const [localCode] = useLocalStorageState('localCode')
    const [localAdmin] = useLocalStorageState('localAdmin')
    const [authCodes, setAuthCodes] = useState([])
    const [adminCodes, setAdminCodes] = useState([])
    const [heritages, setHeritages] = useState([])
    const [traits, setTraits] = useState([])
    const [weapons, setWeapons] = useState([])

    const [characters, setCharacters] = useState([])
    // const [show, dispatch] = useReducer(displayReducer, defaultDisplay)


    useEffect(() => {
        onValue(ref(db, 'authCodes'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => { tempArray.push(snap.val()) })
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
                snapshot.forEach(snap => { tempArray.push(snap.val()) })
            }
            setAdminCodes(tempArray)
        })

        return (() => {
            off(ref(db, 'adminCodes'))
        })
    }, [])

    useEffect(() => {
        onValue(ref(db, 'heritages'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => { tempArray.push(snap.val()) })
            }
            setHeritages(tempArray)
        })

        return (() => {
            off(ref(db, 'heritages'))
        })
    }, [])

    useEffect(() => {
        onValue(ref(db, 'traits'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => { tempArray.push(snap.val()) })
            }
            setTraits(tempArray)
        })

        return (() => {
            off(ref(db, 'traits'))
        })
    }, [])

    useEffect(() => {
        onValue(ref(db, 'weapons'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => { tempArray.push(snap.val()) })
            }
            setWeapons(tempArray)
        })

        return (() => {
            off(ref(db, 'weapons'))
        })
    }, [])


    useEffect(() => {
        // if (auth.currentUser && adminCodes.includes(localAdmin)) {
        onValue(ref(db, `gameSessions/${localCode}`), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => tempArray.push(snap.val()))
            }
            const sortedCharacters = alphabetizeNames({ objectArray: tempArray, namePrefix: 'char' })
            setCharacters(sortedCharacters)
        })
        // }

        return (() => {
            off(ref(db, `gameSessions/${localCode}`))
        })
    }, [auth, localCode])

    return (
        <div className="charactersOverview__container">
            <ClickDescriptionMultiple
                title={'Characters'}
                description={
                    characters.map(character => {
                        return (
                            <ClickDescriptionMultiple
                                key={character.charID}
                                title={character.charName}
                                description={
                                    <CharacterSummary
                                        charData={character}
                                        heritageData={heritages}
                                        traitData={traits}
                                    />
                                }
                            />
                        )
                    })
                }
            />
            <ClickDescriptionMultiple
                title={'Active Traits'}
                description={
                    <TraitsOverview
                        characters={characters}
                        traits={traits}
                    />
                }
            />
            <ClickDescriptionMultiple
                title={'Weapons'}
                description={
                    <WeaponsOverview
                        characters={characters}
                        weapons={weapons}
                    />
                }
            />

        </div>
    )
}

export default CharactersOverview
