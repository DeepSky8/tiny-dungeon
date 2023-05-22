



const chooseHeritage = 'heritage'
const chooseTraits = 'traits'
const chooseWeaponGroup = 'weaponGroup'
const chooseWeapon = 'weapon'
const chooseFamiliar = 'familiar'
const chooseBackstory = 'backstory'

const pleaseSelectA = 'Please select a '
const pleaseSelect = 'Please select '
const pleaseDesignA = 'Please design a '
const pleaseCheck = 'Please double-check the number of selected '
const weaponGroup = 'Weapon Group'






const returnsNewCharError = ({ urlStub, char }) => {


    switch (urlStub) {
        case chooseHeritage:
            return (pleaseSelectA + chooseHeritage)
        case chooseTraits:
            return (pleaseCheck + chooseTraits)
        case chooseWeaponGroup:
            return (pleaseSelectA + weaponGroup)
        case chooseWeapon:
            return (pleaseDesignA + chooseWeapon)
        case chooseFamiliar:
            return (pleaseSelectA + chooseFamiliar)
        case chooseBackstory:
            return (pleaseDesignA + chooseBackstory)
        default:
            return ""
    }

}

export default returnsNewCharError