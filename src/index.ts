// chrome://extensions/
const inputEl: HTMLInputElement = document.getElementById("input-el") as HTMLInputElement;
const inputBtn: HTMLButtonElement = document.getElementById("input-btn") as HTMLButtonElement;
const ulEl: HTMLUListElement = document.getElementById("ul-el") as HTMLUListElement;
const deleteBtn: HTMLButtonElement = document.getElementById("delete-btn") as HTMLButtonElement;
const tabBtn: HTMLButtonElement = document.getElementById("tab-btn") as HTMLButtonElement;

type leadType = string[];

let leads: leadType = getLeads();

if (leads.length == 0) {
    setLeads([]);
}

render();

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0].url) {
            addLead(tabs[0].url);
        }
        render();
    })
})

deleteBtn.addEventListener("dblclick", (): void => {
    setLeads([]);
    leads = [];
    render();
})

inputBtn.addEventListener("click", (): void => {
    addLead(inputEl.value);
    inputEl.value = "";
    render();
})

function getLeads(): string[] {
    let leadsFromLocalStorage = localStorage.getItem("myLeads");
    if(leadsFromLocalStorage) {
        return JSON.parse(leadsFromLocalStorage);
    }
    return [];
}

function setLeads(leads: String[]): void {
    return localStorage.setItem("myLeads", JSON.stringify(leads));
}

function render(): void {
    let leads = getLeads();
    ulEl.innerHTML = "";
        leads.forEach( lead => {
            let leadText: Text = document.createTextNode(lead);
            let li: HTMLElement = document.createElement('li');
            let btn: HTMLElement = document.createElement('button');

            btn.textContent = "X";
            btn.style.marginLeft = "10px"

            li.appendChild(leadText);
            li.appendChild(btn);
            ulEl.appendChild(li);
            btn.addEventListener("click", (): void => {
                clearThisLead(lead);
            })
        });
    }

    function addLead(lead: string): void {
        let leads: leadType = getLeads();
        leads.push(lead);
        setLeads(leads);
    }

    function removeLead(lead: string): void {
        let leads: leadType = getLeads();
        if (leads) {
            let index: number = leads.indexOf(lead);
            if (index > -1){
                leads.splice(index, 1);
            }
            setLeads(leads);
        }
    }

    function clearThisLead(lead: string): void {
        removeLead(lead);
        render();
    }