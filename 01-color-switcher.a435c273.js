!function(){var t={body:document.querySelector("body"),startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")},n=null;function e(){var n="#".concat(Math.floor(16777215*Math.random()).toString(16));t.body.style.backgroundColor=n}t.startBtn.addEventListener("click",(function(){n=setInterval(e,1e3),t.startBtn.disabled=!0})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.startBtn.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.a435c273.js.map
