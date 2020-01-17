let servicesId = "nav-servicesMenu";
let inputId = "awsc-services-search-autocomplete";

// Defaults
var modifier = "meta";
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
    // Getting user definition for modifier
    var gettingUserModifier = browser.storage.sync.get("modifier");
    gettingUserModifier.then(onGotModifier, onError);

    var  gettingUserKeyCode = browser.storage.sync.get("keyCode");
    gettingUserKeyCode.then( onGotKeyCode, onError);


    console.log("Currently set Modifier: " + modifier);
    console.log("Currently set key: " + userKey);
    console.log("Pressing: " + getModifierKeyPressed(e) + " + " + e.which);

    if ( getModifierKeyPressed(e) === modifier && e.which == userKey ) {
        // Simulate a click event to open the services menu
        document.getElementById(servicesId).click()
        document.getElementById(inputId).focus();

        return false;
    }
    
    // shift + enter
    // to open the first element in the search in a new tab
    if ( e.shiftKey && e.which == 13 ) {
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

    if (e.key === "Escape" && searchMenuIsOpen()) {
        // Simulate a click event to close the services menu
        document.getElementById(servicesId).click()

        return false
    }
}