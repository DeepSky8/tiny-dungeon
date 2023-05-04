import defaultGear from "../objectsArrays/defaultGear";


const defaultChar = {
    charID: '',
    userID: '',
    charName: '',
    heritage: '',           // Select from Heritages array, identify by hID
    hTrait: '',             // Heritage trait determined by Heritage, identified by htID
    healthHP: '',           // HP determined by Heritage and trait: Toughness
    currentHealthHP: '',    // HP current number
    armorHP: '',            // HP from armor determined by Trait and worn items
    currentArmorHP:'',      // HP from armor current number
    trade: '',              // Trade is user-defined text
    belief: '',             // Belief is user-defined text

    weaponGroups: [''],     // Identified by wgID

    weaponsMastered: [''],  // Identified by wID

    // Wearing select from non-statted descriptions
    // Implement array of wearable items, use wID
    // Add specialized armor/wearable items in later update
    wearing: [''],

    gold: 10,
    gear: defaultGear,

    traits: [''],           // Select and identify by tID
    familiar: '',           // Reference by fID
    XP: 0,
    scrolls: [''],          // Identified by sID
}





// const userReducer = (state, action) => {
//     switch (action.type) {
//         case 'LOAD_USER':

// case '':
//     return {
        
//     }