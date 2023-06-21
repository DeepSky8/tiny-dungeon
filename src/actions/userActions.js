import { ref, update } from "firebase/database";
import { db } from "../api/firebase";

export const loadUser = (userData) => ({
    type: 'LOAD_USER',
    userData
})

export const updateAdmin = (admin) => ({
    type: 'UPDATE_ADMIN',
    admin
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

export const startCreateNewUser = ({ uid, userData }) => {
    const updates = {};

    updates[`users/${uid}`] = null

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not remove user', error)
        })
}

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


// export const startUpdateCharID = async ({ uid, currentCharID }) => {
//     const updates = {};

//     updates[`users/${uid}/currentCharID`] = currentCharID

//     update(ref(db), updates)
//         .catch((error) => {
//             alert('Did not update character ID', error)
//         })
// }