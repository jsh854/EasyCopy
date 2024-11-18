document.addEventListener("copy", () => {
    const copiedText = window.getSelection().toString();
    if (copiedText.trim()) {
        chrome.runtime.sendMessage({ action: "saveCopy", data: copiedText }, (response) => {
            alert("Copied text sent to background:");
        });
    }
});
