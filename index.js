// chrome://extensions/
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

let leads = getLeads();

if(leads == null){
    setLeads([]);
}

render();

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        addLead(tabs[0].url)
        render()
    })
})

deleteBtn.addEventListener("dblclick", function() {
    setLeads([])
    leads = []
    render()
})

inputBtn.addEventListener("click", function() {
    addLead(inputEl.value);
    inputEl.value = "";
    render();
})

function render() {
    ulEl.innerHTML="";
    let leads = getLeads();
    leads.forEach( lead => {        
        let leadtext = document.createTextNode(lead);
        let li = document.createElement('li');
        let btn = document.createElement('button');
        btn.textContent = 'X';
        btn.style.marginLeft = '10px';
        li.appendChild(leadtext);
        li.appendChild(btn);
        ulEl.appendChild(li); 
        btn.addEventListener('click', () => {
            clearThisLead(lead);
        })
    })
}

function getLeads() {
    leadsFromLocalStorage = localStorage.getItem("myLeads");
    if(leadsFromLocalStorage) {
        return JSON.parse(leadsFromLocalStorage);
    }
    return null;
}

function setLeads(leads) {
    return localStorage.setItem('myLeads', JSON.stringify(leads));
}

function removeLead(lead) {
    let leads = getLeads();
    let index = leads.indexOf(lead);
    if (index > -1) {
        leads.splice(index, 1);
    }
    setLeads(leads);
}

function addLead(lead) {
    let leads = getLeads();
    leads.push(lead);
    setLeads(leads);
}

function clearThisLead(lead) {
    removeLead(lead);
    render();
}
