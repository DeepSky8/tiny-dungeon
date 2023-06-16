import React, { useState } from "react";
import Field from "../display/FieldPencil";
import useLocalStorageState from "use-local-storage-state";


const DisplayNotes = () => {
    const [localNotes, setLocalNotes] = useLocalStorageState('localNotes', { defaultValue: '' })
    const [notes, setNotes] = useState(localNotes)
    return (
        <div className="displayNotes__container">
            <Field
                label={'Notes'}
                id={`notes`}
                type={'textarea'}
                value={notes}
                change={(e) => {
                    setNotes(e.target.value)
                }}
                blur={() => {
                    setLocalNotes(notes)
                }}
                theme={'label__centered'}
                placeholder={'A useful (and resizable!) place to store reminders about extra items or knowledge discovered by your Adventurer'}
            />

        </div>
    )
}

export default DisplayNotes