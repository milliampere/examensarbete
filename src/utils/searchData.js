import React, { Component } from 'react';
import Fuse from 'fuse.js';
//import allFoods from '../../nameList.json'


export default function search(name, allFoods){

    var options = {
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "name"
        ]
    };

    var fuse = new Fuse(allFoods, options); // "allFoods" is the item array
    var result = fuse.search(name);
    return result;
}

