import React from "react";

const BulletedRemove = ({ objectArray, IDArray = [], IDKey, IDTitle, IDDescription, remove }) => {
    return (
        <div>

            {
                IDArray.length > 0 &&
                <ul>
                    {
                        objectArray
                            .filter(object =>
                                IDArray.includes(object[`${IDKey}`])
                            ).map(
                                object => {
                                    return (
                                        <li
                                            key={object[`${IDKey}`]}
                                        >
                                            {object[`${IDTitle}`]} - {object[`${IDDescription}`]}

                                            <button
                                                onClick={() => {
                                                    remove(object[`${IDKey}`])
                                                }}
                                            >Remove</button>


                                        </li>
                                    )

                                })
                    }
                </ul>
            }
        </div>
    )
}

export default BulletedRemove