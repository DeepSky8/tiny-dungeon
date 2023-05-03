import defaultGear from "../objectsArrays/defaultGear";


const defaultChar = {
    charID: '',
    userID: '',
    charName: '',
    heritage: '',       // Select from Heritages array, identify by ID
    hTrait: '',         // Heritage trait determined by Heritage
    hp: '',             // HP determined by Heritage
    armorHP: '',        // HP from armor determined by Trait and worn items
    trade: '',          // Trade is user-defined text
    belief: '',         // Belief is user-defined text

    weaponGroups: [''],
    // Weapon Groups
    //  Light Melee     l
    //      Includes Powerful Claws Karhu Heritage Trait
    //  Heavy Melee     h
    //  Ranged          r
    //  Improvised      i
    //  Unarmed         u
    //  Shield          s

    weaponsMastered: [   // Mastered weapon type is user-defined text

        {
            wGroup: '',     // Corresponds to weaponGroup letter
            wType: '',      // Select from weapon type array determined by group, identify by ID
            wName: '',      // User-defined text, if any
            wDepletion: '', // Interact with depletion counters in later update, set initial depletion counters by wType object
        },
    ],

    // Wearing select from non-statted descriptions
    // Implement array of wearable items, use item ID
    // Add specialized armor/wearable items in later update
    wearing: [''],

    gold: 10,
    gear: defaultGear,

    traits: [''],           // Select and identify by ID
    familiar: {

    },           // 
    XP: 0,

}