import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";


const displayText = {
    heritage: {
        title: "--What's a heritage?--",
        1: "When you choose a Heritage, you gain abilities that are particular to that Heritage, as well as giving your Adventurer a starting point for their worldview.",
        2: "Choosing a Heritage first helps give you a sense of where your adventurer fits in the world"
    },

    traits: {
        title: "--What are traits?",
        1: "Instead of predefined classes, Tiny Dungeon 2e uses Traits to express what your Adventurer excels at doing.",
        2: ""
    },

    weaponGroup: {
        title: "--What's a Weapon Group?--",
        1: "There are three weapon categories: Light Melee (one-handed), Heavy Melee (two-handed), and Ranged (reach out and touch someone)",
        2: "From this group, you select one specific type of weapon that you have Mastered. For example, you can select Light Melee Weapons as your Proficient group, and from that, you can select daggers as your Mastered weapon",
    },

    backstory: {
        title: "--Why pick a Trade and Belief?--",
        1: "Your character wasn't born an Adventurer. No, really. They were probably exposed to a Family Trade growing up; perhaps Blacksmithing, or Weaving. This can give you Advantage on certain in-game tests.",
        2: `All Adventurers have a driving principle called a Belief that should be noted on the Adventurer Sheet. This Belief is a simple statement used as a guiding force for your Adventurer. Their Belief may be, “I’ll always find a diplomatic solution,” “Gold can buy happiness,” or “I let my sword do the talking.” This Belief is not etched in stone, and can be changed or added to with the approval of your Game Master.`
    }
}
const DisplayRational = () => {
    const stage = useLocation().pathname.split('/')[2]
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <div className="displayRational__container">
            <div className="spacer" />
            <div
                className="displayRational__header--clickable"
                onClick={toggleShow}
            >
                {displayText[stage].title}
            </div>
            {show &&
                <div className="displayational__container--text">
                    <div className="displayational__text">
                        {displayText[stage][1]}
                    </div>
                    <div className="spacer" />
                    <div className="displayational__text">
                        {displayText[stage][2]}
                    </div>
                </div>
            }

        </div>
    )
}

export default DisplayRational