import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import ClickDescriptionMultiple from "../display/ClickDescriptionMultiple";

const AdminPage = () => {


    const links = [
        {
            title: 'Game Overview',
            location: 'gameMom'
        },
        {
            title: 'Create Heritage',
            location: 'createHeritage'
        },
        {
            title: 'Display Heritages',
            location: 'displayHeritages'
        },
        {
            title: 'Create Trait',
            location: 'createTrait'
        },
        {
            title: 'Display Traits',
            location: 'displayTraits'
        },
        {
            title: 'Create Weapon Group',
            location: 'createWeaponGroup'
        },
        {
            title: 'Display Weapon Groups',
            location: 'displayWeaponGroups'
        },
        {
            title: 'Create Weapon',
            location: 'createWeapon'
        },
        {
            title: 'Display Weapons',
            location: 'displayWeapons'
        },
        {
            title: 'Create Scroll',
            location: 'createScroll'
        },
        {
            title: 'Display Scrolls',
            location: 'displayScrolls'
        },
        // {
        //     title: '',
        //     location: ''
        // },
    ]

    return (
        <div className="adminPage__container">
            <ClickDescriptionMultiple
                title={'Links'}
                description={
                    links.map(link => {
                        return (
                            <div
                                className="centered"
                                key={Math.random()}
                            >
                                <NavLink
                                    to={link.location}
                                    className={'navLink'}
                                >{link.title}
                                </NavLink>
                            </div>
                        )
                    })
                }
            />

            <hr className="hr__brown" />
            <Outlet />
        </div>
    )
}

export default AdminPage
