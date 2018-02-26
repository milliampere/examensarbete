//import React, { Component } from 'react';
import Fuse from 'fuse.js';
//import allFoods from '../../nameList.json'


export default function search(name, allFoods){

    var options = {
        includeScore: true,
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.4,
        //location: 6,
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
    if(result.length){
        console.log('from search', name, result[0].item.name)
        console.log('full array', result)
        return result;
    }
}

