import React, { useState } from "react";
import Field from "../display/FieldPencil";
import { startUpdateNotes, updateNotes } from "../../actions/charActions";
import { auth } from "../../api/firebase";


const DisplayNotes = ({ char }) => {
    const [notes, setNotes] = useState(char.charNotes)

    const updateNotes = () => {
        startUpdateNotes({ uid: auth.currentUser.uid, charData: { ...char, charNotes: notes } })
    }

    return (
        <div className="displayNotes__container">
            <div className="charSheet__display--title centered bold">Notes</div>
            <Field
                label={''}
                aria={'Notes'}
                id={`notes`}
                type={'textarea'}
                value={notes}
                change={(e) => {
                    setNotes(e.target.value)
                }}
                blur={() => { updateNotes() }}
                theme={'label__centered'}
                placeholder={'A useful place to store reminders about extra items or knowledge discovered by your Adventurer'}
            />

        </div>
    )
}

export default DisplayNotes