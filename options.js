function getSyncMethod() {
  if (browser.storage) {
    console.log("detected Firefox");
    return browser.storage.sync;
  } else if (chrome.storage) {
    console.log("detected Chrome");
    return chrome.storage.local;
  }

  return null;
}

function saveOptions(e) {
  e.preventDefault();

  console.log("KeyCode value saved: " + document.querySelector("#keyCode").value)

  var browserSync = getSyncMethod();

  browserSync.set({"modifier": document.querySelector("#modifier").value});
  browserSync.set({"key": document.querySelector("#key").value});
  browserSync.set({"keyCode": document.querySelector("#keyCode").value});

  var notif = document.getElementById("notification");
  notif.innerHTML = "Saved!";
  notif.style.display = "block";
}

function grabAndUpdateValues() {
  var browserSync = getSyncMethod();

  browserSync.get("modifier")

  function setCurrentModifierChoice(result) {
    document.querySelector("#modifier").value = result.modifier || "meta";
  }

  function setCurrentKeyChoice(result) {
    document.querySelector("#key").value = result.key || "]";
  }

  function setCurrentKeyCodeChoice(result) {
    document.querySelector("#keyCode").value = result.keyCode || "219";
  }

  var getModifier = browser.storage.sync.get("modifier");
  getModifier.then(setCurrentModifierChoice, onError);

  var getKey = browser.storage.sync.get("key");
  getKey.then(setCurrentKeyChoice, onError);

  var getKeyCode = browser.storage.sync.get("keyCode");
  getKeyCode.then(setCurrentKeyCodeChoice, onError);
}

window.onload = function() {
  this.grabAndUpdateValues();
}

document.querySelector("form").addEventListener("submit", saveOptions);

var keyForm = document.getElementById("key");
keyForm.onkeydown = function(e) {
    e = e || window.event;
    keyForm.value = e.key;
    document.querySelector("#keyCode").value = e.keyCode;
    console.log("keydown: " + e.keyCode);
};