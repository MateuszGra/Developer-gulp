//create elements DOM
let createElements = [];
const createElement = (name, type, clas, txt, parent) => {
    createElements[name] = document.createElement(type);
    for (let i = 0; i < clas.length; i++) {
        createElements[name].classList.add(clas[i]);
    }
    createElements[name].innerText = txt;
    parent.appendChild(createElements[name]);
};