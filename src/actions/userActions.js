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

export const startRemoveUser = ({ uid }) => {
    const updates = {};

    updates[`users/${uid}`] = null

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not remove user', error)
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


