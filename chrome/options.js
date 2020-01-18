function saveOptions(e) {
  e.preventDefault();

  console.log("KeyCode value we saved: " + document.querySelector("#keyCode").value)

  chrome.storage.local.set({"modifier": document.querySelector("#modifier").value});

  chrome.storage.local.set({"key": document.querySelector("#key").value});

  console.log("about to call set keycode");
  chrome.storage.local.set({"keyCode": document.querySelector("#keyCode").value}, function(d) {
    console.log("after inner called");
    var test;
    chrome.storage.sync.get("keyCode", function(data) {
      test = data;
      //init(); // All your code is contained here, or executes later that this
      console.log(test);
    });
  });
  console.log("after set keycode");

  var notif = document.getElementById("notification");
  notif.innerHTML = "Saved!";
  notif.style.display = "block";
}
  
function restoreOptions(result) {
  console.log(result)
  document.querySelector("#modifier").value = result.modifier || "meta";
  document.querySelector("#key").value = result.key || "]";
  document.querySelector("#keyCode").value = result.keyCode || "219";
}

var storageCache = {};
chrome.storage.sync.get(null, function(data) {
  storageCache = data;
  //init(); // All your code is contained here, or executes later that this
  restoreOptions(storageCache);
});


document.querySelector("form").addEventListener("submit", saveOptions);

var keyForm = document.getElementById("key");

keyForm.onkeydown = function(e) {
    e = e || window.event;
    keyForm.value = e.key;
    document.querySelector("#keyCode").value = e.keyCode;
    console.log("keydown: " + e.keyCode);
};