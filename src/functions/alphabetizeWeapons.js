const alphabetizeWeapons = ({ weapons }) => {
    const sortedWeapons = weapons.sort((a, b) => {
        if (a.wTitle < b.wTitle) { return -1 }
        if (a.wTitle > b.wTitle) { return 1 }
        return 0
    });

    return sortedWeapons
}

export default alphabetizeWeapons