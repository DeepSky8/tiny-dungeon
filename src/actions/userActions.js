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

export const startCreateUser = async ({ uid, authProvider, email = 'none provided' }) => {
    const updates = {};

    updates[`users/${uid}`] = {
        uid,
        authProvider,
        email,
        admin: false,
        gm: false,
        session: 0,
        charID: "",
        lastAccess: Date.now(),
        dateCreated: Date.now()
    }

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not create user', error)
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

export const startRemoveUser = ({ uid }) => {
    const updates = {};

    updates[`users/${uid}`] = null

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not remove user', error)
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







export const startUpdateUser = ({ uid, admin, gm }) => {
    const updates = {};

    updates[`users/${uid}/admin`] = admin
    updates[`users/${uid}/gm`] = gm


    update(ref(db), updates)
        .catch((error) => {
            alert('Did not update user', error)
        })
}


