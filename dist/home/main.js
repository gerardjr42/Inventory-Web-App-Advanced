//----Creating variables----//
const $ = function(args) {
  return document.querySelector(args);
}

const $$ = function(args) {
  return document.querySelectorAll(args);
}

const create = function(args) {
  return document.createElement(args);
}

HTMLElement.prototype.on = function(a, b, c) {
  this.addEventListener(a, b, c);
};

HTMLElement.prototype.off = function(a,b,c) {
  this.removeEventListener(a,b,c);
}

HTMLElement.prototype.$ = function(a,b,c) {
  return this.querySelector(a,b,c);
}

HTMLElement.prototype.$$ = function(a,b,c) {
  this.querySelectorAll(a,b,c);
}

  //custom eventListener
  function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
      if (e.target.matches(selector)) callback(e)
    })
  };

  // Toggle Dark and Light Mode
const body = $("body");
const sidebar = body.$(".sidebar");
const toggle = body.$(".toggle");
const search = body.$("#search");
const modeSwitch = body.$(".toggle-switch");
const modeText = body.$(".mode-text");

modeSwitch.on("click", () => {
  body.classList.toggle("dark");

  if(body.classList.contains("dark")) {
    modeText.innerText = "Light Mode"
  } else {
    modeText.innerText = "Dark Mode"
  }
});

toggle.on("click", () => {
  sidebar.classList.toggle("close");
});