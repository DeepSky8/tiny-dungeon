import { auth } from "../api/firebase"

const saveAsNewChar = async ({ char }) => {

    startNewCharKey()
        .then((newCharID) => {
            startUpdateCharID({ uid: auth.currentUser.uid, charID: newCharID })
            return newCharID
        })
        .then((charID) => {
            startUpdateChar(
                {
                    uid: auth.currentUser.uid,
                    charData: {
                        ...char,
                        charCreated: Date.now(),
                        charID: charID
                    }
                }
            )
            return charID
        })
        .then((charID) => {
            dispatchChar(updateCharID(charID))
            return charID
        })
        .catch((error) => {
            console.log('Error encountered', error)
        })
}

export default saveAsNewChar