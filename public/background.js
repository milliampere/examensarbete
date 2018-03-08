

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.type == "getUrls"){
            chrome.notifications.create('hej', {
                type: 'basic',
                iconUrl: 'icon.png',
                title: 'nutritions',
            },
            () => {
                console.log('from background');
            })
        }
    sendResponse('done');
});


window.addEventListener('load', function() {
    var opt = {
        type: 'list',
        title: 'Primary Title',
        message: 'Primary message to display',
        priority: 1,
        items: [{ title: 'Item1', message: 'This is item 1.'},
                { title: 'Item2', message: 'This is item 2.'},
                { title: 'Item3', message: 'This is item 3.'}]
      };
    chrome.notifications.create('notify1', opt, function(id) { console.log("Last error:", chrome.runtime.lastError)})
});