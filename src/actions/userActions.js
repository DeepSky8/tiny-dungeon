import { ref, update } from "firebase/database";
import { db } from "../api/firebase";

export const loadUser = (userData) => ({
    type: 'LOAD_USER',
    userData
})

export const updateUID = (uid) => ({
    type: 'UPDATE_UID',
    uid
})

export const clearUser = () => ({
    type: 'CLEAR_USER'
})


// Cloud Actions


export const startCreateUser = async ({ uid, authProvider, email = 'none provided' }) => {
    const updates = {};

    updates[`users/${uid}`] = {
        uid,
        authProvider,
        email,
        admin: false,
        gm: false,
        lastAccess: Date.now(),
        dateCreated: Date.now(),
        gameSession: 0,
        currentCharID: '',
        charIDs: [],
    }

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save link', error)
        })
}

export const startUpdateUserAccessDate = async ({ uid }) => {
    const updates = {};

    updates[`users/${uid}/lastAccess`] = Date.now()

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update access date', error)
        })
}

// export const startCreateNewUser = ({ uid, userData }) => {
//     const updates = {};

//     updates[`users/${uid}`] = null

//     update(ref(db), updates)
//         .catch((error) => {
//             alert('Did not remove user', error)
//         })
// }

export const startRemoveUser = ({ uid }) => {
    const updates = {};

    updates[`users/${uid}`] = null

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not remove user', error)
        })
}

export const startUpdateUserRoles = ({ uid, admin, gm }) => {
    const updates = {};

    updates[`users/${uid}/admin`] = admin
    updates[`users/${uid}/gm`] = gm


    update(ref(db), updates)
        .catch((error) => {
            alert('Did not update user', error)
        })
}

export const startUpdateSessionCode = ({ uid, session }) => {
    const updates = {};

    updates[`users/${uid}/uid`] = uid
    updates[`users/${uid}/gameSession`] = session


    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            alert('Did not update session code', error)
        })
}


export const startUpdateCurrentCharID = async ({ uid, currentCharID }) => {
    const updates = {};

    updates[`users/${uid}/currentCharID`] = currentCharID

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not update character ID', error)
        })
}