import React, { useState } from "react";
import { useLocation } from "react-router";
import TapOpen from "../TapOpen";


const displayText = {
    heritage: {
        title: "--What's a heritage?--",
        1: "When you choose a Heritage, you gain abilities that are particular to that Heritage, as well as giving your Adventurer a starting point for their worldview",
        2: "A Heritage helps give you a sense of where your adventurer fits in the world"
    },

    traits: {
        title: "--What are traits?--",
        1: "Instead of predefined classes, Tiny Dungeon 2e uses Traits to express what your Adventurer excels at doing",
        2: ""
    },

    weaponGroup: {
        title: "--Weapon Group?--",
        1: "There are three main weapon categories: Light Melee (one-handed), Heavy Melee (two-handed), and Ranged (reach out and touch someone)",
        2: "From this group, you select one specific type of weapon that you have Mastered. For example, you can select Light Melee Weapons as your Proficient group, and from that, you can select daggers as your Mastered weapon",
    },

    weapon: {
        title: "--Weapon Ranges--",
        1: "CLOSE: You can reach out and touch, strike, or aid without moving or unbalancing yourself",
        2: "NEAR: Just out of reach. You can use one action to move to bring someone at near range to close range",
        3: "FAR: Anything longer than near. It takes at least two actions to move and bring the closest enemies at Far into close range, though depending on how far they are it can take more move actions (the GM will tell you)"
    },

    familiar: {
        title: "--What's a familiar?--",
        1: "Familiars are usually benevolent spirits that have attached themselves to another living spirit. Familiars are umbral (shadowy), but take the shape of a particular animal—typically no larger than a medium-sized dog—that is visible to anyone. Despite being able to be seen by anyone, familiars cannot speak, and instead communicate telepathically with their bonded friend. They have a movement of 30 feet and are able to remain manifested so long as they are within a 50-foot radius of their friend",
        2: "Familiars are incorporeal to everything but their bonded friend, and as such, are unable to physically interact with other objects or individuals. That does not mean they are impervious to damage; when summoned, a familiar has 1 Hit Point, and can be damaged by magical effects. If a familiar’s Hit Points are reduced to 0, the familiar disappears and its bonded friend takes 1 point of damage",
        3: "Summoning and unsummoning a familiar is considered free and does not require a Test. When summoned, the familiar will appear on or within 5 feet of its bonded friend"
    },

    scrolls: {
        title: "--Using Scrolls--",
        1: "For a Spell Reader to use a magic scroll, they must be holding it, and then simply perform a standard 2d6 Test",
        2: "A success results in the casting of the scroll’s ability, but it also destroys the scroll",
        3: "If the character fails the Test, the scroll is not destroyed, but the character obviously does not successfully cast the spell"
    },

    backstory: {
        title: "--Trade and Belief?--",
        1: "Your character wasn't born an Adventurer. No, really. They were probably exposed to a Family Trade growing up; perhaps Blacksmithing, or Weaving. This can give you Advantage on certain in-game tests",
        2: `All Adventurers have a driving principle called a Belief that should be noted on the Adventurer Sheet. This Belief is a simple statement used as a guiding force for your Adventurer. Their Belief may be, “I’ll always find a diplomatic solution,” “Gold can buy happiness,” or “I let my sword do the talking.” This Belief is not etched in stone, and can be changed or added to with the approval of your Game Master`
    },

    combat: {
        title: "--Combat Actions--",
        1: "Your character may (normally) take two actions on each turn of combat. Aside from weapon restrictions, your character may repeat actions",
        2: "",
    }
}
const DisplayRational = ({ stage = useLocation().pathname.split('/')[2] }) => {
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <div className="displayRational__container">
            <TapOpen />
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