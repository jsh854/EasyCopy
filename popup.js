const copyList = document.getElementById("copyList");

const loadCopies = () => {
    chrome.runtime.sendMessage({ action: "getCopies" }, (response) => {
        copyList.innerHTML = "";
        response.forEach(item => {
            const listItem = document.createElement("li");
            const liItem=document.createElement("p")
            liItem.textContent = item;

            const removeBtn = document.createElement("button");
            const copyBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            copyBtn.textContent = "Copy and use"
            copyBtn.classList.add('copyBtn')
            copyBtn.onclick=()=>{
                chrome.runtime.sendMessage({ action: "getSelectedCopy", data: item })
                .then(() => {
                    alert("Copied to clipboard!");
                })
                .catch(err => {
                });
            }
            removeBtn.onclick = () => {
                chrome.runtime.sendMessage({ action: "removeCopy", data: item });
                loadCopies();
            };
            copyList.appendChild(listItem);
            listItem.appendChild(liItem)
            listItem.appendChild(removeBtn);
           
            listItem.appendChild(copyBtn)
        });
    });
};

document.addEventListener("DOMContentLoaded", loadCopies);
