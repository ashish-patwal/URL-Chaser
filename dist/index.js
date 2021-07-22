"use strict";
// chrome://extensions/
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let leads = getLeads();
if (leads.length == 0) {
    setLeads([]);
}
render();
tabBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].url) {
            addLead(tabs[0].url);
        }
        render();
    });
});
deleteBtn.addEventListener("dblclick", () => {
    setLeads([]);
    leads = [];
    render();
});
inputBtn.addEventListener("click", () => {
    addLead(inputEl.value);
    inputEl.value = "";
    render();
});
function getLeads() {
    let leadsFromLocalStorage = localStorage.getItem("myLeads");
    if (leadsFromLocalStorage) {
        return JSON.parse(leadsFromLocalStorage);
    }
    return [];
}
function setLeads(leads) {
    return localStorage.setItem("myLeads", JSON.stringify(leads));
}
function render() {
    let leads = getLeads();
    ulEl.innerHTML = "";
    leads.forEach(lead => {
        let leadText = document.createTextNode(lead);
        let li = document.createElement('li');
        let btn = document.createElement('button');
        btn.textContent = "X";
        btn.style.marginLeft = "10px";
        li.appendChild(leadText);
        li.appendChild(btn);
        ulEl.appendChild(li);
        btn.addEventListener("click", () => {
            clearThisLead(lead);
        });
    });
}
function addLead(lead) {
    let leads = getLeads();
    leads.push(lead);
    setLeads(leads);
}
function removeLead(lead) {
    let leads = getLeads();
    if (leads) {
        let index = leads.indexOf(lead);
        if (index > -1) {
            leads.splice(index, 1);
        }
        setLeads(leads);
    }
}
function clearThisLead(lead) {
    removeLead(lead);
    render();
}
