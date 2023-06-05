import React, { useReducer } from "react";
import { charReducer } from "../../reducers/charReducer";
import useLocalStorageState from "use-local-storage-state";

const CharacterSheet = () => {
    const [localChar, setLocalChar] = useLocalStorageState('localChar')
    const [char, dispatchChar] = useReducer(charReducer, localChar)

    return (
        <div>
            test
        </div>
    )
}

export default CharacterSheet