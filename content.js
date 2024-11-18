document.addEventListener("copy", () => {
    const copiedText = window.getSelection().toString();
    if (copiedText.trim()) {
        chrome.runtime.sendMessage({ action: "saveCopy", data: copiedText }, (response) => {
            console.log("Copied text sent to background:");
        });
    }
});
