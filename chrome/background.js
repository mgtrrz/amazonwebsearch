chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });

    chrome.storage.local.set({"modifier": 'shift'}, function() {
        console.log("Default modifier set to shift");
    });

    chrome.storage.local.set({"keyCode": 221}, function() {
        console.log("Default keyCode set to 221");
    });

    chrome.storage.local.set({"key": "]"}, function() {
        console.log("Default keyCode set to ]");
    });
});