import React from "react";
import ClickDescriptionCentered from "../display/ClickDescriptionCentered";
import TapOpen from "../TapOpen";
import Footer from "./Footer";

const Attribution = () => {

    const published = [
        {
            by: "Second Edition published 2022 by ",
            person: <a href="https://www.gallantknightgames.com/">Gallant Knight Games</a>
        },
    ]

    const attributes = [

        {
            by: "Written by: ",
            person: "Alan Bahr"
        },
        {
            by: "Additional rules: ",
            person: "Gregory Israel and Jonathan Thompson"
        },
        {
            by: "Managing Editor: ",
            person: "Alan Bahr"
        },
        {
            by: "Interior Art: ",
            person: "Anthony Cournoyer"
        },
        {
            by: "Cover art: ",
            person: "Michael Leavenworth"
        },
        {
            by: "Editor: ",
            person: "Alana Joli Abbott"
        },
        {
            by: "Book Design & Layout: ",
            person: "Robert Denton III"
        },
        {
            by: "Based on the game Tiny Dungeon by ",
            person: "Brandon McFadden"
        },
    ]

    return (
        <div className="attribution__container">
            {published.map(attribute => {
                return (
                    <div
                        key={attribute.by}
                        className="attribution__published centered"
                    >
                        <div className="bold">{attribute.by}</div>
                        <div>{attribute.person}</div>

                    </div>
                )
            })}
            <div className="attribution__description">
                <TapOpen />
                <ClickDescriptionCentered
                    title='Web app design'
                    description={
                        <div className="welcome__design">
                            This web app is designed to function alongside the <a href="https://www.gallantknightgames.com/tiny-dungeon-2e/">Tiny Dungeon rulebook</a>, streamlining the character creation and gameplay process
                        </div>
                    }
                />
            </div>

            <div className="attribution__description">
                <TapOpen />
                <ClickDescriptionCentered
                    title="Tiny Dungeon design"
                    description={
                        <div className="welcome__explanation">
                            Tiny Dungeon 2e (2nd Edition) is a minimalistic table-top roleplaying game that delivers a satisfying gaming experience without books upon books of rules and options. You will not find classes, levels, or experience points in Tiny Dungeon 2e—instead, you create organic characters that grow through roleplaying. While Tiny Dungeon 2e does assume its players are familiar with the table-top roleplaying genre, newcomers and veterans alike should be able to easily understand the basic mechanics of the game
                        </div>
                    }
                />
            </div>

            <div className="attribution__description">
                {attributes.map(attribute => {
                    return (
                        <div
                            key={attribute.by}
                            className="centered"
                        >
                            <div className="bold">{attribute.by}</div>
                            <div>{attribute.person}</div>

                        </div>
                    )
                })}
            </div>
            <div className="attribution__trademarks centered">Tiny Dungeon 2e and TinyD6 are trademarks of <a href="https://www.gallantknightgames.com/">Gallant Knight Games</a></div>
            <div className="attribution__copyright">©2022 by Gallant Knight Games. All rights reserved. Reproduction without the written permission of the publisher is expressly forbidden, except for the purposes of reviews, and for the blank character sheets, which may be reproduced for personal use only.</div>
            <div className="centered">
                Background Image by rawpixel.com
            </div>
        </div>
    )
}

export default Attribution