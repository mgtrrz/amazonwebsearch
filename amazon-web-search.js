let servicesId = "nav-servicesMenu";
let inputId = "awsc-services-search-autocomplete";

// Defaults
var modifier = "shift";
var userKey = 221; // "]"

function onError(error) {
    console.log(`Error: ${error}`);
}

function searchMenuIsOpen() {
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

function  onGotKeyCode(item) {
    if (item.keyCode) {
        userKey = item.keyCode;
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

    console.log("Current modifier: " + modifier);
    console.log("Modifier key pressed: " + getModifierKeyPressed(e));
    console.log("Current Key: " + userKey);
    console.log("Curret Key pressed: " + e.which);
    console.log("---");

    // Getting user definition for modifier
    var gettingUserModifier = browser.storage.sync.get("modifier");
    gettingUserModifier.then(onGotModifier, onError);

    var  gettingUserKeyCode = browser.storage.sync.get("keyCode");
    gettingUserKeyCode.then( onGotKeyCode, onError);

    if ( getModifierKeyPressed(e) === modifier && e.which == userKey ) {
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
        e.preventDefault();
        //window.stop();
    }
}

document.onkeyup=function(e){

    if (e.key === "Escape" && searchMenuIsOpen()) {
        // Simulate a click event to close the services menu
        document.getElementById(servicesId).click()

        return false
    }
}