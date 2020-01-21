function saveOptions(e) {
  e.preventDefault();

  console.log("KeyCode value saved: " + document.querySelector("#keyCode").value)

  browser.storage.sync.set({"modifier": document.querySelector("#modifier").value});
  browser.storage.sync.set({"key": document.querySelector("#key").value});
  browser.storage.sync.set({"keyCode": document.querySelector("#keyCode").value});

  var notif = document.getElementById("notification");
  notif.innerHTML = "Saved!";
  notif.style.display = "block";
}

function grabAndUpdateValues() {
  var getModifier = browser.storage.sync.get("modifier");
  getModifier.then(function(d) {
    document.querySelector("#modifier").value = d.modifier || "meta";
  });

  var getKeyCode = browser.storage.sync.get("keyCode");
  getKeyCode.then(function(d) {
    document.querySelector("#keyCode").value = d.keyCode || "219";
  });

  var getKey = browser.storage.sync.get("key");
  getKey.then(function(d) {
    document.querySelector("#key").value = d.key || "]";
  });
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