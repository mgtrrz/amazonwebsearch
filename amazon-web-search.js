var openedByShortcutKey = false;
let servicesId = "nav-servicesMenu";
let inputId = "awsc-services-search-autocomplete";

document.onkeydown=function(e){
    if ( e.shiftKey && e.which == 221 ) {
        document.getElementById(servicesId).click()
        document.getElementById(inputId).focus();
        openedByShortcutKey = true;

        return false;
    }
}

document.onkeyup=function(e){
    if (e.key === "Escape" && openedByShortcutKey) {
        document.getElementById(servicesId).click()
        openedByShortcutKey = false;

        return false
    }
}