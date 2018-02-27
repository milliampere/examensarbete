import Fuse from 'fuse.js';


export default function search(name, allFoods){
    var options = {
        includeScore: true,
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.4,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            {
               name: "group",
               weight: 0.7
            },
            {
                name: "name",
                weight: 0.3
            }
        ]
    };
    var fuse = new Fuse(allFoods, options); // "allFoods" is the item array
    var result = fuse.search(name);
    //console.log('from search data', result);
    if(result.length){
        return result;
    }
}

