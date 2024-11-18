let copiedItems = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveCopy") {
        if (!copiedItems.includes(message.data)) {
            copiedItems.push(message.data);
            chrome.storage.local.set({ copiedItems });
        }
    } else if (message.action === "getCopies") {
        sendResponse(copiedItems);
    } else if (message.action === "removeCopy") {
        copiedItems = copiedItems.filter(item => item !== message.data);
        chrome.storage.local.set({ copiedItems });
    }else if(message.action === "getSelectedCopy"){
        navigator.clipboard.writeText(item)
    }
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.copiedItems) {
        copiedItems = changes.copiedItems.newValue;
    }
});
