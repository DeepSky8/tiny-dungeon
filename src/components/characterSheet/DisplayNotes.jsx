import React, { useState } from "react";
import Field from "../display/FieldPencil";
import useLocalStorageState from "use-local-storage-state";
import { updateNotes } from "../../actions/charActions";


const DisplayNotes = ({ charNotes, dispatchChar }) => {
    // const [localNotes, setLocalNotes] = useLocalStorageState('localNotes', { defaultValue: '' })
    const [notes, setNotes] = useState(charNotes)
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
                blur={() => {
                    // setLocalNotes(notes)
                    dispatchChar(updateNotes(notes))
                }}
                theme={'label__centered'}
                placeholder={'A useful place to store reminders about extra items or knowledge discovered by your Adventurer'}
            />

        </div>
    )
}

export default DisplayNotes