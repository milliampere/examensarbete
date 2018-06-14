import Fuse from 'fuse.js';

export default function search(name, allFoods){

    var optionsPerfectMatch = {
        includeScore: true,
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        threshold: 0,
        maxPatternLength: 32,
        keys: [
            {
                name: "name",
                weight: 1
            }
        ]
    };

    var options = {
        includeScore: true,
        shouldSort: true,
        //tokenize: true,
        //matchAllTokens: true,
        threshold: 0.1,
        //distance: 100,
        maxPatternLength: 32,
        //minMatchCharLength: 1,
        keys: [
/*             {
               name: "group",
               weight: 0.7
            }, */
            {
                name: "name",
                weight: 1
            }
        ]
    };

    // new fuse
    var fusePerfectMatch = new Fuse(allFoods, optionsPerfectMatch); // "allFoods" is the item array
    var perfectMatch = fusePerfectMatch.search(name);

    var result = [];
    if(perfectMatch.length){
        result = perfectMatch;
    } else {
        var fuse = new Fuse(allFoods, options); // "allFoods" is the item array
        result = fuse.search(name);
    }

    if(result.length){
        return result;
    }
    else {
        return []
    }
}
