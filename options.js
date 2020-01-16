function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
      modifier: document.querySelector("#modifier").value
    });
    browser.storage.sync.set({
        key: document.querySelector("#key").value
    });
  }
  
  function restoreOptions() {
  
    function setCurrentModifierChoice(result) {
      document.querySelector("#modifier").value = result.modifier || "meta";
    }

    function setCurrentKeyChoice(result) {
        document.querySelector("#key").value = result.key || " ";
      }
  
    function onError(error) {
      console.log(`Error: ${error}`);
    }
  
    var getModifier = browser.storage.sync.get("modifier");
    getModifier.then(setCurrentModifierChoice, onError);

    var getKey = browser.storage.sync.get("key");
    getKey.then(setCurrentKeyChoice, onError);
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);
  