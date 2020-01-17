function saveOptions(e) {
  e.preventDefault();

  console.log("KeyCode value saved: " + document.querySelector("#keyCode").value)

  browser.storage.sync.set({
    modifier: document.querySelector("#modifier").value
  });
  browser.storage.sync.set({
    key: document.querySelector("#key").value
  });
  browser.storage.sync.set({
    keyCode: document.querySelector("#keyCode").value
  });

  var notif = document.getElementById("notification");
  notif.innerHTML = "Saved!";
  notif.style.display = "block";
}
  
function restoreOptions() {

  function setCurrentModifierChoice(result) {
    document.querySelector("#modifier").value = result.modifier || "meta";
  }

  function setCurrentKeyChoice(result) {
    document.querySelector("#key").value = result.key || "]";
  }

  function setCurrentKeyCodeChoice(result) {
    document.querySelector("#keyCode").value = result.keyCode || "219";
  }


  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getModifier = browser.storage.sync.get("modifier");
  getModifier.then(setCurrentModifierChoice, onError);

  var getKey = browser.storage.sync.get("key");
  getKey.then(setCurrentKeyChoice, onError);

  var getKeyCode = browser.storage.sync.get("keyCode");
  getKeyCode.then(setCurrentKeyCodeChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

var keyForm = document.getElementById("key");

keyForm.onkeydown = function(e) {
    e = e || window.event;
    keyForm.value = e.key;
    document.querySelector("#keyCode").value = e.keyCode;
    console.log("keydown: " + e.keyCode);
};