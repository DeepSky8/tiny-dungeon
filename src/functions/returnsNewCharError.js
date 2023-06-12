



const chooseHeritage = 'heritage'
const chooseTraits = 'traits'
const chooseWeaponGroup = 'weaponGroup'
const chooseWeapon = 'weapon'
const createStrike = ' or Unarmed Strike'
const chooseFamiliar = 'familiar'
const chooseBackstory = 'backstory'

const pleaseSelectA = 'Please select a '
const pleaseDescribeYour = 'Please describe your '
const pleaseDesignA = 'Please design a '
const pleaseDesign = 'Please design '
const orSelectA = 'or select a '
const pleaseCheck = 'Please double-check the number of selected '
const weaponGroup = 'Weapon Group'

const weaponError = "Make sure you've selected a weapon/attack for each weapon group (click on the weapon group boxes to open)"





const returnsNewCharError = ({ urlStub }) => {


    switch (urlStub) {
        case chooseHeritage:
            return (pleaseSelectA + chooseHeritage)
        case chooseTraits:
            return (pleaseCheck + chooseTraits)
        case chooseWeaponGroup:
            return (pleaseSelectA + weaponGroup)
        case chooseWeapon:
            return weaponError
        case chooseFamiliar:
            return (pleaseDescribeYour + chooseFamiliar)
        case chooseBackstory:
            return (pleaseDesignA + chooseBackstory)
        default:
            return ""
    }

}

export default returnsNewCharError