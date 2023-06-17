import React from "react";
import ClickDescriptionCentered from "../display/ClickDescriptionCentered";
import TapOpen from "../TapOpen";
import DisplayRational from "../createCharacter/DisplayRational";

const CombatActions = () => {
    const actions = [
        {
            key: 0,
            title: 'Focus',
            description: [
                "After spending an action on Focus, your character's next attack this combat is successful when rolling a 4, 5, or 6, instead of 5 or 6",
            ],
            italic: "Does not stack, remains in effect until you choose to attack",
        },
        {
            key: 1,
            title: 'Attack',
            description: [
                "Your character attempts to strike a target. Describe the action, then roll your dice (review number to roll below). If at least one 5 or 6 is showing, the attack succeeded!",
                "3d6 (advantage) if using a Mastered weapon - weapons listed on this Character Sheet are Mastered Weapons",
                "2d6 (standard) if using an unmastered weapon within Proficency (light melee, heavy melee, ranged, etc.)",
                "1d6 (disadvantage) if your character does not know how to fight with this weapon. This includes unarmed strikes and improvised weapons (without training or a Trait)",
            ],
            italic: "'d6 stands for a six-sided die'",
        },
        {
            key: 2,
            title: 'Move',
            description: [
                "Your character can move approximately 25 feet with a single Action, so long as there isn't anything hindering their movement",
            ],
            italic: "Turns out six seconds is a long time when running",
        },
        {
            key: 3,
            title: 'Test for Ability',
            description: [
                "Describe what your character is trying to accomplish, and if any traits or special effects apply. The Game Mom will help determine how many dice to roll to discover if your character succeeds",
                "3d6 (advantage) - some traits provide advantage on tests",
                "2d6 (standard) - this action has standard difficulty",
                "1d6 (disadvantage) - this is going to be tough. I'm not sure I believe in you",
            ],
            italic: "Maybe ask your team if they want to help out somehow?",
        },
        {
            key: 4,
            title: 'Evade',
            description: [
                "Until your character's next turn, test 1d6 when an enemy would successfully strike your character. If you succeed in the roll, your character Evades the damage",
                "This is exactly the same as the Heritage Trait 'Goblin Agility'; characters with this heritage do not gain any additional benefit from using this action",
            ],
            italic: "'d6 stands for a six-sided die'",
        },
    ]

    return (
        <div className="combatActions__container">
            <div className="charSheet__display--title centered bold">Combat Actions</div>
            <TapOpen />
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
            <DisplayRational
                stage="combat"
            />
        </div>
    )
}

export default CombatActions