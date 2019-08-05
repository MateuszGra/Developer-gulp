"use strict";

//create elements DOM
var createElements = [];

var createElement = function createElement(name, type, clas, txt, parent) {
  createElements[name] = document.createElement(type);

  for (var i = 0; i < clas.length; i++) {
    createElements[name].classList.add(clas[i]);
  }

  createElements[name].innerText = txt;
  parent.appendChild(createElements[name]);
};