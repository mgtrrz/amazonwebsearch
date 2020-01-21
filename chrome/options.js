function saveOptions(e) {
  e.preventDefault();

  console.log("KeyCode value saved: " + document.querySelector("#keyCode").value)

  chrome.storage.local.set({"modifier": document.querySelector("#modifier").value});
  chrome.storage.local.set({"key": document.querySelector("#key").value});
  chrome.storage.local.set({"keyCode": document.querySelector("#keyCode").value});

  var notif = document.getElementById("notification");
  notif.innerHTML = "Saved!";
  notif.style.display = "block";
}

function grabAndUpdateValues() {
  chrome.storage.local.get("modifier", function(d) {
    document.querySelector("#modifier").value = d.modifier || "meta";
  });

  chrome.storage.local.get("keyCode", function(d) {
    document.querySelector("#keyCode").value = d.keyCode || "219";
  });

  chrome.storage.local.get("key", function(d) {
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