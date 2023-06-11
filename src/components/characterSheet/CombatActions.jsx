import React from "react";
import ClickDescriptionMultiple from "../display/ClickDescriptionMultiple";
import ClickDescriptionCentered from "../display/ClickDescriptionCentered";

const CombatActions = () => {
    const numberOfActions = "Your character may (normally) take two actions on each turn of combat. Aside from weapon restrictions, your character may repeat actions"
    const actions = [
        {
            key: 0,
            title: 'Focus',
            description: [
                "After spending an action on Focus, your character's next attack this combat is successful when rolling a 4, 5, or 6, instead of 5 or 6",
            ],
            description1: "",
            description2: "",
            description3: "",
            description4: "",
            italic: "Does not stack, remains in effect until you choose to attack",
        },
        {
            key: 1,
            title: 'Attack',
            description: [
                "Your character attempts to strike a target. Describe the action, then roll your dice (review number to roll below). If at least one 5 or 6 is showing, the attack succeeded!",
                "3d6 (advantage) if using a Mastered weapon",
                "2d6 (standard) if using an unmastered weapon within Proficency (light melee, heavy melee, ranged, etc.)",
                "1d6 (disadvantage) if your character does not know how to fight with this weapon. This includes unarmed strikes and improvised weapons (without training or a Trait)",
            ],
            description1: "Your character attempts to strike a target. Describe the action, then roll your dice (review number to roll below). If at least one 5 or 6 is showing, the attack succeeded!",
            description2: "3d6 (advantage) if using a Mastered weapon",
            description3: "2d6 (standard) if using an unmastered weapon within Proficency (light melee, heavy melee, ranged)",
            description4: "1d6 (disadvantage) if your character does not know how to fight with this weapon. This includes unarmed strikes and improvised weapons (without training or a Trait)",
            italic: "'d6 stands for a six-sided die'",
        },
        {
            key: 2,
            title: 'Move',
            description: [
                "Your character can move approximately 25 feet with a single Action, so long as there isn't anything hindering their movement",
            ],
            description1: "Your character can move approximately 25 feet with a single Action, so long as there isn't anything hindering their movement",
            description2: "",
            description3: "",
            description4: "",
            italic: "Turns out six seconds is a long time when running",
        },
        {
            key: 3,
            title: 'Test for Ability',
            description: [
                "Describe what your character is trying to accomplish, and if any traits or special effects apply. The Game Mom will help determine how many dice to roll to discover if your character succeeds",
                "3d6 (advantage) - some traits and story-based effects will provide advantage when attempting something spectacular",
                "2d6 (standard) - this action has standard difficulty",
                "1d6 (disadvantage) - this is going to be tough. I'm not sure I believe in you",
            ],
            description1: "Describe what your character is trying to accomplish, and if any traits or special effects apply. The Game Mom will help determine how many dice to roll to discover if your character succeeds",
            description2: "3d6 (advantage) - some traits and story-based effects will provide advantage when attempting something spectacular",
            description3: "2d6 (standard) - this action has standard difficulty",
            description4: "1d6 (disadvantage) - this is going to be tough. I'm not sure I believe in you",
            italic: "Maybe ask your team if they want to help out somehow?",
        },
        {
            key: 4,
            title: 'Evade',
            description: [
                "Until your character's next turn, test 1d6 when an enemy would successfully strike your character. If you succeed in the roll, your character Evades the damage",
                "This is exactly the same as the Heritage Trait 'Goblin Agility'; characters with this heritage do not gain any additional benefit from using this action",
            ],
            description1: "Until your character's next turn, test 1d6 when an enemy would successfully strike your character. If you succeed in the roll, your character Evades the damage",
            description2: "This is exactly the same as the Heritage Trait 'Goblin Agility'; characters with this heritage do not gain any additional benefit from using this action",
            description3: "",
            description4: "",
            italic: "'d6 stands for a six-sided die'",
        },
    ]

    return (
        <div className="combatActions__container">
            <div className="clickOpen__text--reminder">
                Click to open
            </div>
            <ClickDescriptionMultiple
                title={'Combat Actions'}
                description={
                    <span className="combatActions__container--description">
                        <span className="combatActions__header">
                            {numberOfActions}
                        </span>

                        {actions.map(action => {
                            return (
                                <ClickDescriptionCentered
                                    key={action.key}
                                    title={action.title}
                                    description={
                                        <span className="combatActions__description--field">
                                            {action.description.map(line => {
                                                return (
                                                    <div
                                                        key={line}
                                                        className="combatActions__description--newLine"
                                                    >
                                                        {line}
                                                    </div>
                                                )
                                            })}
                                            <div className="italic small centered combatActions__description--newLine" >{action.italic}</div>
                                        </span>
                                    }
                                />
                            )
                        })}

                    </span>
                }
            />
        </div>
    )
}

export default CombatActions

// Initiative Roll - 2d6 test - success goes first, then opponents, failure goes last

// Round of combat is six seconds

// Two actions per character per round

// Standard single actions:
// Move - your character can move approximately 25 feet in-game with a single Action, so long as there isn’t anything hindering their movement
// Attack (ranged weapons require a reload action, Heavy and Magical Ranged can attack once per turn)
// Other Actions include sheathing or unsheathing a weapon, grabbing an item, and giving an item to an ally

// Attack rolls
// Mastered weapon = 3d6 (advantage)
// Simple Proficiency with the weapon (you have the weapon group, but not the weapon itself) = 2d6 (standard)
// Weapon Groups with which you are not proficient = 1d6 (disadvantage) - this includes unarmed and improvised, unless talented

// Special combat actions:
// Focus - your next attack after using an action to Focus is successful on 4-6, instead of 5-6
// Lasts until next attack this combat, cannot stack
// Evade - until your next turn, test 1d6 when hit by enemy. If you succeed, you Evade the damage.

// Focus
// Attack
// Move
// Test for Ability
// Evade

