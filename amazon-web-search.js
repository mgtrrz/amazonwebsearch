let servicesId = "nav-servicesMenu";
let inputId = "awsc-services-search-autocomplete";

// Defaults
var modifier = "shift";
var userKey = 221; // "]"

console.log("Using:");
console.log(modifier);
console.log(userKey);

function onError(error) {
    console.log(`Error: ${error}`);
}

function isSearchMenuOpen() {
    if ( document.getElementById("servicesMenuContent").style.display === "block" ) {
        return true;
    } 

    return false;
}

function onGotModifier(item) {
    if (item.modifier) {
        modifier = item.modifier;
    }
}

function onGotKey(item) {
    if (item.key) {
        userKey = item.key.charCodeAt(0);
    }
}

function getModifierKeyPressed(e) {
    if ( e.metaKey === true ) {
        return "meta";
    }
    if ( e.altKey === true ) {
        return "alt";
    }
    if ( e.ctrlKey === true ) {
        return "control";
    }
    if ( e.shiftKey === true ) {
        return "shift";
    }
    return "";
}

document.onkeydown=function(e){

    // Getting user definition for modifier
    var gettingUserModifier = browser.storage.sync.get("modifier");
    gettingUserModifier.then(onGotModifier, onError);

    var gettingUserKey = browser.storage.sync.get("key");
    gettingUserKey.then(onGotKey, onError);

    if ( e.shiftKey && e.which == 221 ) {
        // Simulate a click event to open the services menu
        document.getElementById(servicesId).click()
        document.getElementById(inputId).focus();

        return false;
    }

    if ( e.shiftKey && e.which == 13 ) {
        // Getting the first 
        var firstElement = document.getElementById("ui-id-1").childNodes[0].childNodes[0];
        var firstLink = firstElement.href;
        console.log(firstLink)
        window.open(firstLink, '_blank');
        window.focus();
        // Prevent the Amazon script from loading the page within the same tab
        window.stop();
    }
}

document.onkeyup=function(e){

    if (e.key === "Escape" && isSearchMenuOpen()) {
        // Simulate a click event to close the services menu
        document.getElementById(servicesId).click()

        return false
    }
}