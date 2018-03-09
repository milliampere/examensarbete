/*global chrome*/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(request.type === 'reactInit') {
        let array = [];
        let portions = 1;
        let url = window.location.href;

        if(url.includes("ica")){
            let portionsNode = document.querySelector(".servings-picker__servings");
            if(portionsNode !== null){
                portions = findPortionsRegex(portionsNode.innerText);
            }

            let nodesArray = Array.from(document.querySelectorAll(".ingredients__list__item"));
            let option1 = nodesArray[0].querySelector('.ingredient');
            let option2 = nodesArray[0].querySelector('span');
            if(option1) {
                array = nodesArray.map((node) => {
                    return useRegex(node.querySelector('.ingredient').innerText);
                });
            }
            else if (option2) {
                array = nodesArray.map((node) => {
                    return useRegex(node.innerText);
                });
            }

        }
        else if(url.includes("koket")){
            let portionsNode = document.querySelector("span.amount");
            if(portionsNode !== null){
                portions = findPortionsRegex(portionsNode.innerText);
            }
            let nodesArray = Array.from(document.querySelectorAll(".ingredient"));
            array = nodesArray.map((node) => {
                return useRegex(node.innerText);
            });

        }
        else if(url.includes("coop")){
            let portionsNode = document.querySelector(".Recipe-portionsCount");
            if(portionsNode !== null){
                portions = findPortionsRegex(portionsNode.innerText);
            }

            let nodesArray = Array.from(document.querySelectorAll(".Recipe-ingredient"));
            array = nodesArray.map((node) => {
                return useRegex(node.innerText);
            });
        }
        //console.log('before send', array);
        //console.log('before send', portions);

        //respond back to the sender.
        sendResponse({array, portions});
    }
});


function findPortionsRegex(inputString) {
    inputString.trim();
    var r = /\d+/;
    regexResult = inputString.match(r);

    if(regexResult === null) {   
        return 1;                   // default if no number is found
    } else {
        portionsNumber = Number(regexResult[0]);
    }
    
    console.log('regex', portionsNumber);
    return portionsNumber;
}

//kan vi flytta denna till anna fil? hur isf prata med denna fil?
function useRegex(inputString) {

    inputString.trim();
    let ingredientObject = {};

    const re1 = /(\d+)\s*(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s(\D+)/;
    const re2 = /\d+\s+\D+/;
    const re3 = /^\D+/;

    if(inputString.match(re1)){
        //dela upp i siffra, mått, ingrediens
        ingredient = inputString.split(/(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s/);
        ingredientObject.amount = ingredient[0].match(/[^a-z+å+ä+ö ]+/)[0]; //för att få bort 'ca' osv framför ett antal
        ingredientObject.type = ingredient[1];
        ingredientObject.name = ingredient[2];

    } else if (inputString.match(re2)) {
        //dela upp i siffra och ingrediens
        index = inputString.search(/\d\s+\D/);
        ingredientObject.amount = inputString.substring(0,index+1);
        ingredientObject.name = inputString.slice(index+2);

    } else if (inputString.match(re3)) {
        //dela inte upp, sök direkt på ingrediens
        ingredientObject.name = inputString;
    }

    return ingredientObject;
}



// Lägg till knapp på receptsidan
function appendButton(){

    let url = window.location.href;
    let node;
    const btn = document.createElement('BUTTON');
    const t = document.createTextNode("Näringsberäkna receptet");
    btn.appendChild(t);

    const buttonStyle = `
        font-size: 16px;
        padding: 5px 10px;
        line-height: unset;
        height: unset;
        border: none;
        border-radius: 5px;
        margin: 10px 0;
        text-align: right;
        color: white;
        background-color: #336B87;`

    btn.setAttribute("style", buttonStyle);

    if(url.includes("ica")){
        node = document.getElementById('ingredients-section');
        node.insertBefore(btn, node.childNodes[0]);
    }
    else if(url.includes("koket")){
        node = document.getElementById('ingredients-component');
        node.insertBefore(btn, node.childNodes[0]);
    }
    else if(url.includes("coop")){
        node = document.querySelector('.Recipe-portions');
        //console.log(node);
        node.appendChild(btn);
    }

    // Öppna popup när knapp klickas på
    btn.onclick = function(e) {
        e.preventDefault();
        chrome.runtime.sendMessage({type: "getUrl"}, function(response) {
            console.log(response)
          });
        console.log("Clicked");
    };
}

//appendButton();