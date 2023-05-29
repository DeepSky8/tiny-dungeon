import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";


const displayText = {
    heritage: {
        title: "--What's a heritage?--",
        1: "When you choose a Heritage, you gain abilities that are particular to that Heritage, as well as giving your Adventurer a starting point for their worldview.",
        2: "Choosing a Heritage first helps give you a sense of where your adventurer fits in the world"
    },

    traits: {
        title: "--What are traits?--",
        1: "Instead of predefined classes, Tiny Dungeon 2e uses Traits to express what your Adventurer excels at doing.",
        2: ""
    },

    weaponGroup: {
        title: "--Weapon Group?--",
        1: "There are three main weapon categories: Light Melee (one-handed), Heavy Melee (two-handed), and Ranged (reach out and touch someone)",
        2: "From this group, you select one specific type of weapon that you have Mastered. For example, you can select Light Melee Weapons as your Proficient group, and from that, you can select daggers as your Mastered weapon",
    },

    weapon: {
        title: "--Weapon Ranges--",
        1: "CLOSE: You can reach out and touch, strike, or aid without moving or unbalancing yourself.",
        2: "NEAR: Just out of reach. You can use one action to move to bring someone at near range to close range.",
        3: "FAR: Anything longer than near. It takes at least two actions to move and bring the closest enemies at Far into close range, though depending on how far they are it can take more move actions (the GM will tell you.)"
    },

    // All melee weapons can strike enemies at close range. You can use Ranged weapons at close range, but you have Disadvantage on the attack Test. You can use Magic at Close range.
    //  Heavy Melee weapons can strike near enemies if you are willing to suffer Disadvantage on your attack (representing the ability of a larger weapon to reach.) You can use Ranged weapons and Magic at Near range.
    //  Magic and Ranged weapons are the only weapons that can strike enemies in the Far range.
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
            <div
                className="displayRational__header--clickable"
                onClick={toggleShow}
            >
                {displayText[stage].title}
            </div>
            {show &&
                <div className="displayRational__container--text">
                    <div className="displayRational__text">
                        {displayText[stage][1]}
                    </div>

                    {displayText[stage][2] &&
                        <span>
                            <div className="displayRational__text">
                                {displayText[stage][2]}
                            </div>
                        </span>
                    }

                    {displayText[stage][3] &&
                        <span>
                            <div className="displayRational__text">
                                {displayText[stage][3]}
                            </div>
                        </span>
                    }

                </div>
            }

        </div>
    )
}

export default DisplayRational